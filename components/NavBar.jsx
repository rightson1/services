import Image from "next/image";
import React, { useState } from "react";
import { IoMdNotificationsOutline as Not } from "react-icons/io";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai"
import { GiCrossedBones } from "react-icons/gi"
import { motion } from "framer-motion"
import Sidebar from "./Sidebar";
const NavBar = () => {
    const [open, setOpen] = useState(false)
    return <div className="h-[70px] w-screen flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
        <div className="w-[40px] h-[40px] border flex items-center justify-center rounded-full text-xl border-black" onClick={() => setOpen(!open)}>
            <AiOutlineUser />

        </div>
        <h1 className="font-semibold hidden md:flex">DASHBOARD</h1>
        <div className="notification mr-4 text-3xl">
            <Not />
        </div>
        <motion.div className="close md:hidden mr-5 text-2xl" onClick={() => setOpen(!open)} layout>
            {open ? <GiCrossedBones /> : <AiOutlineMenu />}
        </motion.div>
        <div className={!open ? `fixed h-screen w-screen bg-white top-[100px] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
            "fixed h-screen w-screen bg-white top-[80px] left-0 z-10 translate-x-0 transition duration-[.5s]"
        }>
            <Sidebar />
        </div>
    </div>;
};

export default NavBar;
