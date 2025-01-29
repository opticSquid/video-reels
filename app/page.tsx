"use client";
import dynamic from "next/dynamic";
const ShakaContainer = dynamic(() => import("@/components/shaka-reels"), {
  ssr: false,
});
const videoList: string[] = [
  "222ac98ed7d9acbcd9d3a23f68ff01faa3c5f828c4a82cff431a924f8a5da52f1b6cb3ba62e89214d149360adcac25cc14be296b066875984570edbffa45c162.mp4",
  "7124ae1f52178821d103da133309ad9317ceff1e414da348a26aba264a0de743f32bdf44424b54ba8bfdc81ba24debb600d49caa43dd6da4c3bed747f762bb5c.mp4",
];
const videoos = ["spacex.mp4", "ghar.mp4"];
export default function Home() {
  return (
    <div className="scroll-smooth snap-y">
      {videoList.map((video) => (
        <div className="snap-center" key={video}>
          <ShakaContainer filename={video} autoPlay={true} />
        </div>
      ))}
    </div>
  );
}
