import userIcon from "./../assets/icons/user-icon.svg";
import passwordIcon from "./../assets/icons/password-icon.svg";
import googleIcon from "./../assets/icons/icon-google.svg";
import Logo from "./../assets/icons/Logo.png";
import searchIcon from "./../assets/icons/search-icon.svg";
import User from "./../assets/icons/user-avatar.png";

const images = {
  userIcon,
  passwordIcon,
  googleIcon,
  Logo,
  searchIcon,
  User,
};

function getImageKey(key) {
  return images[key];
}

export default getImageKey;
