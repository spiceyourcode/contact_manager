import { useEffect, useState } from "react";
import contactService from "../api/contactService.js";
import { Button } from "../components/ui/Button";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const load = async () => {
    const res = await contactService.getContacts();
    setContacts(res.data);
  };
  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    try {
      await contactService.createContact({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      load();
    } catch (error) {
      console.log(error);
    }

  };
  const update = async (id) => {
    try {
      await contactService.updateContact(id, { name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      load();
    } catch (error) {
      console.log(error);
    }
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
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        value={phone}
        placeholder="phone"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <input
        value={email}
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button onClick={add}>Add</Button>

      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            {c.name} - {c.email} - {c.phone}
            <Button onClick={() => update(c.id)}>Update</Button>
            <Button onClick={() => remove(c.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
