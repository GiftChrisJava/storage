"use server";

// Define a function to check the internet connection
export async function checkInternet() {
  try {
    // Send a request to a server and check the response status
    const response = await fetch("http://localhost:8080/progress");
    if (response.ok) {
      // The internet connection is working
      return true;
    } else {
      // The internet connection is not working
      return false;
    }
  } catch (error) {
    // The request failed, probably due to network error
    return false;
  }
}
export async function createInitialProgress(user_id, video_id) {
  try {
    const response = await fetch("http://localhost:8080/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id, video_id: video_id }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// get user progress on video
export async function getInitialProgress(user_id, video_id) {
  try {
    const response = await fetch(
      `http://localhost:8080/progress/${user_id}/${video_id}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user progress:", error);
  }
}

// update progress of video time on server
export async function updateProgressOnServer(
  progress_id,
  user_id,
  video_id,
  progress_time
) {
  console.log(progress_id, user_id, video_id, progress_time);
  const response = await fetch(
    `http://localhost:8080/progress/${progress_id}/${user_id}/${video_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress_time: progress_time,
        video_id: video_id,
      }),
    }
  );

  const data = await response.json();
  console.log(data);

  console.log("updated");
}
// add user to db
export async function addUserToDatabase(email) {
  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// get user by email
export async function getUserByEmail(email) {
  console.log("user gotten");
  try {
    const response = await fetch(`http://localhost:8080/user/email/${email}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

// get user by email
export async function getVideoById(video_id) {
  console.log("video gotten");
  try {
    const response = await fetch(`http://localhost:8080/video/${video_id}`);

    const data = await response.json();
    console.log(data.url);

    return data;
  } catch (error) {
    console.error("Error getting video:", error);
  }
}
