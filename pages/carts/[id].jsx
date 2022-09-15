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
    const [index, setIndex] = useState(0);
    const [index1, setIndex1] = useState(0);

    useEffect(() => {
        let time = []
        for (let i = 0; i <= 24; i += 1) {
            time.push(i)
            setClock(time)
        }
    }, [])
    const handleClick = (direction) => {
        const width = window.innerWidth;
        if (direction === "left") {
            setIndex(index > 0 ? index - 100 : 0);
        } else {
            setIndex(index <= ((clock.length * 100) - width) ? index + 100 : 0);
        }
    };
    const handleClicked = (direction) => {
        const width = window.innerWidth;
        if (direction === "left") {
            setIndex1(index1 > 0 ? index1 - 100 : 0);
        } else {
            setIndex1(index1 <= ((clock.length * 100) - width) ? index1 + 100 : 0);
        }
    };

    return <div className="w-screen overflow-x-hidden">
        <NavBar />

        <div className="container   md:flex w-screen px-2 overflow-x-hidden">
            <div className=" hidden md:flex">
                <SideNav />
            </div>
            <div className="w-full  flex flex-col px-4 gap-8 overflow-x-hidden pb-16  mb-[60vh]   md:shadow-x1 overflow-y-">
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
                    <input type="date" className="shadow-4xl p-3 outline-none" />
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
                    <div className="w-full overflow-x-hidden p-3">
                        <motion.div animate={{
                            x: -index
                        }}

                            className="gap-4 h-[50px]  flex " >
                            {clock.map((time) => {
                                return <Time hour={time} key={time} />
                            })}
                        </motion.div>
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">To</h1>
                    <div className="contols flex justify-between">
                        <div onClick={() => handleClicked("left")} className="left w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                            <Left />
                        </div>
                        <div onClick={() => handleClicked("right")} className="left w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                            <Right />
                        </div>

                    </div>
                    <div className=" w-full overflow-x-hidden p-3">
                        <motion.div animate={{
                            x: -index1
                        }}

                            className="gap-4 h-[50px]  flex " >
                            {clock.map((time) => {
                                return <Time hour={time} key={time} />
                            })}
                        </motion.div>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Job Description</h1>
                    <textarea className="shadow-lg p-1 h-20 outline-none resize-none" placeholder="Type the job description" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Qualifications</h1>
                    <textarea className="shadow-lg p-1 h-20 outline-none resize-none" placeholder="Enter minimal qualifucations for this job" />
                </div>
                <button className="shadow-4xl mt-4 p-4">POST JOB</button>

            </div>

        </div>
    </div>;
};

export default Cart;
