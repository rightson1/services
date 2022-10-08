import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineArrowDown as Down } from "react-icons/ai"
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ worker, user }) => {
    const router = useRouter();


    const [open, setOpen] = useState(false)
    if (user) {
        if (worker) {
            return <div className="h-screen top-0 left-0 w-[300px] flex shadow-3xl border-l flex-col gap-4 px-2 bg-white">
                <h1 className="text-xl font-semibold">ACCOUNT</h1>
                <div className="flex gap-4">
                    <div className=" w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                        <Image src={user.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                    </div>
                    <div className="flex flex-col t">
                        <h1 className="font-semibold text-xl">{user.username}</h1>
                        <h1 className="font-light">@{user.name}</h1>
                    </div>


                </div>

                <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center flex justify-between" onClick={() => setOpen(!open)}>
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

                    className={"flex flex-col gap-4  pl-4  cursor-pointer"}>

                    <Link href={`/worker/profile/${user._id}`} >
                        <h1 className="cursor-pointer">View Account Details</h1></Link>
                    <Link href={`/worker/edit/${user._id}`} ><h1 className="cursor-pointer" >Edit Profile</h1></Link>
                    <Link href={`/worker/login`} ><h1 className="cursor-pointer" >Logout</h1></Link>

                    <h1 className="cursor-pointer">Delete Account</h1>
                </motion.div>
                <Link href="/worker">
                    <div className="w-full cursor-pointer -mt-3 shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Home</h1>
                    </div>

                </Link>
                <Link href={`/worker/notifications/${user._id}`}>
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Notifications</h1>
                    </div>
                </Link>
                <Link href="/alert">
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Inbox</h1>
                    </div>
                </Link>
                <Link href="/">
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Disputes</h1>
                    </div>
                </Link>
                <Link href="/login">
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1 >Look for service</h1>
                    </div>
                </Link>

            </div>;
        } else {
            return <div className="h-screen top-0 left-0 w-[300px] flex shadow-3xl border-l flex-col gap-4 px-2 bg-white">
                <h1 className="text-xl font-semibold">ACCOUNT</h1>
                <div className="flex gap-4">
                    <div className=" w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                        <Image src={user.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                    </div>
                    <div className="flex flex-col t">
                        <h1 className="font-semibold text-xl">{user.username}</h1>
                        <h1 className="font-light">@{user.name}</h1>
                    </div>


                </div>

                <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center flex justify-between" onClick={() => setOpen(!open)}>
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

                    className={"flex flex-col gap-4  pl-4  cursor-pointer"}>

                    <Link href={`/user/${user._id}`} >
                        <h1 className="cursor-pointer">View Account Details</h1></Link>
                    <Link href={`/profile/${user._id}`} ><h1 className="cursor-pointer" >Edit Profile</h1></Link>
                    <Link href={`/login`} ><h1 className="cursor-pointer" >Logout</h1></Link>

                    <h1 className="cursor-pointer">Delete Account</h1>
                </motion.div>
                <Link href="/">
                    <div className="w-full cursor-pointer -mt-3 shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Home</h1>
                    </div>

                </Link>
                <Link href={`/notifications/${user._id}`}>
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Notifications</h1>
                    </div>
                </Link>

                <Link href="/">
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1>Disputes</h1>
                    </div>
                </Link>
                <Link href="/worker/login">
                    <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                        <h1 >Switch To Worker</h1>
                    </div>
                </Link>

            </div>;
        }
    } else {

        return <div className="h-screen top-0 left-0 w-[300px] flex items-center justify-center shadow-3xl border-l flex-col gap-4 px-2 bg-white">
            <h1 className="text-xl font-semibold">ACCOUNT</h1>
            <h1 className="text-[red]">An Error occured</h1>

        </div>;
    }
};

export default Sidebar;
