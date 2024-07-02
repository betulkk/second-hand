"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';



interface SettingsClientProps {
  currentUser: User | null | undefined;
}
const SettingsClient:React.FC<SettingsClientProps> = ({currentUser}) => {
  const router=useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Şifreler uyuşmuyor.');
      return;
    }

    try {
      const response = await axios.post('/api/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccess('Şifreniz başarıyla güncellendi.');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Şifreniz güncellenemedi.');
      }
    } catch (error) {
      setError('Bir hata oluştu.');
    }
  };

  const handlePhoneChange = async () => {
    try {
      const response = await axios.post('/api/change-phone', {
        phone,
      });

      if (response.data.success) {
        setSuccess('Telefon numaranız başarıyla güncellenmiştir.');
        setError('');
        setPhone('');
      } else {
        setError('Telefon numaranız güncellenemedi.');
      }
    } catch (error) {
      setError('Bir hata oluştu.');
    }
  };

  
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      router.refresh()
    }},[])

  return (
    <div className="container mx-auto my-10 p-4 max-w-md">
      <h2 className="text-2xl mb-4">Ayarlar</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      
      <div className="mb-4">
        <label className="block mb-1">Mevcut Şifre</label>
        <input 
          type="password" 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Yeni şifre</label>
        <input 
          type="password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Yeni şifre (tekrar)</label>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button 
        onClick={handlePasswordChange}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Şifreyi Güncelle
      </button>

      <hr className="my-6" />

      <div className="mb-4">
        <label className="block mb-1">Telefon</label>
        <input 
          type="tel" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          title="Lütfen telefon numaranızı XXX-XXX-XXXX formatında girin"
        />
      </div>
      <button 
        onClick={handlePhoneChange}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Telefon Numarasını Güncelle
      </button>
    </div>
  );
};

export default SettingsClient;
