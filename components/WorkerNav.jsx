
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi"
import { GiCrossedBones } from "react-icons/gi"
import { motion } from "framer-motion"
import Router from "next/router";
import Sidebar from "./Sidebar";
import { IoMdNotificationsOutline as Not } from "react-icons/io";
import { AiOutlineUser, AiOutlineMenu, AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai"
import { useRouter } from "next/router";
const WorkerNav = ({ profile, jobs, search, user, non, notification, inbox }) => {

    const [open, setOpen] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const router = useRouter()

    if (search) {
        return (
            <div className="h-[70px] w-[100%] flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
                <div className="w-[40px] cursor-pointer h-[40px]  flex items-center justify-center rounded-full text-xl border-black" onClick={() => router.push('/worker')}>
                    <AiOutlineClose />

                </div>

                <div className="notification mr-4 text-2xl">
                    Search
                </div>
                <motion.div className="close  mr-5 text-2xl" onClick={() => setRefresh(!refresh)}>
                    {/* <AiOutlineClose /> */}
                </motion.div>
                <motion.div className="fixed top-20  right-0 w-1/2 max-w-[200px] h-[50px] shadow-lg flex items-center justify-center" animate={
                    {
                        x: !refresh ? "100vw" : 0
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
    if (profile) {
        return (
            <div className="h-[70px] w-[100%] flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
                <div className=" cursor-pointer w-[40px] h-[40px]  flex items-center justify-center rounded-full text-xl border-black" onClick={() => { non ? router.push('/') : Router.back() }}>
                    <AiOutlineArrowLeft />

                </div>

                <div className="notification mr-4 text-2xl">
                    {notification ? "Notification" :
                        inbox ? "inbox"
                            : "Profile"}
                </div>
                <motion.div className="close  mr-5 text-2xl cursor-pointer " onClick={() => setRefresh(!refresh)}>
                    <FiMoreVertical style={{ cursor: "pointer" }} />
                </motion.div>
                <motion.div

                    className="fixed   top-20  right-0 w-1/2 cursor-pointer max-w-[200px] h-[50px] shadow-lg flex items-center justify-center" animate={
                        {
                            x: !refresh ? "100vw" : 0
                        }
                    }
                    onClick={() => window.location.reload()}
                >Refresh</motion.div>

            </div>
        )
    } if (jobs) {
        return (
            <div className="h-[70px] w-[100%] flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
                <div className="w-[40px] h-[40px]  flex items-center justify-center rounded-full text-xl border-black cursor-pointer" onClick={() => router.push('/worker')}>
                    <AiOutlineArrowLeft />

                </div>

                <div className="notification mr-4 text-2xl">
                    Jobs
                </div>
                <motion.div className="close  mr-5 text-2xl cursor-pointer" onClick={() => setRefresh(!refresh)}>
                    <FiMoreVertical />
                </motion.div>
                <motion.div className="fixed bg-white cursor-pointer top-20  right-0 w-1/2 max-w-[200px] h-[50px] shadow-lg flex items-center justify-center" animate={
                    {
                        x: !refresh ? "100vw" : 0
                    }
                }
                    onClick={(e) => window.location.reload()}
                >Refresh</motion.div>
                <div className={!open ? `fixed h-screen w-screen bg-white top-[100px] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
                    "fixed h-screen w-screen bg-white top-[80px] left-0 z-10 translate-x-0 transition duration-[.5s] md:hidden"
                }>
                    <Sidebar />
                </div>
            </div>
        )
    }
    else {
        return <div className="h-[100px] min-h- w-[100%] flex justify-between mx-2 items-center mb-8 shadow-lg px-5">
            <div className="w-[40px] cursor-pointer h-[40px] border flex items-center justify-center rounded-full text-xl border-black" onClick={() => setOpen(!open)}>
                <AiOutlineUser />

            </div>

            <div className="notification mr-4 text-3xl">
                <Not />
            </div>
            <motion.div className="close  c mr-5 text-2xl cursor-pointer" onClick={() => setRefresh(!refresh)}>
                <FiMoreVertical />
            </motion.div>
            <motion.div className="fixed bg-white top-20  right-0 w-1/2 max-w-[200px] h-[50px] shadow-lg flex cursor-pointer items-center justify-center" animate={
                {
                    x: !refresh ? "100vw" : 0
                }
            }
                onClick={(e) => window.location.reload()} >Refresh</motion.div>
            <motion.div
                animate={{
                    x: !open ? -400 : 0
                }}
                className={"fixed h-screen w-screen  top-[110px] left-0 z-10 ] md:hidden"
                }>
                <Sidebar user={user} worker={true} />
            </motion.div>
        </div>
    }

};


export default WorkerNav;
