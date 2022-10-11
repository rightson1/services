import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"
import { useRouter } from "next/router";
const Item = ({ item, index }) => {
    const router = useRouter()
    return <motion.div
        initial={
            {
                opacity: 0
            }
        }
        animate={{
            opacity: 1,
            transition: {
                delay: index / 3,
            }
        }}
        className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] cursor-pointer border-2xl shadow-lg  flex items-center justify-center bg-[rgba(0,0,0,.8)] z-[4] flex-col"
        onClick={() => router.push('/login')}
    >
        <div className="flex-2 h-full w-full  flex  overflow-hidden justify-center">

            <Image src={item.img} width="90%" height="100%" alt={item.title} />
        </div>
        <div className="flex-1 h-full min-h-[30px]">{item.title}</div>

    </motion.div>;
};

export default Item;
