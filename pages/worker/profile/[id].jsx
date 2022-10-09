import WorkerNav from "../../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import { url } from "../../../components/carts";
import { AiOutlineMail, AiTwotoneCalendar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { format } from "timeago.js";
const User = ({ user }) => {
    console.log(user)
    if (user) {
        return <div className="flex">
            <div className="hidden md:flex flex-1">
                {user && <Sidebar worker={true} user={user} />}
            </div>
            <div className="w-full flex-2 flex-col">
                <WorkerNav profile={true} />
                <div className="flex flex-col px-4 gap-4  mb-12">

                    <div className="w-full flex  relative h-[150px] shadow-md justify-center">
                        <Image src="/nairobi.jpg" alt="Nairobi" width="400%" height="100%" />
                        <div className="absolute bg-white -bottom-10 rounded-[50%] overflow-hidden h-[100px] w-[100px] left-4 shadow-lg border-[2px]">
                            <Image src={user.avatar} alt="Nairobi" width="100%" height="100%" objectFit="cover" />
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
                            <span>Joined {user.createdAt ? format(user.createdAt) : format(user.updatedAt)}</span>

                        </div>
                        <div className="flex min-w-[110px] items-center gap-1">
                            <span><MdLocationOn /> </span>
                            <span>{user.area}</span>

                        </div>
                        <div className="flex w-full items-center gap-1">
                            <span className="text-red-300">Field : </span>
                            <span>{user.type}</span>

                        </div>

                    </div>

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
                destination: "/worker/login",
                permanent: false,
            }
        }
    }

    const user = await axios.get(`${url}/api/worker/${id}`);

    return {
        props: {
            user: user.data
        }
    }
}

export default User;
