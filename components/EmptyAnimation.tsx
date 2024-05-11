"use client";

import Lottie from "lottie-web";
import React, { useEffect } from "react";

const EmptyAnimation = () => {
  useEffect(() => {
    const container = document.getElementById("empty-container");
    const animation = Lottie.loadAnimation({
      // @ts-expect-error
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/empty.json",
    });

    return () => {
      animation.destroy(); // Clean up the animation when the component unmounts
    };
  }, []);
  return <div id="empty-container" className="h-52 w-full object-cover"></div>;
};

export default EmptyAnimation;
