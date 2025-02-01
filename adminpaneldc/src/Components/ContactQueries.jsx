// components/ContactQueries.jsx
import React from 'react';

function ContactQueries() {
  const contacts = [
    { name: 'John Doe', email: 'john@example.com', message: 'Hello!' },
    { name: 'Jane Smith', email: 'jane@example.com', message: 'Hi there!' },
    { name: 'Bob Johnson', email: 'bob@example.com', message: 'Question about your product.' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Dashboard</h2>
      <div className="bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-4 p-4 font-semibold border-b">
          <div>Name</div>
          <div>Email</div>
          <div>Message</div>
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 p-4 border-b hover:bg-gray-50">
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactQueries;