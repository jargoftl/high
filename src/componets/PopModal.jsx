import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const messages = [
  "Initializing connection...",
  "Establishing secure channel...",
  "Verifying wallet compatibility...",
  "Connecting to blockchain...",
  "Authenticating wallet...",
  "Finalizing connection...",
  " Connection established!",
];

const PopModal = ({ onClose, onError }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    let index = 0;

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 15) + 5; // +5 to +20
      currentProgress = Math.min(currentProgress + increment, 100);

      setProgress(currentProgress);

      if (
        index < messages.length - 1 &&
        currentProgress >= (100 / (messages.length - 1)) * (index + 1)
      ) {
        index++;
        setMessageIndex(index);
      }

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          onError();
        }, 3000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onError]);

  return (
    <div className="fixed inset-0 bg-[#00000099] flex items-end justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: -10 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg text-center"
        >
          <h3 className="font-bold text-lg mb-2">Connecting Wallet</h3>

          {/* Softer, beautiful text */}
          <p className="mb-4 text-sm text-gray-500 font-light leading-relaxed tracking-wide">
            Please wait while we establish a secure connection...
          </p>

          {/* Progress Bar */}
          <StyledWrapper>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </StyledWrapper>

          {/* Percentage & Status */}
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">{progress}%</h2>
            <p className="mt-2 text-sm text-gray-600 font-medium italic">
              {messages[messageIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const StyledWrapper = styled.div`
  .progress-bar {
    width: 100%;
    height: 10px;
    border-radius: 8px;
    background: #e5e7eb;
    overflow: hidden;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  .progress-fill {
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(90deg, #1e293b, #002b5c, #004080, #3f485a);
    background-size: 300% 100%;
    animation: gradientShift 4s linear infinite;
    transition: width 0.8s ease-in-out;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
`;

export default PopModal;
