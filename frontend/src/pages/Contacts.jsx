import { useEffect, useState } from "react";
import contactService from "../api/contactService.js";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
  UserRoundPlus,
  Phone,
  MessageSquareMore,
  SquarePen,
  Ellipsis,
  Menu
} from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area.jsx";
import { Separator } from "../components/ui/separator.jsx";
import { Avatar } from "../components/ui/avatar.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet.jsx";
import { Navbar } from "../components/ui/navbar";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  const load = async () => {
    const res = await contactService.getContacts();
    setContacts(res.data);
  };
  useEffect(() => {
    load();
  }, []);

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex justify-center flex-col items-center p-4 gap-4">
        <div className="flex w-full mb-4">
          <span className="mr-3 ms-3">Total Contacts</span>
          <span className="text-black bg-white px-2 rounded-full">
            {contacts.length}
          </span>
        </div>
        <div className="w-full">
          <input
            placeholder="Search contacts..."
            type="text"
            className="w-full px-3 py-2 border rounded-md text-slate-700"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        {sortedLetters.map((letter) => (
          <div key={letter} className="mb-2 px-4">
            <span className="text-sm font-semibold text-slate-600">{letter}</span>
            <Separator className="my-2" />

            {groups[letter].map((c) => (
              <div
                key={c._id}
                className="flex gap-2 justify-start items-center p-2 hover:rounded-full hover:bg-blue-100 rounded-md cursor-pointer transition-colors"
              >
                <Avatar className="h-8 w-8 bg-gray-500 text-white text-center grid content-center flex-shrink-0">
                  {c.name ? c.name.charAt(0).toUpperCase() : "#"}
                </Avatar>
                <span className="ml-2 text-sm truncate">{c.name}</span>
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        <button className="flex justify-center items-center gap-2 w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
          <UserRoundPlus className="h-5 w-5" />
          Add Contact
        </button>
      </div>
    </div>
  );

  return (
    <>
    <Navbar/>
    <div className="flex h-screen w-full flex-col bg-white mt-6">

      <div className="flex flex-1 overflow-hidden">
        {/* MOBILE NAV (Visible only on small screens) */}
        <div className="md:hidden absolute top-20 left-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* DESKTOP SIDEBAR (Hidden on mobile) */}
        <aside className="hidden md:flex w-80 flex-col bg-slate-50 text-slate-500 border-r rounded-r-2xl">
          <SidebarContent />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b">
            <h2 className="text-lg md:text-2xl font-bold truncate">Jane Doe</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="hidden sm:flex">
                Edit
              </Button>
              <Button size="sm">Save</Button>
            </div>
          </header>

          {/* Content */}
          <div className="p-4 md:p-8 space-y-6 flex-1">
            {/* Profile Card */}
            <Card className="rounded-2xl md:rounded-3xl border-none shadow-md bg-yellow-50">
              <CardContent className="p-6 md:p-10 flex flex-col items-center gap-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 bg-gray-500 text-white text-center flex justify-center items-center flex-shrink-0">
                  <UserRoundPlus className="h-12 w-12 md:h-16 md:w-16" />
                </Avatar>
                <div className="text-center w-full">
                  <h2 className="text-xl md:text-3xl font-bold mb-2">Jane Doe</h2>
                  <p className="text-slate-600 text-sm md:text-base mb-4">
                    jane.doe@example.com
                  </p>
                  <p className="text-slate-600 text-sm md:text-base mb-4">
                    (123) 456-7890
                  </p>
                  <Separator className="mx-auto max-w-60 mb-6" />

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-sm mx-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex flex-col items-center gap-1 h-auto py-2"
                    >
                      <SquarePen className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="text-xs">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex flex-col items-center gap-1 h-auto py-2"
                    >
                      <MessageSquareMore className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="text-xs">Message</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex flex-col items-center gap-1 h-auto py-2"
                    >
                      <Phone className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="text-xs">Call</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* History Section */}
              <Card className="border shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">History</h3>
                  <p className="text-sm text-slate-400">
                    Last contact: 2 hours ago via Call
                  </p>
                </CardContent>
              </Card>

              {/* Notes Section */}
              <Card className="border shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Notes</h3>
                  <p className="text-sm text-slate-400">
                    No notes added yet
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
