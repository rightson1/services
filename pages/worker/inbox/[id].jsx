import WorkerNav from "../../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { format } from "timeago.js"
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";
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
const Profile = (
    { order, client, worker }
) => {

    const [values, setValues] = useState();
    const [apply, setApply] = useState(false);
    const router = useRouter();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmitApplication = (e) => {
        e.preventDefault()
        const datum = { ...values, to: client._id, sender: worker._id, jobId: order.jobId, type: 'Job Accepted' }
        axios.patch(`${url}/api/order/?userId=${client.userId}`, datum).then(res => {

            if (res.data) {
                e.target.reset();
                return toast.success('Form Submitted Succesfully', toastOptions)

            }

        }).catch((e) => {
            console.log(e)
            toast.error('There was an error', toastOptions)
        })
    }


    return <div className="flex mb-[50vh]">
        <div className="hidden md:flex flex-1">
            {worker && <Sidebar user={worker} worker={true} />}
        </div>
        <div className="w-full flex-2 flex-col ">
            <WorkerNav profile={true} non={true} inbox={true} />
            <div className="flex flex-col  gap-4 px-8 md:px-16 ">

                <h1 className="font-bold text-2xl text-center">{order.type}</h1>
                <div className="flex items-center gap-4 shadow-md ">
                    <div className="flex w-[70px] h-[70px] rounded-full overflow-hidden">
                        <Image src={worker.avatar || "/rightson.png"} width="100%" height="100%" alt="" />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-3xl font-semibold ">{client.username}</h1>
                        <p className="font-light">to me</p>
                    </div>
                    <div className="flex -mt-5">
                        <div className="justify-self-end opacity-[.5]">
                            {format(order.updatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex shadow-md mt-4 flex-col p-4">
                    <h1 className="text-center font-semibold my-4">Message</h1>
                    <div><span className="font-semibold">message : </span>@{order.text}</div>

                </div>
                <div className="flex shadow-md mt-4 flex-col p-4">
                    <h1 className="text-center font-semibold my-4">About Client</h1>
                    <div><span className="font-semibold">name : </span>@{client.name}</div>
                    <div><span className="font-semibold">Client Area : </span>{client.area}</div>
                    <div><span className="font-semibold">Client Phone Number : </span>{order.phone}</div>
                    <div><span className="font-semibold">Client email: </span>{client.email}</div>
                </div>
                <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px]">
                    <button onClick={(e) => router.push(`/profile/${client._id}`)} className="border mb-4 py-3 text-xl transition-all duration-300 hover:bg-black hover:text-white ">View Clients</button>
                    <button onClick={(e) => setApply(!apply)} className="border mb-4 py-3 text-xl transition-all duration-300 hover:bg-black hover:text-white ">Accept Job</button>
                    <motion.form
                        onSubmit={(e) => handleSubmitApplication(e)}
                        animate={{
                            scaleY: apply ? 1 : 0,
                            opacity: apply ? 1 : 0,
                            height: apply ? 'auto' : "0px"
                        }}
                        className="flex flex-col gap-4">
                        <label htmlFor="">Leave a message for the Applicant</label>
                        <textarea onChange={(e) => handleChange(e)} name="text" className="outline-none border-2" placeholder="Enter Your Message" ></textarea>
                        <label htmlFor="">Your Phone Number</label>
                        <input name="phone" type="number" onChange={(e) => handleChange(e)} className="outline-none border-2 border-b-0 p-1" min={0} placeholder="Enter Phone Number" />
                        <button className="border p-1 transition duration-[.4s] hover:bg-black hover:text-white" type="submit" >Submit</button>
                    </motion.form>
                </div>








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

    let order = await axios.get(`${url}/api/notifications/${id}`);

    order = order.data
    const worker = await axios.get(`${url}/api/worker/${order.to}`);
    const client = await axios.get(`${url}/api/user/${order.sender}`);

    return {
        props: {
            order: order,
            worker: worker.data,
            client: client.data,

        }
    }
}


export default Profile;
