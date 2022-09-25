import React from "react";
import { motion } from "framer-motion"
import Item from "../../components/Item";
import { carts } from "../../components/carts";
import Nav from "../../components/Nav"

const Features = () => {

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
        <Nav />
        <motion.div initial={{
            x: -100,

        }} animate={{
            x: 0,
            transition: {
                duration: .3
            }
        }} className="w-full m-2 p-3 text-left mb-8">
            <h1 className="text-3xl font-semibold w-full text-center">Here are the services we offer</h1>
        </motion.div>
        <motion.div className="container flex flex-wrap gap-4 align-center justify-center"
            variants={variants} initial="inital" animate="animate"
        >

            {
                carts.map((item, index) => {
                    return <Item item={item} key={index} index={index} />
                })
            }
        </motion.div>

    </div>
};

export default Features;
