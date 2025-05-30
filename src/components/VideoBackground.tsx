import React from "react";

interface VideoBackgroundProps {
  src: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => (
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    poster="/pitt-campus.jpg"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src={src} type="video/mp4" />
    {/* fallback image - for browsers that don’t support <video> */}
    <img
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="/pitt-campus.jpg"
      alt="Campus background"
    />
  </video>
);

export default VideoBackground;
