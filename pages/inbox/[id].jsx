import WorkerNav from "../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { format } from "timeago.js"
import { motion } from "framer-motion";
import { url } from "../../components/carts";
import { Router, useRouter } from "next/router";

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
const Profile = ({ order, client, worker }) => {
    const [review, setReview] = useState();
    const [reviews, setReviews] = useState();
    const [values, setValues] = useState();
    const [apply, setApply] = useState(false);
    const router = useRouter();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    useEffect(() => {



        axios.get(`${url}/api/comment/?worker=${worker._id}`).then(res => {


            if (res.data) {

                setReviews(res.data)
            }

        })

    }, [worker._id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const post = {
            review, avatar: client.avatar, worker: worker._id, client: client._id, name: client.name, username: client.username
        };
        axios.post(`${url}/api/comment`, post).then(res => {


            if (res.data) {
                e.target.reset();
                return toast.success('Review sent successfully', toastOptions)

            }


        }).catch((e) => {
            console.log(e)
            toast.error('There was an error', toastOptions)
        })
    }
    const handleSubmitApplication = (e) => {
        e.preventDefault()
        const datum = { ...values, to: worker._id, sender: client._id, jobId: order.jobId, type: 'Application Accepted' }
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
            {client && <Sidebar user={client} />}
        </div>
        <div className="w-full flex-2 flex-col ">
            <WorkerNav profile={true} non={true} inbox={true} />
            <div className="flex flex-col  gap-4 px-8 md:px-16 ">

                <h1 className="font-bold text-2xl text-center">{order.type}</h1>
                <div className="flex items-center gap-4 shadow-md ">
                    <div className="flex w-[70px] h-[70px] rounded-full overflow-hidden">
                        <Image src={client.avatar || "/rightson.png"} width="100%" height="100%" alt="" />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-3xl font-semibold ">{worker.username}</h1>
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
                    <h1 className="text-center font-semibold my-4">About Job Applicant</h1>
                    <div><span className="font-semibold">name : </span>@{worker.name}</div>
                    <div><span className="font-semibold">Applicant Area : </span>{worker.area}</div>
                    <div><span className="font-semibold">Applicant Work Field : </span>{worker.type}</div>
                    <div><span className="font-semibold">Applicant Email : </span>{worker.email}</div>
                    <div><span className="font-semibold">Applicant Minimal Wage : </span>{order.wage} Shillings</div>
                </div>
                <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px]">
                    <button onClick={(e) => router.push(`/worker/profile/${worker._id}`)} className="border mb-4 py-3 text-xl transition-all duration-300 hover:bg-black hover:text-white ">View Applicants Profile</button>
                    <button onClick={(e) => setApply(!apply)} className="border mb-4 py-3 text-xl transition-all duration-300 hover:bg-black hover:text-white ">Accept Application</button>
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
                <div className="flex shadow-md mt-4 flex-col p-4">
                    <h1 className="text-center font-semibold my-4">Add Review</h1>
                    <motion.form
                        onSubmit={e => handleSubmit(e)}

                        className="flex flex-col gap-4 ">
                        <textarea onChange={(e) => setReview(e.target.value)} name="review" className="border outline-none  min-h-[60px] p-1" placeholder="add review"></textarea>
                        <button className="border p-1 transition duration-[.4s] hover:bg-black hover:text-white" type="submit" >Submit</button>
                    </motion.form>

                </div>
                <div className="flex flex-col">
                    <h1 className="my-4 font-bold text-2xl">Applicant Reviews </h1>
                    <div className="flex flex-col gap-4">
                        {reviews && reviews.map((review, index) => {
                            return <div className="flex flex-col border" key={index}>
                                <div className="flex gap-4">
                                    <div className=" w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                                        <Image src={review.avatar || "https://avatars.dicebear.com/api/adventurer/964.svg"} alt="" width="100%" objectFit="cover" height="100%" />
                                    </div>
                                    <div className="flex flex-col t">
                                        <h1 className="font-semibold text-xl">{review.username}</h1>
                                        <h1 className="font-light">@{review.name}</h1>
                                    </div>


                                </div>
                                <div className="flex pl-4 gap-1 flex-col pr-4">
                                    <p>{review.review}</p>

                                </div>
                            </div>
                        })}


                    </div>
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
                destination: "/login",
                permanent: false,
            }
        }
    }

    let order = await axios.get(`${url}/api/notifications/${id}`);
    order = order.data
    const worker = await axios.get(`${url}/api/worker/${order.sender}`);
    const client = await axios.get(`${url}/api/user/${order.to}`);


    return {
        props: {
            order: order,
            worker: worker.data,
            client: client.data,

        }
    }
}


export default Profile;
