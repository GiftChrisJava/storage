"use client";
import React, { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import {
  checkInternet,
  createInitialProgress,
  getInitialProgress,
  updateProgressOnServer,
} from "../server-actions/actions";
// Import store2
import store from "store2";

const VideoPlayer = ({ video, user_id }) => {
  const videoUrl = video.url;
  const video_id = video.id;

  const [progressTime, setProgressTime] = useState(0);
  const [progress_id, setProgress_id] = useState(0);

  const hasMounted = useRef(false);
  const playerRef = useRef(null);

  const fetchVideoProgress = async () => {
    try {
      let progressData;

      if (await checkInternet()) {
        // get initial progress from the server
        progressData = await getInitialProgress(user_id, video_id);

        // Store the progress data in store2
        store.set("progress", progressData);
      } else {
        // Retrieve the progress data from store2
        progressData = store.get("progress");
      }

      if (progressData.progress_time > 0) {
        setProgressTime(progressData.progress_time);
        setProgress_id(progressData.id);
      } else {
        const data = await createInitialProgress(user_id, video_id);
        setProgress_id(data.id);
        // Store the progress data in store2
        store.set("progress", data);
        return;
      }
    } catch (error) {
      console.error("Error fetching initial progress:", error);
    }
  };

  const onPlayerReady = (event) => {
    if (progressTime > 0) {
      event.target.seekTo(progressTime); // Seek to stored progress
    }
  };
  const onPlayerStateChange = async (event) => {
    const currentTime = event.target.getCurrentTime();
    if (await checkInternet()) {
      console.log("Internet is on");
      // Update the progress on the server immediately
      await updateProgressOnServer(progress_id, user_id, video_id, currentTime);
    } else {
      console.log("Internet is off");
      // Store the update locally in store2
      const localUpdate = {
        progress_id,
        user_id,
        video_id,
        progress_time: currentTime,
      };
      store.set("localUpdate", localUpdate);
    }
  };
  const checkAndSyncUpdates = async () => {
    if (await checkInternet()) {
      const localUpdate = store.get("localUpdate");
      if (localUpdate) {
        console.log("Syncing updates to the server...");
        // Synchronize the local update with the server
        await updateProgressOnServer(
          localUpdate.progress_id,
          localUpdate.user_id,
          localUpdate.video_id,
          localUpdate.progress_time
        );
        store.remove("localUpdate");
      }
    }
  };
  useEffect(() => {
    // Periodically check for internet connectivity and sync updates
    const syncInterval = setInterval(checkAndSyncUpdates, 5000); // Adjust the interval as needed

    return () => {
      clearInterval(syncInterval); // Clear the interval on component unmount
    };
  }, []);
  useEffect(() => {
    if (hasMounted.current) {
      // Fetch progress only if the player is ready
      fetchVideoProgress();
    } else {
      hasMounted.current = true;
    }
  }, []); // Depend on video_id, duration, and playerReady
  const getYoutubeIdFromUrl = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w\-]+)/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const youtubeVideoId = getYoutubeIdFromUrl(videoUrl);
  const opts = {
    height: "480px",
    width: "100%",
    playerVars: {
      // Enable progress tracking
      autoplay: 0,
      enablejsapi: 1,
    },
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <YouTube
        videoId={youtubeVideoId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        ref={playerRef}
      />
    </div>
  );
};

export default VideoPlayer;
