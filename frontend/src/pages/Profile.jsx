import useAuth from "../hooks/useAuth.js";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Users, User, LogIn, UserPlus } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
export default function Profile() {
    const { user, logout, loading } = useAuth();

    if (loading) {
        return <div>Loading user data...</div>;
    }

    return (

        <div>
            {/* Navbar */}
            <nav className="border-b bg-white shadow-sm mt-10 border-2 rounded-full max-w-6xl m-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                                Contact Manager
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList className="gap-6">
                                <NavigationMenuItem>
                                    <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                        <HomeIcon className="h-4 w-4" />
                                        Home
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/contacts" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                        <Users className="h-4 w-4" />
                                        Contacts
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/profile"  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
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
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                            <LogIn className="h-4 w-4" />
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="default" size="sm" className="flex items-center gap-2">
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
            <h2>Profile</h2>

            {user ? (
                <div>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <div>
                    <p>No user data available</p>
                    <p>Please log in to view profile</p>
                </div>
            )}

            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
