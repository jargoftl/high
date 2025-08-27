import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import logo from "/images/logo/loo1.jpg";
import PopModal from "./PopModal";
import ErrorModal from "./ErrorModal";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  // state for info
  const [info, setInfo] = useState({ name: "", title: "", paragraph: "" });

  // fetch info from API
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("https://electric-eel.onrender.com/info");
        const data = await res.json();
        setInfo(data); // {name, title, paragraph}
      } catch (err) {
        console.error("Error fetching info", err);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/planet.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 min-h-screen flex flex-col bg-opacity-40">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 text-white">
          <div className="flex items-center">
            <img
              alt="logo"
              src={logo}
              className="w-[30px] h-[30px] rounded-full mr-2 border bg-white"
            />
            <h3 className="font-bold font-sans">{info.name || "Loading..."}</h3>
          </div>

          <div className="flex gap-3 text-[20px]">
            <a
              href="https://x.com/X"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <BsTwitterX />
            </a>

            <a
              href="https://t.me/TG"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors"
            >
              <PiTelegramLogoLight />
            </a>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-[2.5em] font-semibold my-4 text-white">
            {info.title || "Loading title..."}
          </h1>
          <p className="max-w-md mb-6 text-[13px] text-white">
            {info.paragraph || "Loading paragraph..."}
          </p>

          {/* Connect Wallet Button */}
          <button
            onClick={() => setShowModal(true)}
            className="relative bg-[#4b48ff] text-white font-medium text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group"
          >
            <span className="mr-10">Connect wallet</span>
            <div className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95">
              →
            </div>
          </button>
        </div>

        {/* Modals */}
        {showModal && (
          <PopModal
            onClose={() => setShowModal(false)}
            onError={() => {
              setShowModal(false);
              setShowError(true);
            }}
          />
        )}
        {showError && <ErrorModal onClose={() => setShowError(false)} />}
      </div>
    </div>
  );
};

export default Homepage;
