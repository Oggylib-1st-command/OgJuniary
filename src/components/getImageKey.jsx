import userIcon from "./../assets/icons/Login/user-icon.svg";
import passwordIcon from "./../assets/icons/Login/password-icon.svg";
import googleIcon from "./../assets/icons/Login/icon-google.svg";
import Logo from "./../assets/icons/Logo.png";
import searchIcon from "./../assets/icons/Navbar/search-icon.svg";

import UserIcon from "./../assets/icons/Navbar/user-avatar.svg";
import HeartIcon from "./../assets/icons/Navbar/Heart-black.svg";
import CatalogIcon from "./../assets/icons/Navbar/Catalog-black.svg";
import HistoryIcon from "./../assets/icons/Navbar/History-black.svg";
import TakenBookIcon from "./../assets/icons/Navbar/TakenBook-black.svg";

import IconCatalog from "./../assets/icons/icon-catalog.svg";
import IconSort from "./../assets/icons/icon-sort.svg";

import NotFound from "./../assets/icons/404.svg";

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
  IconCatalog,
  IconSort,
  NotFound,
};

function getImageKey(key) {
  return images[key];
}

export default getImageKey;
