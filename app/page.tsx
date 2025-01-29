"use client";
import VideoReel from "@/components/video-reels";
import dynamic from "next/dynamic";
const ShakaContainer = dynamic(() => import("@/components/shaka-reels"), {
  ssr: false,
});
const videoList: string[] = [
  "222ac98ed7d9acbcd9d3a23f68ff01faa3c5f828c4a82cff431a924f8a5da52f1b6cb3ba62e89214d149360adcac25cc14be296b066875984570edbffa45c162.mp4",
];
export default function Home() {
  return (
    <div className="scroll-smooth snap-y">
      {videoList.map((video) => (
        <div className="snap-center">
          <ShakaContainer filename={video} autoPlay={true} key={video} />
        </div>
      ))}
    </div>
  );
}
