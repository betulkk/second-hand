import Logo from "./Logo"
import Search from "./Search"
import HamburgerMenu from "./HamburgerMenu"
import AddProduct from "./AddProduct"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import User from "./User"

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const formattedCurrentUser = currentUser
    ? {
      ...currentUser,
      emailVerified: currentUser.emailVerified ? new Date(currentUser.emailVerified) : null,
      createdAt: new Date(currentUser.createdAt),
      updatedAt: new Date(currentUser.updatedAt),
    }
    : null;

  return (
    <div
      style={{ backgroundColor: "white", color: "#f0b3b8", padding: "1px" }}
      className="flex items-center justify-between gap-10 md:gap-15 px-3 md:px-10 h-15 bold"
    >
      <Logo />
      <div className="flex mr-6 gap-5">
      <User currentUser={formattedCurrentUser} />
      {formattedCurrentUser && <AddProduct />}
      <HamburgerMenu currentUser={formattedCurrentUser} />
      </div>
     
    </div>
  );
}

export default Navbar
