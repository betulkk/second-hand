import React from 'react';
import ProfileClient from '../components/profile/ProfileClient';
import { getCurrentUser } from '../actions/getCurrentUser';

const Profile = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="mx-auto max-w-screen-lg px-2">
      <ProfileClient currentUser={currentUser} />
    </div>
  );
}

export default Profile;
