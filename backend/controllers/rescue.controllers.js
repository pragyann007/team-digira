import { Report } from "../models/rescueRequest.model.js";
import { User } from "../models/user.model.js";

export const createRescueRequest = async (req, res) => {
  try {
    const { animalType, severity, urgencyState, status, lat, long } = req.body;
    const { user } = req;

    if (!animalType || !severity || !urgencyState || !lat || !long) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const imageUrl = req.file?.path;

    
    const newReport = await Report.create({
      reporter: user.id,
      animalType,
      severity,
      location: { lat, long },
      urgencyState: urgencyState || "Minor",
      status: status || "Pending",
      image: imageUrl || null,
    });

  
    await User.findByIdAndUpdate(
      user.id,
      { $push: { requests: newReport._id } },
      { new: true }
    );

    io.to("rescuers").emit("newRescueRequest", newReport);

    return res.status(201).json({
      message: "Request created successfully.",
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating rescue request:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const acceptRescueRequest = async (req, res) => {
  try {
    const rescuer = req.user;

    if (rescuer.role !== "rescuer") {
      return res.status(403).json({ message: "Only rescuers can accept requests." });
    }

    const { reportId } = req.body;
    if (!reportId) return res.status(400).json({ message: "Report ID required" });

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });
    if (report.status !== "Pending")
      return res.status(400).json({ message: "Request already accepted or closed" });

    report.rescuerId = rescuer.id;
    report.status = "Accepted";
    await report.save();

    io.to("rescuers").emit("requestTaken", { reportId });

    
    io.to(report.reporter.toString()).emit("rescueAccepted", {
      message: "Your rescue request has been accepted!",
      report,
    });

    
    const rescueRoom = `rescue_${reportId}`;
    io.to(report.reporter.toString()).emit("joinRescueRoom", { room: rescueRoom });
    io.to(rescuer.id.toString()).emit("joinRescueRoom", { room: rescueRoom });


    io.of("/").adapter.on("create-room", (room) => {
      if (room.startsWith("rescue_")) {
        console.log(`Private rescue room created: ${room}`);
      }
    });

    io.of("/").adapter.on("join-room", (room, id) => {
      if (room.startsWith("rescue_")) {
        console.log(`Socket ${id} joined room ${room}`);
      }
    });

    return res.status(200).json({
      message: "Rescue accepted successfully",
      room: rescueRoom,
      report,
    });
  } catch (err) {
    console.error("Error accepting rescue request:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};



