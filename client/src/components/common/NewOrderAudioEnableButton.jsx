import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const NewOrderAudioEnableButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false); // User consent
  const audioRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("create-order", (data) => {
      console.log("New Order received:", data);

      // Play the sound immediately when the order is received
      if (audioAllowed && audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
        setIsPlaying(true);
      }

      const confirmOrder = window.confirm(
        "New Order received. Do you want to confirm it?"
      );
      if (confirmOrder) {
        console.log("Order confirmed:", data.orderId);
        // Stop the sound if the order is confirmed
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      } else {
        console.log("Order rejected:", data.orderId);
        // Stop the sound if the order is rejected
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [audioAllowed]);

  // Stop the sound after 1 minute if not confirmed
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      }, 60000); // 1 minute
    }
    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <>
      <div>
        {/* Enable Sound Button */}
        <button
          onClick={() => setAudioAllowed(!audioAllowed)}
          className={`${
            audioAllowed ? "bg-secondary" : "bg-primary"
          } text-white p-2 rounded w-60`}
        >
          {`${audioAllowed? "Sound Enabled for New Orders" : "Enable Sound for New Orders"}`}
        </button>
        {/* Audio element for the notification sound */}
        <audio ref={audioRef} src="/assets/order-notification.mp3" loop />
      </div>
    </>
  );
};

export default NewOrderAudioEnableButton;
