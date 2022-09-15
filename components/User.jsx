import React from "react";
import { motion } from "framer-motion"
import Card from "./Card";
const User = () => {
    const carts = [
        { img: "/baby.png", title: "baby sitting" },
        { img: "/cleaning.png", title: "cleaning" },
        { img: "/electrician.png", title: "electrician" },
        { img: "/gardening.png", title: "garder" },
        { img: "/plumber.png", title: "plumber" },
        { img: "/carpenter.png", title: "Capernter" },
        { img: "/more.png", title: "more" },
    ]


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
    return <div>
        <motion.div initial={{
            x: -100,

        }} animate={{
            x: 0,
            transition: {
                duration: .3
            }
        }} className="w-full m-2 p-3 text-left mb-8">
            <h1 className="text-3xl font-semibold ">Which Services do you need?</h1>
        </motion.div>
        <motion.div className="container flex flex-wrap gap-4 align-center justify-center"
            variants={variants} initial="inital" animate="animate"
        >

            {
                carts.map((item, index) => {
                    return <Card item={item} key={index} index={index} />
                })
            }
        </motion.div>

    </div>
};

export default User;
