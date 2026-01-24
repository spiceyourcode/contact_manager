
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Home as HomeIcon, Users, User, LogIn, UserPlus } from "lucide-react"

function Home(){
    return(
        <>
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
                                    <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
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
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">This is the homepage!</h1>
                <p className="text-lg text-gray-600">Welcome to your contact management system.</p>
            </div>
        </>
    )
}
export default Home;