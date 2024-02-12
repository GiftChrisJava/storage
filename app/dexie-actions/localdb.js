"use server";
import dataBase from "../../db";

// Enable the Syncable plugin

// save video to progress
export const saveVideoToDb = async (video) => {
  const savedVideo = await dataBase.progress.add(video);

  console.log("saved video ", savedVideo);

  return savedVideo;
};

// save user to progress
export const saveUserToDb = async (user) => {
  const savedUser = await dataBase.students.add(user);

  console.log("saved user ", savedUser);

  return savedUser;
};

// retrive a user from dexie db
export const getUserFromDb = async (email) => {
  return await dataBase.students.get({ email: email });
};
// retrive a video from dexie db
export const getVideoFromDb = async (videoId) => {
  return await dataBase.videos.get({ id: videoId });
};

// saving progress to Dexie
export const saveProgressToDb = async (progressData) => {
  const savedProgress = await dataBase.progress.add(progressData);
  console.log("saved progress ", savedProgress);
  return savedProgress;
};

// retrieving progress from Dexie
export const getProgressFromDb = async (userId, videoId) => {
  return await dataBase.progress
    .where({ user_id: userId, video_id: videoId })
    .first();
};

// sync offline data
// export const syncOfflineData = async () => {

// }
