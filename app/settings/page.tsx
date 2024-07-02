import React from 'react'
import SettingsClient from '../components/settings/SettingsClient'
import { getCurrentUser } from '../actions/getCurrentUser'

const Settings = async() => {
  const currentUser=await getCurrentUser();
  return (
    <div>
      <SettingsClient currentUser={currentUser} />
    </div>
  )
}

export default Settings
