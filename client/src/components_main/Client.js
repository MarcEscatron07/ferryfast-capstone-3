import React from 'react';
import './Client.css';

import GuestNavbar from '../components/client/GuestNavbar';

export default function Client() {
  return (
    <div className="Client">
      <GuestNavbar />
      <h1>Client Page</h1>
    </div>
  );
}
