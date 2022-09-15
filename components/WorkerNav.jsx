import Image from "next/image";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi"
import { GiCrossedBones } from "react-icons/gi"
import { motion } from "framer-motion"
import Sidebar from "./Sidebar";
import { IoMdNotificationsOutline as Not } from "react-icons/io";
import { AiOutlineUser, AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai"
const WorkerNav = ({ profile }) => {
    const [open, setOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    if (!profile) {
        return <div className="h-[70px] w-[100%] flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
            <div className="w-[40px] h-[40px] border flex items-center justify-center rounded-full text-xl border-black" onClick={() => setOpen(!open)}>
                <AiOutlineUser />

            </div>

            <div className="notification mr-4 text-3xl">
                <Not />
            </div>
            <motion.div className="close  mr-5 text-2xl" onClick={() => setRefresh(!refresh)}>
                <FiMoreVertical />
            </motion.div>
            <motion.div className="fixed top-20  right-0 w-1/2 max-w-[200px] h-[50px] shadow-lg flex items-center justify-center" animate={
                {
                    x: refresh ? "100vw" : 0
                }
            }
            >Refresh</motion.div>
            <div className={!open ? `fixed h-screen w-screen bg-white top-[100px] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
                "fixed h-screen w-screen bg-white top-[80px] left-0 z-10 translate-x-0 transition duration-[.5s] md:hidden"
            }>
                <Sidebar />
            </div>
        </div>
    } else {
        return (
            <div className="h-[70px] w-[100%] flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
                <div className="w-[40px] h-[40px]  flex items-center justify-center rounded-full text-xl border-black" onClick={() => setOpen(!open)}>
                    <AiOutlineArrowLeft />

                </div>

                <div className="notification mr-4 text-2xl">
                    Profile
                </div>
                <motion.div className="close  mr-5 text-2xl" onClick={() => setRefresh(!refresh)}>
                    <FiMoreVertical />
                </motion.div>
                <motion.div className="fixed top-20  right-0 w-1/2 max-w-[200px] h-[50px] shadow-lg flex items-center justify-center" animate={
                    {
                        x: refresh ? "100vw" : 0
                    }
                }
                >Refresh</motion.div>
                <div className={!open ? `fixed h-screen w-screen bg-white top-[100px] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
                    "fixed h-screen w-screen bg-white top-[80px] left-0 z-10 translate-x-0 transition duration-[.5s] md:hidden"
                }>
                    <Sidebar />
                </div>
            </div>
        )
    }

};

export default WorkerNav;
