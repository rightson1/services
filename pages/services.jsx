import React from "react";
import nairobi from "../public/nairobi.jpg"
import Image from "next/image";
import { motion } from "framer-motion";
import Item from "../components/Item";
import { carts } from "../components/carts";
import { useRouter } from "next/router";
import HomeNav from "../components/HomeNav";
const Us = () => {
    const router = useRouter()
    const variants = {
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: .2,
                delayChildren: .2,
            },

        },

        initial: {
            opacity: 0

        }

    }
    return <div className="w-screen h-screen overflow-hidden bg-[rgb(40,35,51)] -md md:p-8 ">
        <div className="w-full h-full bg-[rgb(46,41,56)] rounded p-4 overflow-y-auto md:p-8">
            <HomeNav />
            <div className="flex  flex-col relative py-8">
                <div className="mt-10 text-white">
                    <div className="absolute opacity-30 w-[150px] h-[150px] grid grid-rows-5 grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((item, index) => {
                            return <div className="h-[4px] w-[4px] bg-white rounded-[50%]" key={index}></div>
                        })}
                    </div>
                    <motion.div initial={{
                        x: -100,

                    }} animate={{
                        x: 0,
                        transition: {
                            duration: .3
                        }
                    }} className="w-full m-2 p-3 text-left mb-8">
                        <h1 className="text-3xl font-semibold w-full text-center text-white">Here are the services we offer</h1>
                    </motion.div>
                    <motion.div className="container flex flex-wrap gap-4 align-center justify-center "
                        variants={variants} initial="inital" animate="animate"
                    >

                        {
                            carts.map((item, index) => {
                                return <Item item={item} key={index} index={index} />
                            })
                        }
                    </motion.div>
                </div>
                <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-30">
                    <img src="/nairobi.jpg" alt="" className="h-full w-full " /> </div>
                <div className="absolute bottom-10 left-0 w-[80%] h-[400px] z-[1] opacity-10">
                    <img src="/nairobi.jpg" alt="" className="h-full w-full " /> </div>

            </div>
        </div>
    </div>;
};

export default Us;
