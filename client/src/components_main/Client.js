import React from 'react';
import './Client.css';

import Navbar from '../components/client/Navbar';
import MainContent from '../components/client/MainContent';

export default function Client() {
  return (
    <div className="Client">
      <Navbar />
      <MainContent />
    </div>
  );
}
