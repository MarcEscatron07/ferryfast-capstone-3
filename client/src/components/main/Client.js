import React from 'react';
import './Client.css';

import Navbar from '../client/Navbar';
import MainContent from '../client/MainContent';

export default function Client() {
  return (
    <div className="Client">
      <Navbar />
      <MainContent />
    </div>
  );
}
