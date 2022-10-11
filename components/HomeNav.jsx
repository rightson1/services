import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import { motion } from "framer-motion"
import { GiCrossedBones } from "react-icons/gi"
const HomeNav = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    return <>
        <div className="flex justify-between px-0 md:px-4 items-center text-white opacity-90 h-[80px]">
            <h1 className="text-2xl font-bold xm:cursor-pointer" onClick={() => router.push('/')}>Home.</h1>
            <div className="hidden md:flex gap-4 text-[16px] opacity-75 flex-row-reverse ">
                <motion.div whileTap={{ background: 'black', color: 'white' }} className="cursor-pointer px-3 py-2 hover:border-b-[2px]" onClick={() => router.push('/about')}>About Dev.</motion.div>
                <motion.div whileTap={{ background: 'black', color: 'white' }} className="cursor-pointer px-3 py-2 hover:border-b-[2px]" onClick={() => router.push('/services')}>Services</motion.div>
            </div>
            <button onClick={() => router.push('/register')} className="hidden md:flex">Get Started</button>
            <motion.div className="close xm:cursor-pointer md:hidden mr-5 text-2xl" onClick={() => setOpen(!open)} layout>
                {open ? <GiCrossedBones /> : <AiOutlineMenu />}
            </motion.div>

        </div>
        <div className={!open ? `fixed h-screen w-screen top-[50%] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
            "fixed h-screen w-screen  top-[50%] left-0 z-10 translate-x-0 transition duration-[.5s] "
        } onClick={() => setOpen(false)}>
            <div className="w-[250px]  h-[250px] bg-[fuchsia] opacity-90  flex flex-col  justify-center  gap-1" onClick={(e) => e.stopPropagation()}>

                <h1 className="cursor-pointer p-4  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => router.push('/about')}>About Dev.</h1>
                <h1 className="cursor-pointer p-4  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => router.push('/services')}>Services</h1>
                <h1 className="cursor-pointer p-4  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => router.push('/login')}>Look For A Service</h1>
                <h1 className="cursor-pointer p-4  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => router.push('/worker/login')}>Register As Worker</h1>


            </div>
        </div>
    </>

};

export default HomeNav;
