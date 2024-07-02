"use client"
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Panel from './Panel'; 
import { User } from '@prisma/client';

interface UserProps {
  currentUser: User | null | undefined;
}
const HamburgerMenu: React.FC<UserProps> = ({ currentUser }) => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => {
    setOpen(!open);
  };

  return (
    <div className="relative flex md:hidden ">
      <RxHamburgerMenu className="cursor-pointer" size="25" color="#f6ae82" onClick={togglePanel} />
      {open && <Panel currentUser={currentUser} closePanel={() => setOpen(false)} />}
    </div>
  );
};

export default HamburgerMenu;
