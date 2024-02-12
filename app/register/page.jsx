/* eslint-disable jsx-a11y/alt-text */
"use client";

import Image from "next/image";
import image1 from "../../public/img1.jpeg";

export default function page() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mx-auto max-w-sm mt-24">
      <div className="flex justify-between">
        <Image
          src={image1}
          className="h-24 w-24 rounded-full  object-cover mx-auto mb-11"
        />
      </div>
      <form action="../auth/signup" method="post" className="flex flex-col">
        <input
          required
          type="text"
          name="email"
          id="email"
          placeholder="Enter Email"
          className="p-2 mb-8 text-gray-800 rounded w-full focus:outline-none focus:shadow-lg"
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          className="p-2 text-gray-800 rounded w-full focus:outline-none focus:shadow-lg"
        />
        <div className=" flex justify-between mt-8">
          <button className="bg-gray-800 text-gray-200 border border-gray-400 hover:text-gray-600 hover:cursor-pointer font-bold rounded-lg shadow-xl py-2 px-3">
            Sign Up
          </button>

          <p className="text-gray-300 hover:text-gray-400 hover:cursor-pointer rounded-lg py-2 px-3">
            <a href="/login">Already have an account</a>
          </p>
        </div>
      </form>
    </div>
  );
}
