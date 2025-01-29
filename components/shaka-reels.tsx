"use client";
import { ShakaError } from "@/types/shaka-error";
import { VideoPlayerProps } from "@/types/video-player-props";
import { createRef, PureComponent, RefObject } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiFillCamera,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { PiShareFill } from "react-icons/pi";
import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");
interface MyComponentState {
  liked: boolean;
  commented: boolean;
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
      commented: false,
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
    const uiConfig = {
      controlPanelElements: ["fullscreen", "overflow_menu"],
      overflowMenuButtons: ["quality", "playback_rate"],
      seekBarColors: {
        base: "rgba(255, 255, 255, 0.3)",
        buffered: "hsl(35 100% 20%)",
        played: "hsl(31 94% 72%)",
      },
    };
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    ui.configure(uiConfig);
    ui.getControls();

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
    this.setState((prevState) => ({ liked: !prevState.liked }));
  };
  toggleComment = () => {
    this.setState((prevState) => ({ commented: !prevState.commented }));
  };
  render() {
    return (
      <div className="relative w-full h-screen flex justify-center items-center bg-black">
        <div
          data-shaka-player-container
          ref={this.videoContainer}
          className="h-screen w-full max-w-full object-cover z-0"
        >
          <video
            data-shaka-player
            id="video"
            ref={this.video}
            autoPlay={this.autoPlay}
            loop={true}
            muted
            className="h-screen w-full max-w-full object-cover z-0"
          />
        </div>
        <div className="absolute bottom-16 right-3 flex flex-col space-y-2 gap-4 z-10">
          <button onClick={this.toggleLike} className="text-white text-3xl">
            {this.state.liked ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
          <button onClick={this.toggleComment} className="text-white text-3xl">
            {this.state.commented ? (
              <AiFillCamera className="text-red-500" />
            ) : (
              <AiOutlineComment />
            )}
          </button>
          <button className="text-white text-3xl">
            <AiOutlineShareAlt />
          </button>
        </div>
      </div>
    );
  }
}
export default ShakaPlayer;
