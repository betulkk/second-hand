"use client"
import type { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { CiUser } from "react-icons/ci";
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

interface UserProps {
  currentUser: User | null | undefined;
}

const User: React.FC<UserProps> = ({ currentUser }) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menuFunc = (type: any) => {
    setOpen(false);
    if (type === "logout") {
      signOut({
        redirect: false, // Kullanıcıyı manuel olarak yönlendireceğiz
      }).then(() => {
        router.push("/");
        router.refresh();
      });
    } else if (type === "register") {
      router.push("/register");
      router.refresh();
    } else if (type === "profile") {
      router.push("/profile");
      router.refresh();
    } else if (type === "settings") {
      router.push("/settings");
      router.refresh();
    } else {
      router.push("/login");
      router.refresh();
    }
  };

  console.log(currentUser, "currentUser");
  useEffect(() => {
    const handleMouseClick = () => {
      setOpen(false); // Herhangi bir yere tıklandığında setOpen(false) çalışacak
    };

    document.addEventListener('click', handleMouseClick);

    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, [open]);


  return (
    <div className="hidden md:flex relative" style={{marginRight:'100px'}}>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 cursor-pointer font-bold" // Added justify-center
      >
        <CiUser size="25"  />
        <div>{currentUser ? currentUser.name : "User"}</div>
      </div>

      {open && (
        <div
          style={{ backgroundColor: 'white', color: 'black', padding: '1px', width: '150px' }}
          className="absolute top-20 right-0 shadow-lg p-2 rounded-md"
        >
          {currentUser ? (
            <div className="space-y-1">
              <div onClick={() => menuFunc("profile")} className="text-slate-[#217178] cursor-pointer">Profil</div>
              <div onClick={() => menuFunc("settings")} className="text-slate-[#217178] cursor-pointer">Ayarlar</div>
              <div onClick={() => menuFunc("logout")} className="text-slate-[#217178] cursor-pointer">
                Çıkış Yap
              </div>
            </div>
          ) : (
            <div>
              <div onClick={() => menuFunc("login")} className="text-slate-[#217178] cursor-pointer">
                Giriş Yap
              </div>
              <div onClick={() => menuFunc("register")} className="text-slate-[#217178] cursor-pointer">
                Kayıt Ol
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
