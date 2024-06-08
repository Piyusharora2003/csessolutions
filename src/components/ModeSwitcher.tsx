"use client";
import { MdDarkMode } from "react-icons/md";

function ModeSwitcher() {
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
    }
  return (
    <button onClick={toggleDarkMode}>
        <MdDarkMode />
    </button>
  )
}

export default ModeSwitcher;