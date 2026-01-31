import { useEffect, useState } from "react";
import contactService from "../api/contactService.js";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
  UserRoundPlus,
  Phone,
  MessageSquareMore,
  SquarePen,
  Ellipsis
} from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area.jsx";
import { Separator } from "../components/ui/separator.jsx";
import { Avatar } from "../components/ui/avatar.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Navbar } from "../components/ui/navbar";

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
      <Navbar />

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
            <aside className="flex w-80 flex-col bg-slate-50 text-slate-500 border-2 rounded-4xl max-w-6xl absolute left-10 top-40 h-[calc(100vh-180px)] p-4 gap-4">
              <div className="flex justify-center flex-col items-center">
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

              <ScrollArea className="flex-1 min-h-0">
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

            {/* main content  */}
            <main flex className="ml-96 mt-12 p-8 max-w-6xl bg-yellow-50 rounded-4xl shadow-lg">
              {/* profile detail */}
              <div className=" flex justify-between bg-yellow-200 gap-10 h-auto p-8 rounded-4xl shadow-md">
                <Avatar className="h-[250px] aspect-square w-auto bg-gray-500 text-white text-center grid content-center">
                  <UserRoundPlus className="grid place-self-center" />
                </Avatar>

                <div className="flex flex-col flex-1 gap-4">
                  <h2 className="text-3xl font-semibold mb-4">John Doe</h2>
                  <p className="mb-2">john.doe@example.com</p>
                  <p className="mb-2">(123) 456-7890</p>
                  <Separator className="mx-0 max-w-60" />

                  <div className="flex gap-4 flex-wrap justify-start">
                    <Button variant="ghost" className="flex scale-100 items-center gap-2">
                      <SquarePen className="h-12 w-12" />
                    </Button>
                    <Button variant="ghost" className="flex scale-100 items-center gap-2">
                      <MessageSquareMore className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" className="flex scale-100 items-center gap-2">
                      <Phone className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Button variant="ghost" className="flex scale-100 items-center gap-2">
                    <Ellipsis className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* History Section */}
              <Card className="border-none shadow-sm rounded-[2rem ] mt-8">
                <CardContent className="p-8">
                    <h3 className="font-bold mb-4">History</h3>
                    <p className="text-sm text-slate-400">Last contact: 2 hours ago via Call</p>
                </CardContent>
            </Card>
            </main >
          </>
        );
      })()}
    </>
  );
}
