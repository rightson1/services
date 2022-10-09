import WorkerNav from "../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import { url } from "../../components/carts";
import { AiOutlineMail, AiTwotoneCalendar } from "react-icons/ai"
import { GiOfficeChair } from "react-icons/gi"
import { format } from "timeago.js";
const User = ({ user, jobs }) => {

    if (user) {
        return <div className="flex">
            <div className="hidden md:flex flex-1">
                {user && <Sidebar user={user} />}
            </div>
            <div className="w-full flex-2 flex-col">
                <WorkerNav profile={true} />
                <div className="flex flex-col px-4 gap-4  mb-12">

                    <div className="w-full flex  relative h-[150px] shadow-md justify-center">
                        <Image src="/nairobi.jpg" alt="Nairobi" width="400%" height="100%" />
                        <div className="absolute bg-white -bottom-10 rounded-[50%] overflow-hidden h-[100px] w-[100px] left-4 shadow-lg border-[2px]">
                            <Image src={user.avatar} alt="Nairobi" width="100%" height="100%" />
                        </div>
                    </div>
                    <div className="flex justify-start w-full mt-12 flex-col">
                        <h1 className="text-2xl font-semibold">{user.username}</h1>
                        <h1 className="font-thin text-xl">@{user.name}</h1>
                    </div>
                    <div className="flex flex-wrap w-full gap-8">
                        <div className="flex min-w-[110px] items-center gap-1">
                            <span><AiOutlineMail /> </span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex min-w-[110px] items-center gap-1">
                            <span><AiTwotoneCalendar /> </span>
                            <span>Joined {format(user.createdAt)}</span>

                        </div>
                        <div className="flex min-w-[110px] items-center gap-1">
                            <span><AiTwotoneCalendar /> </span>
                            <span>{jobs.length} Jobs Posted</span>

                        </div>
                    </div>
                    <h1 className="text-center text-2xl underline italic">Jobs History</h1>
                    {jobs.map((job, index) => {
                        return <div key={index} className=" w-full border-y-[2px] flex gap-8 items-start py-4">
                            <div className="w-[100px] h-full">
                                <Image src={user.avatar} alt="User Image" width="100%" height="100%" />
                            </div>

                            <div className=" h-full   w-full ">
                                <div className="flex   gap-4 items-center">
                                    <h1 className="text-xl font-semibold">{user.username}</h1>
                                    <h1 className="font-thin text-[12px]">@{user.name}</h1>
                                </div>
                                <div className="flex gap-1">
                                    <span className="text-red-400">Job Title : </span>
                                    <span> {job.title}</span>

                                </div>
                                <div className="flex gap-1">
                                    <span className="text-red-400">Posted On : </span>
                                    <span className="font-thin italic">{format(job.createdAt)}</span>

                                </div>




                            </div>
                        </div>
                    })}

                </div>

            </div>

        </div>;
    }
    else {
        return <div className="flex">
            <div className="hidden md:flex flex-1">
                {user && <Sidebar worker={true} user={user} />}
            </div>
            <div className="w-full flex-2 flex-col">
                <WorkerNav profile={true} />
                <div className="flex flex-col px-4 gap-4 items-center">
                    <div className="text-red-900">User does not Exists</div>


                </div>

            </div>

        </div>;
    }
};
export const getServerSideProps = async (ctx) => {
    const { query: { id } } = ctx;
    const cookie = ctx.req?.cookies || "";


    if (cookie.token !== process.env.cookie || !cookie.token || cookie.token == undefined) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    const user = await axios.get(`${url}/api/user/${id}`);
    const jobs = await axios.delete(`${url}/api/order/${id}`);



    return {
        props: {
            user: user.data,
            jobs: jobs.data
        }
    }
}

export default User;
