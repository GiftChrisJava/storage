import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import VideoPlayer from "../components/VideoPlayer";
import {
  checkInternet,
  getUserByEmail,
  getVideoById,
} from "../server-actions/actions";
// Import node-localstorage
const LocalStorage = require("node-localstorage").LocalStorage;
import { cookies } from "next/headers";

export default async function VideoList() {
  // Create a new node-localstorage instance
  const localStorage = new LocalStorage("./scratch");
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  let userFromDb = null;
  let user_id = null;
  let video = null;
  let email = null;

  // Check if the browser is online
  if (await checkInternet()) {
    // Fetch the video data from the server
    video = await getVideoById(1);

    // Store the video data in node-localstorage
    localStorage.setItem("video", JSON.stringify(video));

    // store user from supabase
    localStorage.setItem("supabase_user", JSON.stringify(user));

    const supabaseUser = JSON.parse(localStorage.getItem("supabase_user"));
    email = supabaseUser.email;

    // Fetch the user data from the server
    userFromDb = await getUserByEmail(email);
    user_id = userFromDb.id;

    // Store the user_id in node-localstorage
    localStorage.setItem("user_id", JSON.stringify(user_id));
  } else {
    // Retrieve the video data from node-localstorage
    video = JSON.parse(localStorage.getItem("video"));

    // Retrieve the user_id from node-localstorage
    user_id = JSON.parse(localStorage.getItem("user_id"));
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start mb-11">
          <h1 className="text-2xl md:text-2xl font-bold text-gray-200 mb-6">
            My Videos
          </h1>
          <form action="../auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign out
            </button>
          </form>
        </div>

        <VideoPlayer video={video} user_id={user_id} />
      </div>
    </div>
  );
}
