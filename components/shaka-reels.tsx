import { ShakaError } from "@/types/shaka-error";
import { VideoPlayerProps } from "@/types/video-player-props";
import { createRef, PureComponent, RefObject } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");
interface MyComponentState {
  liked: boolean;
}
class ShakaPlayer extends PureComponent<VideoPlayerProps, MyComponentState> {
  videoContainer: RefObject<HTMLDivElement | null>;
  video: RefObject<HTMLVideoElement | null>;
  extractedFilename: string;
  autoPlay: boolean;
  constructor(props: VideoPlayerProps) {
    super(props);
    this.state = {
      liked: false,
    };
    this.video = createRef();
    this.videoContainer = createRef();
    this.extractedFilename = props.filename.replace(/\.[^.]+$/, "");
    this.autoPlay = props.autoPlay;
  }
  componentDidMount() {
    const video = this.video.current;
    const videoContainer = this.videoContainer.current;

    const player = new shaka.Player();
    player.attach(video);
    new shaka.ui.Overlay(player, videoContainer, video);
    // const controls = ui.getControls();

    const onError = (error: ShakaError) => {
      // Log the error.
      console.error("Error code", error.code, "object", error);
    };

    player
      .load(
        `http://localhost:9000/hangout-storage-path/${this.extractedFilename}/${this.extractedFilename}.mpd`
      )
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(onError); // onError is executed if the asynchronous load fails.
  }
  componentDidUpdate(prevProps: VideoPlayerProps) {
    const { autoPlay } = this.props as Readonly<VideoPlayerProps>;

    if (prevProps.autoPlay !== autoPlay) {
      if (autoPlay) {
        this.video.current?.play(); // Play the video when autoPlay is true
      } else {
        this.video.current?.pause(); // Pause the video when autoPlay is false
      }
    }
  }
  toggleLike = () => {
    this.setState((prevState, props) => ({ liked: !prevState }));
  };
  render() {
    return (
      <div className="relative w-full h-screen flex justify-center items-center bg-black">
        <div
          data-shaka-player-container
          ref={this.videoContainer}
          className="h-full w-auto max-w-full object-cover"
        >
          <video
            data-shaka-player
            id="video"
            ref={this.video}
            autoPlay={this.autoPlay}
            loop={true}
            muted
          />
        </div>
        <div className="absolute bottom-10 right-5 flex flex-col gap-4">
          <button onClick={this.toggleLike} className="text-white text-3xl">
            {this.state.liked ? (
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
  }
}
export default ShakaPlayer;
