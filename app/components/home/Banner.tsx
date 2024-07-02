import Image from 'next/image'

const Banner = () => {
  return (
    <div className="h-[160px]">
        <div className="h-[160px] relative">
            <Image src={"/ban.png"} fill alt="" className='object-cover'/>
        </div>
      
    </div>
  )
}

export default Banner
