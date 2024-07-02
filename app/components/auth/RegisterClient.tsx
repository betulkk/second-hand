"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import AuthContainer from "../containers/AuthContainer"
import Heading from "../general/Heading"
import Button from "../general/Button"
import Input from "../general/Input"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
import { User } from ".prisma/client"
import { useEffect } from "react"


interface RegisterClientProps {
  currentUser: User|null|undefined;
}

const RegisterClient:React.FC<RegisterClientProps> = ({currentUser}) => {

  const router=useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>()
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/register', data).then(()=>{
          toast.success("Kayıt işlemi tamamlandı. Giriş yapabilirsiniz.")
          signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
          }).then((callback)=>{
            if(callback?.ok){
              router.push("/")
              router.refresh()
              toast.success("Giriş yapıldı.")
            }

            if(callback?.error){
              toast.error(callback.error)
            }
            
          })
        })
      }

      useEffect(() => {
        if(currentUser!=null){
          router.push("/")
          router.refresh()
        }
      },[])
  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md"style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Heading text="Kayıt Ol"/>
        <Input id="name" placeholder="Adınız" type="text" required register={register} errors={errors}/>
        <Input id="email" placeholder="Mail Adresiniz" type="text" required register={register} errors={errors}/>
        <Input id="password" placeholder="Parolanız" type="password" required register={register} errors={errors}/>
        <Input id="phone" placeholder="Telefon numaranız" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Lütfen telefon numaranızı XXX-XXX-XXXX formatında girin" required register={register} errors={errors}/>
        <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)}/>
        <div className="text-center my-2 text-sm text-red-500">Hesabınız Zaten Var mı? <Link className="underline" href="/login"> Giriş Yap</Link> </div>
        <div className="text-center my-2 font-bold text-lg">OR</div>
        <Button text="Google ile Üye Ol" icon={FcGoogle} outline onClick={() => signIn('google')}/>


      </div>
    </AuthContainer>
  )
}

export default RegisterClient
