import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai"
import { GiCrossedBones } from "react-icons/gi"
import { motion } from "framer-motion";
import { useRouter } from "next/router";


const Nav = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return <nav className="flex p-4 pr-8 h-[100px] shadow-lg items-center justify-between">
        <motion.div className="flex w-[60px] h-[60px]" variants={logoVariants} initial="closed" animate="open">
            <Image src="/rightson.png" width="100%" height="100%" alt="logo" />
        </motion.div>
        <motion.ul className="gap-4 hidden md:flex" variants={variants} initial="closed" animate="open" >
            <motion.li variants={linkVariants} className="p-3 shadow-md cursor-pointer hover:bg-black hover:text-white" onClick={() => router.push('/home')}>Home</motion.li>
            <motion.li variants={linkVariants} className="p-3 shadow-md cursor-pointer hover:bg-black hover:text-white" onClick={() => router.push('/home/about')}>About</motion.li>
            <motion.li variants={linkVariants} className="p-3 shadow-md cursor-pointer hover:bg-black hover:text-white" onClick={() => router.push('/home/features')}>Features</motion.li>
            <motion.li variants={linkVariants} className="p-3 shadow-md cursor-pointer hover:bg-black hover:text-white" onClick={() => router.push('/')}>Contact</motion.li>

        </motion.ul>
        <motion.button variants={buttonVariants} initial="closed" animate="open" className="shadow-md hidden p-3  hover:bg-black hover:text-white md:flex" onClick={() => router.push('/login')}>Login</motion.button>
        <motion.div className="close cursor-pointer md:hidden mr-5 text-2xl" onClick={() => setOpen(!open)} layout>
            {open ? <GiCrossedBones /> : <AiOutlineMenu />}
        </motion.div>


        <div onClick={(e) => setOpen(false)} className={!open ? `fixed h-screen w-screen top-0 left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
            "bg-[rgba(0,0,0,.6)] fixed h-screen w-screen  top-0 left-0 z-10 translate-x-0 transition duration-[.5s]"
        }>
            <div className="flex w-[70vw] py-[30px] h-screen bg-white flex-col">
                <motion.div className="flex  justify-center w-full" variants={logoVariants} initial="closed" animate="open">
                    <Image src="/rightson.png" width="100%" height="100%" alt="logo" />
                </motion.div>
                <motion.ul className="gap-8 mt-12 flex flex-col items-center w-full " variants={variants} initial="closed" animate="open" >
                    <motion.li variants={linkVariants} className="p-3 shadow-md  text-center cursor-pointer hover:bg-black hover:text-white w-full" onClick={() => router.push('/home')}>Home</motion.li>
                    <motion.li variants={linkVariants} className="p-3 shadow-md  text-center cursor-pointer hover:bg-black hover:text-white w-full" onClick={() => router.push('/home/about')}>About</motion.li>
                    <motion.li variants={linkVariants} className="p-3 shadow-md  text-center cursor-pointer hover:bg-black hover:text-white w-full" onClick={() => router.push('/home/features')}>Features</motion.li>
                    <motion.li variants={linkVariants} className="p-3 shadow-md  text-center cursor-pointer hover:bg-black hover:text-white w-full" onClick={() => router.push('/home')}>Contact</motion.li>
                    <motion.li variants={linkVariants} className="p-3 shadow-md  text-center cursor-pointer hover:bg-black hover:text-white w-full" onClick={() => router.push('/login')}>Login</motion.li>

                </motion.ul>
            </div>
        </div>
    </nav>
};

const variants = {
    open: {
        opacity: 0.8,
        transition: {
            staggerChildren: 0.2,
        }
    },
    closed: { opacity: 0 },
}
const linkVariants = {
    open: {
        y: 0,
        scaleX: 1,
    },
    closed: { y: -120, scaleX: 0 },
};
const buttonVariants = {
    open: {
        x: 0,

        scaleY: 1,
        transition: {
            delay: .5
        }
    },
    closed: { x: 120, scaleY: 0 },
};
const logoVariants = {
    open: {
        x: 0,

        scaleY: 1,
        transition: {
            delay: .5
        }
    },
    closed: { x: -120, scaleY: 0 },
};
export default Nav;
