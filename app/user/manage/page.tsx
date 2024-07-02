import { getCurrentUser } from "@/app/actions/getCurrentUser"
import WarningText from "@/app/components/WarningText"
import AuthContainer from "@/app/components/containers/AuthContainer"
import getProducts from "@/app/actions/getProducts"
import EditProduct from "@/app/components/EditProduct"

const Manage = async() => {
    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
        <WarningText text="Buraya Girişin Yasaklı !!!"/>
        )
    }
  return (
    <div className="w-full m-2">
         <EditProduct/>
     </div>
  )
}

export default Manage