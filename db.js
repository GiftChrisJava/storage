import Dexie from "dexie";

const db = new Dexie("progress");
db.version(1).stores({
  students: "id, email", // store details about a user
  videos: "id, url", // store videos
  progress: "id, user_id, video_id, progress_time", // video progress store
});

export default db;
