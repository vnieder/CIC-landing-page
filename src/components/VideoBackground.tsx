import React from "react";

interface VideoBackgroundProps {
  src: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => (
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src={src}
    autoPlay
    loop
    muted
    playsInline
  />
);

export default VideoBackground;
