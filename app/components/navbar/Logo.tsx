"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Logo = () => {
  const router=useRouter()
  return (
    <div className="cursor-pointer" style={{marginLeft:'10px'}}>
      <Image className="add-product-button" onClick={()=>router.push(`/`)} src={"/logo.png"} alt="logo" width={120} height={120}></Image>
    </div>
  )
}

export default Logo
