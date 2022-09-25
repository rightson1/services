/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import { useRouter } from "next/router";

const Home = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return <div className="">

        <Nav />
        <div className="flex p-8 flex-wrap items-center  gap-12 md:gap-4">
            <div className="flex flex-col max-w-[500px] gap-4 opacity-80  md:flex-1">
                <h1 className="text-3xl font-semibold leading-10">WELCOME TO THE  RIGHTSONS HOME SERVICES WEBSITE</h1>
                <p className="opacity-60 mt-4">We connect Nairobians with professionals who provide the best home services like baby sitting,plumbing, carpenters etc. We ensure our clients get the best services and are able to complain and report in case of any troubles coused by our employees</p>
                <div className="flex gap-4">
                    <button className="bg-[rgba(0,0,0,.3)] p-3 shadow-md transition-all duration-300 text-white hover:bg-white hover:text-black" onClick={() => router.push("/register")}>Look For Home  Service</button>
                    <button className="bg-[rgba(0,0,0,.3)] p-3 shadow-md transition-all duration-300 text-white hover:bg-white hover:text-black" onClick={() => router.push("/worker/register")}>Register As A Worker</button>
                </div>
            </div>
            <div className="flex items-center h-[200px]  w-[400px] md:flex-1 md:h-full  justify-center">
                <div className="w-full ">
                    <img src="/gardener.jpg" alt="logo" objectFit="contain" className="scale-x-[1]  rounded-r-[5px] rounded-tl-[5px] md:scale-[.9] rounded-bl-[30px] transition-all duration-300 hover:scale-[.8]" />
                </div>

            </div>
        </div>

    </div>;
};
export default Home;
