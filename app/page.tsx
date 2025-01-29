import VideoReel from "@/components/video-reels";
const videoList: string[] = ["spacex.mp4", "ghar.mp4"];
export default function Home() {
  return (
    <div className="scroll-smooth snap-y">
      {videoList.map((video, index) => (
        <div className="snap-center">
          <VideoReel src={video} key={video} />
        </div>
      ))}
    </div>
  );
}
