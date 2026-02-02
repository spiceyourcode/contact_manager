import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Users,
  User,
  LogIn,
  UserPlus,
  Menu
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import useAuth from "../../hooks/useAuth.js";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
export function Navbar({ sidebarContent = null }) {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-white shadow-sm mt-10 border-2 rounded-full max-w-6xl m-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              {sidebarContent || (
                <div className="p-4 space-y-4">
                  <nav className="space-y-2">
                    {user && (
                      <>
                        <Link
                          to="/"
                          className="flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium"
                        >
                          <HomeIcon className="h-4 w-4" />
                          Home
                        </Link>
                        <Link
                          to="/contacts"
                          className="flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium"
                        >
                          <Users className="h-4 w-4" />
                          Contacts
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

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
            {
              user? 
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <Link
                  to="/"
                  className="hover:bg-blue-300 transition-colors ease-in flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/contacts"
                  className=" hover:bg-blue-300 transition-colors ease-in flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Users className="h-4 w-4" />
                  Contacts
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/profile"
                  className="hover:bg-blue-300 transition-colors ease-in  flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
              : null
            }
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
  );
}
