// const fs = require('fs/promises')
const path = require('path');
const fs = require('fs').promises;
const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  console.log(contactsPath);
     const contacts = await fs.readFile(contactsPath, "utf8");
     return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    
    const contact = contacts.find((item) => item.id === String(contactId));
    return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === String(contactId));
    if (index === -1) {
        return null;
    }
    const [contact] = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body
}
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === String(contactId));
    if(index === -1) {  
        return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
