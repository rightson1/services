import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineArrowDown as Down } from "react-icons/ai"
import { motion } from "framer-motion";

const Sidebar = ({ worker }) => {
    const [open, setOpen] = useState(false)
    return <div className="h-screen top-0 left-0 w-[300px] flex shadow-3xl border-l flex-col gap-4 px-2">
        <h1 className="text-xl font-semibold">ACCOUNT</h1>
        <div className="flex gap-4">
            <div className=" w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                <Image src="/cleaner.png" alt="" width="100%" objectFit="cover" height="100%" />
            </div>
            <div className="flex flex-col">
                <h1 className="font-semibold text-xl">Rightson Kirigha</h1>
                <h1 className="font-light">@username</h1>
            </div>


        </div>

        <div className="w-full shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center flex justify-between" onClick={() => setOpen(!open)}>
            <h1>Profile</h1>
            <motion.div className={!open ? "down rotate-[-90deg]" : "down rotate-[0deg]"}
                animate={
                    {

                        rotate: open ? 0 : -90,
                        y: !open ? 6 : 3

                    }
                }
            >
                <Down />
            </motion.div>
        </div>
        <motion.div
            animate={{
                scaleY: !open ? 0 : 1,
                height: !open ? 0 : "auto",

            }}

            className={"flex flex-col gap-4  pl-4 "}>

            <h1>Edit Profile</h1>
            <h1>Logout</h1>
            <h1>Delete Account</h1>
        </motion.div>
        <div className="w-full -mt-3 shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
            <h1>Home</h1>
        </div>

        <div className="w-full shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
            <h1>Inbox</h1>
        </div>
        <div className="w-full shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
            <h1>Alerts</h1>
        </div>
        <div className="w-full shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
            <h1>Disputes</h1>
        </div>
        {worker ? <div className="w-full shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
            <h1>Look for Service</h1>
        </div> : <div className="w-full shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
            <h1>Switch To Worker</h1>
        </div>}

    </div>;
};

export default Sidebar;
