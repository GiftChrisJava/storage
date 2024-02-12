/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import image3 from "../public/img3.jpeg";
import image2 from "../public/img2.jpeg";
import image1 from "../public/img1.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 mt-14 mx-auto max-w-md">
      <div className="flex justify-between">
        <Image
          src={image3}
          className="h-24 w-24 rounded-full hidden md:flex object-cover mx-auto mb-6"
        />
        <Image
          src={image2}
          className="h-24 w-24 rounded-full object-cover mx-auto mb-6"
        />
        <Image
          src={image1}
          className="h-24 w-24 rounded-full hidden md:flex object-cover mx-auto mb-6"
        />
      </div>

      <div className="container  p-6">
        <h1 className="text-2xl font-extrabold text mb-6 text-gray-200">
          Malawi Education Enhancement Platform
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Expand your knowledge and understand complex lessons taught in class
          by watching videos, reading articles and practice quizez
        </p>

        <div className=" flex justify-between">
          <button className="bg-gray-800 text-gray-200 hover:text-white hover:cursor-pointer font-bold rounded-lg shadow-lg py-2 px-3">
            <a href="/login">Login</a>
          </button>

          <button className="bg-gray-800 text-gray-200 hover:text-white hover:cursor-pointer font-bold rounded-lg shadow-lg py-2 px-3">
            <a href="/register">Register</a>
          </button>
        </div>
      </div>
    </div>
  );
}
