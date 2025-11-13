import React, { useState } from "react";
import {
  Heart,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const Landing = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className="m-0">
      <div className=" bg-background scroll-smooth">
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="block w-40">
                <img src="public/logo.png" alt="logo" />
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { id: "about", label: "About Us" },
                  { id: "mission", label: "Our Mission" },
                  { id: "help", label: "How to Help" },
                  { id: "contact", label: "Contact Us" },
                ].map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-gray-700 hover:text-lime-500 font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/login"
                  className="bg-lime-500 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-lime-500/30 hover:bg-lime-600 transition-colors"
                >
                  Rescue Now
                </a>
              </div>

              <button
                className="md:hidden text-gray-700"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {showMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {showMenu && (
              <div className="md:hidden py-4 space-y-3">
                {["About", "Our Mission", "How to Help", "Contact"].map(
                  (item, idx) => {
                    const id = item.toLowerCase().replace(/\s/g, "");
                    return (
                      <a
                        key={idx}
                        href={`#${id}`}
                        className="block text-gray-700 hover:text-lime-500 font-medium transition-colors"
                      >
                        {item}
                      </a>
                    );
                  }
                )}
                <button className="w-full bg-lime-500 text-white px-6 py-2 rounded-full font-medium hover:bg-primary transition-colors">
                  Rescue Now
                </button>
              </div>
            )}
          </div>
        </nav>

        <section className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* <div className="inline-flex items-center space-x-2 bg-lime-100 text-lime-700 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                <Heart className="w-4 h-4" />
                <span>Saving Lives, One Paw at a Time</span>
              </div> */}

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Every Streets
                <br />
                <span className="text-lime-500">Deserves to Live</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                StreetSathi connects compassionate people with street needing
                rescue and care. Together we’re building a safer, healthier
                community for our four-legged friends.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-lime-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-600 transition-all cursor-pointer">
                  Report Rescue
                </button>
                <button className="border-2 border-lime-500 text-lime-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-50 transition-all cursor-pointer">
                  Donate Here
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                {[
                  { num: "600+", label: "Animals Rescued" },
                  { num: "70+", label: "Volunteers" },
                  { num: "24/7", label: "Support" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-md bg-white/60 p-6 rounded-2xl border border-lime-300"
                  >
                    <div className="text-4xl font-bold text-lime-500 mb-2">
                      {item.num}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About <span className="text-lime-500">Us</span>
              </h2>
              <div className="block md:flex md:items-center md:justify-around md:gap-6 mt-20 flex-row-reverse">
                <div className="md:max-w-1/2 max-w-full mb-8 md:mb-0">
                  <img
                    src="public/doggu.jpg"
                    alt="A dog"
                    className="w-full rounded-4xl shadow shadow-lime-500/20"
                  />
                </div>
                <div>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto text-left">
                    We're a passionate team of animal lovers working to protect
                    street & domestic animals across Nepal.
                    <span className="text-lime-600 font-medium">
                      {" "}
                      StreetSathi
                    </span>{" "}
                    was founded with a mission to connect compassion with action
                    rescuing, treating, and caring for our four-legged friends
                    who deserve love and safety. Through community engagement,
                    rapid response, and medical care, we strive to create a
                    safer world for animals.
                  </p>
                  <div className="pt-8 flex items-center justify-left gap-5">
                    <button className="bg-lime-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-600 transition-all cursor-pointer">
                      Report Rescue
                    </button>
                    <button className="border-2 border-lime-500 text-lime-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-50 transition-all cursor-pointer">
                      Donate Here
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="mission"
          className="py-20 px-4 `bg-gradient-to-b` from-white to-lime-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our <span className="text-lime-500">Mission</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Protecting street dogs from harm and ensuring they receive
                proper care.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8 text-lime-500" />,
                  title: "Rescue & Protection",
                  desc: "We respond quickly to reports of dogs in danger, providing immediate rescue.",
                },
                {
                  icon: <Heart className="w-8 h-8 text-lime-500" />,
                  title: "Medical Care",
                  desc: "Every rescued dog receives full medical treatment, vaccines, and ongoing care.",
                },
                {
                  icon: <Users className="w-8 h-8 text-lime-500" />,
                  title: "Community Building",
                  desc: "We educate communities on compassion and create networks of caring individuals.",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-lime-100 transition-shadow"
                >
                  <div className="w-full flex justify-center items-center">
                    <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mb-6">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="help"
          className="py-20 px-4 bg-lime-500 text-center rounded-4xl"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Help Save a Life Today
            </h2>
            <p className="text-xl text-lime-50 mb-8">
              Your action can make the difference between life and death for a
              streets in need.
            </p>
            <button className="bg-white text-lime-600 px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-lime-50 hover:scale-105 transition-all">
              Get Involved Now
            </button>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in <span className="text-lime-500">Touch</span>
              </h2>
              <p className="text-xl text-gray-600">
                Have a animal in need? Reach out now.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  Icon: Phone,
                  label: "Emergency Hotline",
                  value: "+977 98xxxxxxxx",
                },
                {
                  Icon: Mail,
                  label: "Email Us",
                  value: "rescue@streetsathi.com",
                },
                { Icon: MapPin, label: "Location", value: "Nepal" },
              ].map((info, idx) => (
                <div key={idx} className="text-center p-6">
                  <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.Icon className="w-8 h-8 text-lime-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{info.label}</h3>
                  <p className="text-lime-600 font-semibold">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <br />
      <p className="text-gray-500 text-sm">
        © 2025 StreetSathi. All rights reserved.
      </p>
    </div>
  );
};

export default Landing;
