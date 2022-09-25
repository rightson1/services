import WorkerNav from "../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
};
const Profile = ({ user }) => {

    return <div className="flex mb-[50vh]">
        <div className="hidden md:flex flex-1">
            {user && <Sidebar user={user} />}
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav profile={true} non={true} />
            <div className="flex flex-col px-4 gap-4">




            </div>


        </div>
        <ToastContainer />
    </div>;
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

    const user = await axios.get(`http://localhost:3000/api/worker/${id}`);

    return {
        props: {
            user: user.data
        }
    }
}


export default Profile;
