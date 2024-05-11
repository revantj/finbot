"use client";

import React, { useEffect } from "react";
import Lottie from "lottie-web";

const ChatbotAnimation = () => {
  useEffect(() => {
    const container = document.getElementById("chatbot-container");
    const animation = Lottie.loadAnimation({
      // @ts-expect-error
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/chatbot.json",
    });

    return () => {
      animation.destroy(); // Clean up the animation when the component unmounts
    };
  }, []);
  return (
    <div id="chatbot-container" className="h-[562px] w-full object-cover"></div>
  );
};

export default ChatbotAnimation;
