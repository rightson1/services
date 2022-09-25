import React, { useState, useEffect } from "react";
import WorkerNav from "../../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";
import { FcSearch, FcLike } from "react-icons/fc"
import { BiDislike, BiLike } from "react-icons/bi"
import axios from "axios";
import { motion } from "framer-motion";
import { data } from "autoprefixer";
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
    pauseOnHover: true,
};

const Job = ({ data }) => {
    const [orders, setOrder] = useState();
    const [reviews, setReviews] = useState();
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const [apply, setApply] = useState(false);
    const [review, setReview] = useState();
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [client, setClient] = useState();
    const [values, setValues] = useState();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmitApplication = (e) => {
        e.preventDefault()
        // const datum = { ...values, worker: user._id, client: data.userId, jobId: data._id, type: 'Job Application' }
        const datum = { ...values, sender: user._id, to: data.userId, jobId: data._id, type: 'Job Application' }
        axios.patch(`http://localhost:3000/api/order/?userId=${data.userId}`, datum).then(res => {

            if (res.data) {
                e.target.reset();
                return toast.success('Application sent successfully', toastOptions)

            }

        }).catch((e) => {
            console.log(e)
            toast.error('There was an error', toastOptions)
        })
    }


    useEffect(() => {
        const juser = JSON.parse(localStorage.getItem("user"));
        if (!juser) {
            return router.push('/worker/login')
        }
        axios.get(`http://localhost:3000/api/worker/${juser._id}`).then(res => {
            setUser(res.data)
            if (!res.data) {
                router.push('/login')
            }

        })
        axios.get(`http://localhost:3000/api/user/${data.userId}`).then(res => {
            setClient(res.data)


        })
    }, [data])
    useEffect(() => {



        axios.put(`http://localhost:3000/api/order/?userId=${data.userId}`).then(res => {


            if (res.data) {

                setOrder(res.data)
            }

        })

    }, [user]);
    useEffect(() => {

        if (!user) {
            return
        }

        axios.get(`http://localhost:3000/api/review/?userId=${user._id}`).then(res => {


            if (res.data) {

                setReviews(res.data)
            }

        })

    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const post = {
            review, userId: user._id, clientId: data.userId, name: user.name, username: user.username
        };
        axios.post(`http://localhost:3000/api/review`, post).then(res => {


            if (res.data) {
                e.target.reset();
                return toast.success('Review sent successfully', toastOptions)

            }


        }).catch((e) => {
            console.log(e)
            toast.error('There was an error', toastOptions)
        })
    }
    const handleLike = () => {
        setLike(!like)
        axios.patch(`http://localhost:3000/api/user/${data.userId}`, {
            type: 'like',
            id: user._id
        }).then(res => {

            const data = res.data;
            console.log(data)
            setDislike(data.dislikes.includes(user._id) ? true : false)
            setLike(data.likes.includes(user._id) ? true : false)
        })
    }

    const handleDislike = () => {
        setDislike(!dislike)
        axios.patch(`http://localhost:3000/api/user/${data.userId}`, {
            type: 'dislike',
            id: user._id
        }).then(res => {

            const data = res.data;
            console.log(data)
            setDislike(data.dislikes.includes(user._id) ? true : false)
            setLike(data.likes.includes(user._id) ? true : false)
        })

    };
    useEffect(() => {
        if (!client || !user) {
            return
        }
        setDislike(client.dislikes.includes(user._id) ? true : false)
        setLike(client.likes.includes(user._id) ? true : false)

    }, [client])

    return <div className="flex mb-16">
        <div className="hidden md:flex flex-1">
            <Sidebar worker={true} user={user} />
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav jobs={true} />
            <div className="flex flex-col px-4 gap-4">

                <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px]">
                    <div className="flex gap-4">
                        <h1 className="font-semibold text-2xl">{data.title}</h1>
                        <div className="flex items-center gap-4 text-2xl">
                            <motion.div
                                animate={{
                                    background: dislike ? 'black' : 'transparent',
                                    color: dislike ? 'white' : 'black',
                                    borderColor: dislike ? 'black' : 'rgba(0,0,0,.4)',

                                }}

                                className="flex text-black border-2 p-2 rounded-full cursor-pointer" onClick={() => handleDislike()}>
                                <BiDislike />
                            </motion.div>
                            <motion.div className="flex text-black border-2 p-2 rounded-full cursor-pointer"
                                animate={{
                                    background: like ? 'black' : 'transparent',
                                    color: like ? 'white' : 'black',
                                    borderColor: like ? 'black' : 'rgba(0,0,0,.4)',

                                }}

                                onClick={() => handleLike()}>
                                <BiLike />
                            </motion.div>
                        </div>
                    </div>
                    <p className="font-light">requirement:{data.specs}</p>
                    <p className="font-light">From : {data.from < 10 ? `0${data.from}:00H` : `${data.from}:00H`} </p>
                    <p className="font-light">To : {data.to < 10 ? `0${data.to}:00H` : `${data.to}:00H`} </p>
                    <p className="font-light">area:{data.area},{data.ward}</p>

                    <p>{data.desc}</p>
                    <p className="font-light text-xl bg-[rgba(0,0,0,.3)] w-[fit-content] rounded-lg px-2">{data.type}</p>

                </div>
                <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px]">
                    <button onClick={(e) => setApply(!apply)} className="border mb-4 py-3 text-xl transition-all duration-300 hover:bg-black hover:text-white ">Apply for the job</button>
                    <motion.form
                        onSubmit={(e) => handleSubmitApplication(e)}
                        animate={{
                            scaleY: apply ? 1 : 0,
                            opacity: apply ? 1 : 0,
                            height: apply ? 'auto' : "0px"
                        }}
                        className="flex flex-col gap-4">
                        <label htmlFor="">Message To Client</label>
                        <textarea onChange={(e) => handleChange(e)} name="text" className="outline-none border-2" placeholder="Enter Your Message" ></textarea>
                        <label htmlFor="">Minimal Wage</label>
                        <input name="wage" type="number" onChange={(e) => handleChange(e)} className="outline-none border-2 border-b-0 p-1" min={0} placeholder="Enter minimal your wage in kenyan shillings" />
                        <button className="border p-1 transition duration-[.4s] hover:bg-black hover:text-white" type="submit" >Submit</button>
                    </motion.form>
                </div>

                <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px]">
                    <div className="flex gap-4">
                        <h1 className="font-semibold text-2xl">About The Client</h1>
                        <div className="flex items-center gap-4 text-2xl">
                            <div className="flex text-black border-2 p-2 rounded-full">
                                <BiDislike />
                            </div>
                            <div className="flex text-black border-2 p-2 rounded-full">
                                <BiLike />
                            </div>
                        </div>
                    </div>{orders && orders.length} Jobs Posted

                    <p></p>

                </div>
                <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px]">
                    <div className="flex gap-4 items-center">
                        <h1 className="font-semibold text-2xl">Client Reviews</h1>
                        <h1 className="font-light">{orders && orders.length} Jobs Posted</h1>
                        <button className="font-light border p-2 cursor-pointer" onClick={() => setOpen(!open)}>Add Review</button>
                    </div>

                    <motion.form
                        onSubmit={e => handleSubmit(e)}
                        animate={{
                            scaleY: open ? 1 : 0,
                            opacity: open ? 1 : 0,
                            height: open ? 'auto' : "0px"
                        }}
                        className="flex flex-col gap-4 ">
                        <textarea onChange={(e) => setReview(e.target.value)} name="review" className="border outline-none  min-h-[60px] p-1" placeholder="add review"></textarea>
                        <button className="border p-1 transition duration-[.4s] hover:bg-black hover:text-white" type="submit" >Submit</button>
                    </motion.form>

                    <div className="flex flex-col">
                        <h1 className="my-4 font-bold text-2xl">Comments </h1>
                        <div className="flex flex-col gap-4">
                            {reviews && reviews.map((review, index) => {
                                return <div className="flex flex-col border" key={index}>
                                    <div className="flex gap-4">
                                        <div className=" w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                                            <Image src="https://avatars.dicebear.com/api/adventurer/964.svg" alt="" width="100%" objectFit="cover" height="100%" />
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

        </div>
        <ToastContainer />
    </div>;
};
export const getServerSideProps = async (ctx) => {
    const cookie = ctx.req?.cookies || "";


    if (cookie.token !== process.env.cookie || !cookie.token || cookie.token == undefined) {
        return {
            redirect: {
                destination: "/worker/login",
                permanent: false,
            }
        }
    }

    const res = await axios.get(`http://localhost:3000/api/order/${ctx.query.job}`);


    return {
        props: {
            data: res.data

        }
    }
}

export default Job;
