import { useEffect, useState } from "react";
import contactService from "../api/contactService.js";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Users,
  User,
  LogIn,
  UserPlus,
  UserRoundPlus,
  Scroll,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "../components/ui/navigation-menu.jsx";
import { ScrollArea } from "../components/ui/scroll-area.jsx";
import { Separator } from "../components/ui/separator.jsx";
import { Avatar } from "../components/ui/avatar.jsx";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");

  // const [editingId, setEditingId] = useState(null);
  // const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });

  const load = async () => {
    const res = await contactService.getContacts();
    setContacts(res.data);
  };
  useEffect(() => {
    load();
  }, []);

  // const add = async () => {
  //   try {
  //     await contactService.createContact({ name, email, phone });
  //     setName("");
  //     setEmail("");
  //     setPhone("");
  //     load();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const startEdit = (contactId) => {
  //   setEditingId(contactId);
  //   const contact = contacts.find((c) => c._id === contactId);
  //   if (contact) {
  //     setEditForm({
  //       name: contact.name,
  //       email: contact.email,
  //       phone: contact.phone,
  //     });
  //   }
  // };
  // const saveEdit = async () => {
  //   try {
  //     await contactService.updateContact(editingId, editForm);
  //     setEditingId(null);
  //     setEditForm({ name: "", email: "", phone: "" });
  //     load();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const remove = async (id) => {
  //   await contactService.deleteContact(id);
  //   load();
  // };

  return (
    <>
      {/* Navbar */}
      <nav className="border-b bg-slate-50 text-slate-900 shadow-sm mt-10 border-2 rounded-full max-w-6xl m-auto">
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

      {(() => {
        const groups = contacts.reduce((acc, c) => {
          const letter =
            c && c.name && c.name.charAt(0)
              ? c.name.charAt(0).toUpperCase()
              : "#";
          if (!acc[letter]) acc[letter] = [];
          acc[letter].push(c);
          return acc;
        }, {});

        const sortedLetters = Object.keys(groups).sort();

        return (
          <>
            {/* Sidebar */}
            <aside className="flex w-80 flex-col bg-slate-50 text-slate-500 border-2 rounded-4xl max-w-6xl absolute left-10 top-40 h-[calc(90vh-100px)] p-4 gap-4">
              <div className="flex justify-center flex-col items-center">
                <h1 className="text-xl font-semibold mb-4">ContactHub</h1>

                <div className="flex w-full mb-4">
                  <span className="mr-3 ms-3">Total Contacts</span>
                  <span className="text-black bg-white px-2 rounded-full">
                    {contacts.length}
                  </span>
                </div>
                <div>
                  <search></search>
                  <input placeholder="Search contacts..." type="text" name="" id="" />
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-200px)]">
                {sortedLetters.map((letter) => (
                  <div key={letter} className="mb-2">
                    <span className="relative left-4">{letter}</span>
                    <Separator className="my-2" />

                    {groups[letter].map((c) => (
                      <div
                        key={c._id}
                        className="flex gap-1 justify-start items-center p-2 hover:rounded-full hover:bg-blue-100 rounded-md"
                      >
                        <div>
                          <Avatar className="h-8 w-8 bg-gray-500 text-white text-center grid content-center">
                            {c.name ? c.name.charAt(0).toUpperCase() : "#"}
                          </Avatar>
                        </div>
                        <div>
                          <span className="ml-2">{c.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </ScrollArea>

              <button className="flex justify-center items-center gap-2 mt-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer">
                <UserRoundPlus className="h-5 w-5 mr-12" />
                Add Contact
              </button>
            </aside>
          </>
        );
      })()}}
    </>
  );
}
