import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Users, User, LogIn, UserPlus } from "lucide-react";
import illustration from "../assets/example-29.svg";
import data from "./data.json";
import { useState } from "react";
function Home() {
  const [headings] = useState(data.headings);
  const [paragraphs] = useState(data.paragraphs);

  return (
    <>
      {/* Navbar */}
      <nav className="border-b bg-white shadow-sm mt-10 border-2 rounded-full max-w-6xl m-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900 hover:text-gray-700"
              >
                Contact Manager
              </Link>
            </div>

            {/* Navigation Links */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <HomeIcon className="h-4 w-4" />
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/contacts"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Users className="h-4 w-4" />
                    Contacts
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
          <Button className="mt-4 py-3 translate-y-5 size-2xl">Try CM+</Button>
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
          {
            headings.map((heading, index)=>(
              <div key= {index} className="border-black border-1 p-6 rounded-2xl w-auto bg">
                <p className="text-2xl">{heading}</p>
                <p>{paragraphs[index]}</p>
              </div>
            ))
          }
        </div>
      </section>
    </>
  );
}
export default Home;
