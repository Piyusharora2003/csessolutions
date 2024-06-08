import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import  ModeSwitcher  from "../components/ModeSwitcher.tsx";

const NavLinks = [{
    name: "Github",
    component: <FaGithub/>,
    href: "https://www.github.com/piyusharora2003" 
  },{
    name: "Linkedin",
    component: <FaLinkedin/>,
    href: "https://www.linkedin.com/in/piyush-arora-378986259/"
  },{
    name: "Mode Switcher",
    component: <ModeSwitcher/>,
    href: ""
  }]

  export default NavLinks;