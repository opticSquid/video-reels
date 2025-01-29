"use client";
import { useRef, useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

interface VideoReelProps {
  src: string;
}

const VideoReel: React.FC<VideoReelProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-black">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-auto max-w-full object-cover"
        loop
        muted
        autoPlay
        onClick={handleVideoClick}
      />
      <div className="absolute bottom-10 right-5 flex flex-col gap-4">
        <button onClick={toggleLike} className="text-white text-3xl">
          {liked ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
        <button className="text-white text-3xl">
          <AiOutlineComment />
        </button>
      </div>
    </div>
  );
};

export default VideoReel;
