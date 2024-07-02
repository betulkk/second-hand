import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CiUser } from 'react-icons/ci';

interface UserProps {
    currentUser: User | null | undefined;
  }
const Panel: React.FC<UserProps & { closePanel: () => void }> = ({ currentUser, closePanel }) => {
    const router = useRouter();

    const menuFunc = (type: string) => {
        closePanel();
        if (type === 'logout') {
            signOut({ redirect: false }).then(() => {
                router.push('/');
                router.refresh();
            });
        } else if (type === 'register') {
            router.push('/register');
            router.refresh();
        } else if (type === 'profile') {
            router.push('/profile');
            router.refresh();
        } else if (type === 'settings') {
            router.push('/settings');
            router.refresh();
        } else {
            router.push('/login');
            router.refresh();
        }
    };

    return (
        <div className="fixed top-0 right-0 w-2/5 h-full bg-white shadow-lg z-50 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CiUser size="25" />
                    <div>{currentUser ? currentUser.name : 'User'}</div>
                </div>
                <button onClick={closePanel} className="text-gray-700">X</button>
            </div>

            <div className="mt-4 space-y-2">
                {currentUser ? (
                    <div className="space-y-1">
                        <div onClick={() => menuFunc('profile')} className="text-slate-600 cursor-pointer">Profil</div>
                        <div onClick={() => menuFunc('settings')} className="text-slate-600 cursor-pointer">Ayarlar</div>
                        <div onClick={() => menuFunc('logout')} className="text-slate-600 cursor-pointer">Çıkış Yap</div>
                    </div>
                ) : (
                    <div>
                        <div onClick={() => menuFunc('login')} className="text-slate-600 cursor-pointer">Giriş Yap</div>
                        <div onClick={() => menuFunc('register')} className="text-slate-600 cursor-pointer">Kayıt Ol</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Panel;
