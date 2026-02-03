import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import illustration from "../assets/example-29.svg";
import data from "./data.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/navbar";

function Home() {
  const [headings] = useState(data.headings);
  const [paragraphs] = useState(data.paragraphs);
  const navigate = useNavigate();

  const userNavigate = () => {
    navigate("/contacts");
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        <div className="w-full relative flex flex-col items-start gap-4 sm:gap-6 py-6 pb-0 mt-0 sm:mt-6 justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-2 sm:mb-4">
            The Secure way to store your contacts
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Bringing the best solutions to your device by enabling seamless
            method to manage your contacts all in one place.
          </p>
          <Button
            onClick={userNavigate}
            className="mt-4 py-2 sm:py-3"
          >
            Try CM+
          </Button>
        </div>
        <div className="relative flex items-center justify-center">
          <img
            src={illustration}
            alt="Image"
            className="p-4 sm:p-6 w-full max-w-sm sm:max-w-none object-contain dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
          {headings.map((heading, index) => (
            <div
              key={index}
              className="border border-black p-4 sm:p-6 rounded-2xl bg-white hover:shadow-lg transition-shadow"
            >
              <p className="text-xl sm:text-2xl font-semibold mb-2">{heading}</p>
              <p className="text-sm sm:text-base text-gray-700">{paragraphs[index]}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Home;
