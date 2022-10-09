import WorkerNav from "../../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import { format } from "timeago.js"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { url } from "../../../components/carts";
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
const Profile = ({ user, datum }) => {
    const { data, users } = datum
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        let datum = []
        data.map((item) => {
            const data = users.find((user) => {

                return user._id === item.sender
            })
            console.log(data)

            const user = { username: data.username, avatar: data.avatar }
            const full = { ...user, ...item };

            datum.push(full)

            setNotification(datum)

        })
    }, [user, datum])


    const router = useRouter()
    return <div className="flex mb-[50vh]">
        <div className="hidden md:flex flex-1">
            {user && <Sidebar user={user} worker={true} />}
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav w profile={true} />


            <div className="flex flex-col px-4 gap-4">

                <h1 className="font-bold text-2xl">Notifications</h1>


                {notification.length ? notification.map((item, index) => {
                    return <div key={index} className=" border-[2px] cursor-pointer min-h-[30px] flex gap-1 p-4 " onClick={() => router.push(`/worker/inbox/${item._id}`)}>
                        <div className=" rounded-full overflow-hidden w-[50px] h-[50px] ml-4">
                            <Image src={notification.avatar || "/rightson.png"} alt="" width={70} height={70} />
                        </div>
                        <div className="flex flex-col px-3 opacity-[.7]">
                            <h1 className="font-semibold  ">{item.type} </h1>
                            <p><span className="font-bold">{item.username} </span>
                                sent you a message</p>


                        </div>
                        <div className="justify-self-end opacity-[.5]">
                            {format(item.updatedAt)}
                        </div>
                    </div>
                }) :
                    <div className=" border-[2px]  text-center cursor-pointer min-h-[30px] flex gap-1 p-4 " >
                        <h1 className="text-center text-red-900">There are No notifications For You today
                        </h1>
                    </div>
                }



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
                destination: "/worker/login",
                permanent: false,
            }
        }
    }

    const user = await axios.get(`${url}/api/worker/${id}`);


    const datum = await axios.patch(`${url}/api/notifications`, { id });


    return {
        props: {
            user: user.data,
            datum: datum.data
        }
    }
}


export default Profile;
