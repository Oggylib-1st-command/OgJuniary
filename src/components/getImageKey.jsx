import userIcon from "./../assets/icons/user-icon.svg";
import passwordIcon from "./../assets/icons/password-icon.svg";
import googleIcon from "./../assets/icons/icon-google.svg";
import Logo from "./../assets/icons/Logo.png";
import searchIcon from "./../assets/icons/Navbar/search-icon.svg";
import UserIcon from "./../assets/icons/Navbar/user-avatar.svg";
import HeartIcon from "./../assets/icons/Navbar/Heart-yellow.svg";
import CatalogIcon from "./../assets/icons/Navbar/Catalog-yell.svg";
import HistoryIcon from "./../assets/icons/Navbar/History-yell.svg";
import TakenBookIcon from "./../assets/icons/Navbar/TakenBook-yell.svg";

const images = {
  userIcon,
  passwordIcon,
  googleIcon,
  Logo,
  searchIcon,
  UserIcon,
  HeartIcon,
  CatalogIcon,
  HistoryIcon,
  TakenBookIcon,
};

function getImageKey(key) {
  return images[key];
}

export default getImageKey;
