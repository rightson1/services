import WorkerNav from "../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
const User = ({ user }) => {

    if (user) {
        return <div className="flex">
            <div className="hidden md:flex flex-1">
                {user && <Sidebar user={user} />}
            </div>
            <div className="w-full flex-2 flex-col">
                <WorkerNav profile={true} />
                <div className="flex flex-col px-4 gap-4 items-center">

                    <div className="contaniner w-full height-[300px] flex items-center justify-center">
                        <Image src={user.avatar} alt="" width="100%" height="100%" />
                    </div>
                    <div className="flex items-center shadow-lg p-4">
                        <p className="font-bold text-3xl">Username:</p><h1 className="font-semibold text-3xl">{user.username}</h1>

                    </div>
                    <div className="flex items-center shadow-lg p-4">
                        <p className="font-bold text-3xl">name:</p><h1 className="font-semibold text-3xl">{user.name}</h1>

                    </div>
                    <div className="flex items-center shadow-lg p-4">
                        <p className="font-bold text-3xl">email:</p><h1 className="font-semibold text-3xl">{user.email}</h1>

                    </div>
                    <div className="flex items-center shadow-lg p-4">
                        <p className="font-bold text-3xl">area:</p><h1 className="font-semibold text-3xl">{user.area}</h1>

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
                destination: "/login",
                permanent: false,
            }
        }
    }

    const user = await axios.get(`http://localhost:3000/api/user/${id}`);

    return {
        props: {
            user: user.data
        }
    }
}

export default User;
