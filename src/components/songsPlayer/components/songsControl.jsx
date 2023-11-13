import React, { useEffect, useState } from "react";
import Button from "./controlButton";
import annyang from "annyang";
import "./songControl.css";

const SongsControl = (props) => {
  useEffect(() => {
    // Initialize annyang with voice commands
    if (annyang) {
      annyang.setLanguage("en-US");
      annyang.debug();
      annyang.addCommands({
        shuffle: () => props.shuffle(!props.shuffleActive),
        previous: () => props.previousSong(),
        play: () => {
          props.playing ? props.pauseSong() : props.playSong();
          console.log("play");
        },
        pause: () => {
          props.playing ? props.pauseSong() : props.playSong();
          console.log("play");
        },
        next: () => props.nextSong(),
        repeat: () =>
          props.repeatContext(props.repeatActive ? "off" : "context"),
      });
      annyang.start({ autoRestart: true, continuous: false }); // Auto-restart and non-continuous mode
      console.log("annyang started!");
    }

    return () => {
      if (annyang) {
        annyang.abort();
      }
    };
  }, [
    props.shuffleActive,
    props.previousSong,
    props.playing,
    props.pauseSong,
    props.playSong,
    props.nextSong,
    props.repeatActive,
    props.repeatContext,
  ]);

  return (
    <div className="song-control">
      <Button
        onClick={() => props.shuffle(!props.shuffleActive)}
        className={"shuffle-song" + (props.shuffleActive ? " active" : "")}
        icon="fa-random"
      />
      <Button
        className="back-song"
        icon="fa-step-backward reverse"
        onClick={props.previousSong}
      />
      <Button
        className="play-btn"
        onClick={props.playing ? props.pauseSong : props.playSong}
        icon={
          "play-btn " +
          (props.playing ? "fa-pause-circle-o" : "fa-play-circle-o")
        }
        playBtn
      />
      <Button
        className="next-song"
        icon="fa-step-forward forward"
        onClick={props.nextSong}
      />
      <Button
        onClick={() =>
          props.repeatContext(props.repeatActive ? "off" : "context")
        }
        className={"repeat-song" + (props.repeatActive ? " active" : "")}
        icon="fa-retweet"
      />
    </div>
  );
};

export default SongsControl;
