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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 overflow-hidden">
        <div className="w-full max-w-2xl mb-10 relative flex flex-col items-start gap-6 py-6 pb-0 mt-6">
          <h1 className="text-6xl font-medium  text-gray-900 mb-4 mt-10">
            The Secure way to store your contacts
          </h1>
          <p className="text-lg text-gray-600">
            Bringing the best solutions to your device by enabling seamless
            method to manage your contacts all in one place.
          </p>
          <Button
            onClick={userNavigate}
            className="mt-4 py-3 translate-y-5 size-2xl"
          >
            Try CM+
          </Button>
        </div>
        <div className="relative">
          <img
            src={illustration}
            alt="Image"
            className=" p-6 w-full object-contain dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-3 gap-6 overflow-hidden">
          {headings.map((heading, index) => (
            <div
              key={index}
              className="border-black border-1 p-6 rounded-2xl w-auto bg"
            >
              <p className="text-2xl">{heading}</p>
              <p>{paragraphs[index]}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Home;
