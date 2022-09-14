import React, { useState, useRef } from "react";
import { AiOutlineArrowLeft as Left, AiOutlineArrowRight as Right } from "react-icons/ai"
import Single from "./Single";
import { motion } from "framer-motion"


const Featured = () => {
    const [index, setIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setIndex(index > 0 ? index - 250 : 0);
        } else {
            setIndex(index <= 6 * 250 ? index + 250 : 0);
        }
    };
    return <div className="flex flex-col  mt-10 mx-5 overflow-hidden gap-4 mb-20">

        <div className="top flex justify-between">
            <h1 className="text-xl font-semibold">Top Rated</h1>

            <h1 className="text-blue">View All</h1>
        </div>
        <div className="contols flex justify-between">
            <div onClick={() => handleClick("left")} className="left w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                <Left />
            </div>
            <div onClick={() => handleClick("right")} className="left w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                <Right />
            </div>
        </div>
        <motion.div animate={{
            x: -index
        }}

            className="gap-4 h-[80px] flex " >
            <Single />
            <Single />
            <Single />
            <Single />
            <Single />
            <Single />
        </motion.div>

    </div>;
};

export default Featured;
