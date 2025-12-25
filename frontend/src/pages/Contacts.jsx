import { useEffect, useState } from "react";
import contactService from "../api/contactService.js";
import { Button } from "../components/ui/Button";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });

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
  const startEdit = (contactId) => {
    setEditingId(contactId);
    const contact = contacts.find((c) => c._id === contactId);
    if (contact) {
      setEditForm({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  };
  const saveEdit = async () => {
    try {
      await contactService.updateContact(editingId, editForm);
      setEditingId(null);
      setEditForm({ name: "", email: "", phone: "" });
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
          <li key={c._id}>
            {editingId === c._id ? (
              <>
                <input
                  value={editForm.name}
                  onChange={(e) => {
                    setEditForm({ ...editForm, name: e.target.value });
                  }}
                />
                <input
                  value={editForm.email}
                  onChange={(e) => {
                    setEditForm({ ...editForm, email: e.target.value });
                  }}
                />
                <input
                  value={editForm.phone}
                  onChange={(e) => {
                    setEditForm({ ...editForm, phone: e.target.value });
                  }}
                />
                <Button onClick={() => saveEdit(c._id)}>Save</Button>
                <Button onClick={() => setEditingId(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <span>{c.name}</span>
                <span>{c.email}</span>
                <span>{c.phone}</span>
                <Button onClick={() => startEdit(c._id)}>Edit</Button>
                <Button onClick={() => remove(c._id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
