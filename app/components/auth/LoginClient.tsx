"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import AuthContainer from "../containers/AuthContainer"
import Heading from "../general/Heading"
import Button from "../general/Button"
import Input from "../general/Input"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, {useEffect, useState} from "react"
import { User } from "@prisma/client"

interface LoginClientProps {
  currentUser: User | null | undefined;
}

const LoginClient:React.FC<LoginClientProps> = ({currentUser}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/");
        router.refresh();
      }

      if (callback?.error) {
        setErrorMessage("Giriş bilgileri hatalı.");
        reset(); // Formu resetler
        setTimeout(() => {
          setErrorMessage(null); // Hata mesajını belirli bir süre sonra temizler
        }, 3000); // 3 saniye sonra hata mesajını temizler
      }
    }).catch((error) => {
      setErrorMessage("Bir hata oluştu.");
      console.error("Sign in error:", error);
      reset(); // Formu resetler
      setTimeout(() => {
        setErrorMessage(null); // Hata mesajını belirli bir süre sonra temizler
      }, 3000); // 3 saniye sonra hata mesajını temizler
    });
  }

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh()}
  },[])
  
  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Heading text="Giriş Yap" />
        {errorMessage && (
          <div className=" text-red-700 p-2 rounded-md">
            {errorMessage}
          </div>
        )}
        <Input id="email" placeholder="Mail Adresiniz" type="text" required register={register} errors={errors}/>
        <Input id="password" placeholder="Parolanız" type="password" required register={register} errors={errors}/>
        <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)}/>
        <div className="text-center my-2 text-sm text-red-500">Hesabınız Yok mu? <Link className="underline" href="/register">Kayıt Ol</Link> </div>
        <div className="text-center my-2 font-bold text-lg">OR</div>
        <Button text="Google ile Giriş Yap" icon={FcGoogle} outline onClick={() => signIn('google')} />
      </div>
    </AuthContainer>
  )
}

export default LoginClient
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.")
}

