import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft as Left, AiOutlineArrowRight as Right } from "react-icons/ai"
import NavBar from "../../components/NavBar"
import SideNav from "../../components/SideNav";
import { motion } from "framer-motion"
import Single from "../../components/Single";
import Time from "../../components/Time";
const Cart = () => {
    const { query: { id } } = useRouter();
    const [clock, setClock] = useState([])
    useEffect(() => {
        let time = []
        for (let i = 0; i <= 1400; i += 30) {
            time.push(i);
            setClock(time)
        }
        console.log(clock)
    }, [])

    const [index, setIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setIndex(index > 0 ? index - 100 : 0);
        } else {
            setIndex(index <= (clock.length * 100) ? index + 250 : 0);
        }
    };

    return <div className="w-screen overflow-x-hidden">
        <NavBar />

        <div className="container   md:flex ">
            <div className=" hidden md:flex">
                <SideNav />
            </div>
            <div className="w-full  flex flex-col px-4 gap-8">
                <div className="w-full flex justify-center ">
                    <Image src="/plumber.png" alt="" width="100%" height="100%" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Select Area</h1>


                    <select name="Constituencies" id="cars" className=" shadow-lg p-4 outline-none">
                        <option value="select" disabled="true">Select Your Constituency</option>
                        <option value="volvo">Westlands</option>
                        <option value="saab">Dagorreti North</option>
                        <option value="mercedes">Langata</option>
                        <option value="audi">Kibra</option>
                        <option value="audi">Roysambu</option>
                        <option value="audi">Kasarani</option>
                        <option value="audi">Ruaraka</option>
                        <option value="audi">Embakasi South</option>
                        <option value="audi">Embakasi North</option>
                        <option value="audi">Embakasi Central</option>
                        <option value="audi">Embakasi East</option>
                        <option value="audi">Embakasi West</option>
                        <option value="audi">Madaraka</option>
                        <option value="audi">Kamkunji</option>
                        <option value="audi">Starehe</option>
                        <option value="audi">Mathare</option>
                    </select>

                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Choose Job Deadline</h1>
                    <input type="date" className="shadow-4xl p-3" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">From</h1>
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
                        {clock.map((time) => {
                            return <Time hour={time} key={time} />
                        })}
                    </motion.div>
                </div>



            </div>

        </div>
    </div>;
};

export default Cart;
