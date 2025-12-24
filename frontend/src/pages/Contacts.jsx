import { useEffect, useState } from "react";
import contactService from "../api/contactService.js";
import { Button } from "../components/ui/Button";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await contactService.getContacts();
    setContacts(res.data);
  };
  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await contactService.createContact({ name });
    setName("");
    load();
  };

  const remove = async (id) => {
    await contactService.deleteContact(id);
    load();
  };

  return (
    <div>
      <h2>Contacts</h2>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button onClick={add}>Add</Button>

      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            {c.name}
            <Button onClick={() => remove(c.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
