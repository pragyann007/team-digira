import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./app/dashboard/admin/Admin";
import User from "./app/dashboard/user/User";
import Landing from "./pages/home";
import Login from "./auth/Login";
import RegisterUser from "./auth/RegisterUser";
import RegisterRescuer from "./auth/RegisterRescuer.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/admin" element={<Admin />} />
      <Route path="/dashboard/user" element={<User />} />
      <Route path="/dashboard/rescuer" element={<div>Rescuer Dashboard</div>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/registerUser" element={<RegisterUser/>} />
      <Route path="/registerRescuer" element={<RegisterRescuer/>} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
