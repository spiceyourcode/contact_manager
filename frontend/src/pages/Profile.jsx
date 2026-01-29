import useAuth from "../hooks/useAuth.js";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Users,
  User,
  LogIn,
  UserPlus,
  Ellipsis,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import contactService from "../api/contactService.js";
import React, { useState, useEffect } from 'react'



export default function Profile() {
  const { user, logout, loading } = useAuth();
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const res = await contactService.getContacts();
        setContacts(res.data);
        console.log(res.data);
        return res.data;
    } catch (error) {
      console.error("Error loading contacts:", error);
      return [];
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size=8" />
      </div>
    );
  }

  return (
    <>
      <div>
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
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={logout}
                  >
                    <LogIn className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>  
      </div>

      <Card className="max-w-4xl mx-auto mt-10 shadow-sm rounded-4xl border-none bg-gray-200">
        <CardHeader>
          <CardTitle>
            <h2>Profile</h2>
          </CardTitle>

          <CardAction>
            <Button variant="ghost">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-12 items-center">
            <div>
              <Avatar className="h-[250px] aspect-square w-auto  bg-white grid place-items-center text-3xl">
                {user?.username ? user.username.charAt(0).toUpperCase() : "#"}
              </Avatar>
            </div>
            <div>
              <h3 className="text-2xl mb-6 font-bold">{user?.username}</h3>
              <p className="text-sm text-slate-400">{user?.email}</p>
            </div>
            <div></div>
            <div></div>
          </div>
        </CardContent>
      </Card>

      {/* stats card */}

      <Card className="max-w-4xl mx-auto mt-10 shadow-sm rounded-4xl border-none bg-gray-200">
        <CardHeader>
          <CardTitle>
            <h2>My Contact Stats</h2>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="max-w-50">
            <h6 className="text-[8px]">Total Contacts</h6>
            <Separator className="bg-gray-800 h-[2px] mb-2 " />
            <Avatar>
              <span className="text-xl w-fit aspect-square h-auto bg-white grid place-items-center">
                {contacts.length}
              </span>
            </Avatar>
          </div>

          <div className="mt-3 max-w-50">
            <h6 className="text-[8px]">Total Contacts</h6>
            <Separator className="bg-gray-800 h-[2px] mb-2" />
            <Avatar>
              <span className="text-xl w-fit aspect-square h-auto bg-white grid place-items-center">
                {contacts.length}
              </span>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
