import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft as Left, AiOutlineArrowRight as Right } from "react-icons/ai"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion"
import Single from "../../components/Single";
import { BsFillImageFill } from "react-icons/bs"
import Time from "../../components/Time";
import axios from "axios";
import { carts } from "../../components/carts";
import { areas } from "../../components/carts";
import { toast, ToastContainer } from "react-toastify";
import { wards } from "../../components/carts";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../models/firebase";
import { url as baseUrl } from "../../components/carts";
import { useDispatch, useSelector } from "react-redux";


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
const Cart = () => {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState();
    const [clock, setClock] = useState([])
    const [index, setIndex] = useState(0);
    const [index1, setIndex1] = useState(0);
    const [select, setSelect] = useState();
    const [select1, setSelect1] = useState();
    const [cart, setCart] = useState(carts[id].title);
    const [area, setArea] = useState();
    const [deadline, setDeadline] = useState();
    const [from, setFrom] = useState();
    const [ward, setWard] = useState();
    const [to, setTo] = useState()
    const [place, setPlace] = useState([]);
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);



    const [values, setValues] = useState({
        title: null,
        desc: null,
        specs: null,
    })

    useEffect(() => {

        const data = wards.find((ward) => Object.keys(ward)[0] === area)


        setPlace(data)
        if (area) {
            setPlace(data[area])
        }


    })
    useEffect(() => {
        if (place) {
            return setWard(place[0])
        }
    }, [place])

    useEffect(() => {
        const juser = JSON.parse(localStorage.getItem("user"));

        if (currentUser.user) {

            setUser(currentUser.user)
        } else {
            axios.get(`${url}/api/user/${juser._id}`).then(res => {
                setUser(res.data)
                dispatch(createUser(res.data))

            })
        }

    }, [])
    useEffect(() => {
        let time = []
        for (let i = 0; i <= 24; i += 1) {
            time.push(i)
            setClock(time)
        }
    }, [])
    useEffect(() => {
        setFrom(clock[select]);
        setTo(clock[select1]);
    }, [select, select1])

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

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let data = { type: cart, ...values, from, to, deadline, area, userId: user._id, ward };
        if (file) {
            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `jobs/${name}`);
            return uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {
                    data.image = url;
                    axios.post(`${baseUrl}/api/order`, data).then((res) => {
                        setLoading(false)

                        toast.success('Job and Image Posted, we will notify you if someone applies')
                        e.target.reset();
                    }).catch((e) => {
                        toast.error('There was an error');
                        setLoading(false)
                    })

                })
            })

        }
        else {
            return axios.post(`${baseUrl}/api/order`, data).then((res) => {
                setLoading(false)
                toast.success('Job Posted successfully, we will notify you if someone applies')
                e.target.reset();
            }).catch((e) => {
                toast.error('There was an error');
                setLoading(false)
            })
        }


    }


    return <form className="w-screen overflow-x-hidden" onSubmit={(e) => handleSubmit(e)}>
        {user && <NavBar user={user} />}

        <div className="md:flex w-screen px-2 overflow-x-hidden">
            <div className=" hidden md:flex">
                <Sidebar user={user} />
            </div>
            <div className="w-full  flex flex-col px-4 gap-8 overflow-x-hidden pb-16  mb-[60vh]   md:shadow-x1 overflow-y-">
                <div className="w-full flex justify-center ">
                    <Image src={carts[id].img} alt="" width="100%" height="100%" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Select Cartegory</h1>


                    <select name="Constituencies" id="cars " className=" shadow-lg p-4 outline-none" onChange={(e) => setCart(e.target.value)}>

                        {carts.map((item, index) => {
                            return <option key={index} selected={index == id ? true : false}
                                name={item.title}>{item.title}</option>
                        })}

                    </select>

                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Select Area</h1>



                    <select required name="Constituencies" id="cars" className=" shadow-lg p-4 outline-none" onChange={(e) => setArea(e.target.value)}>
                        <option value="select" disabled="true">Select Your Constituency</option>
                        {areas.map((area, index) => {
                            return <option value={area} key={index}>{area}</option>
                        })}

                    </select>

                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Select Ward</h1>



                    <select required name="Constituencies" id="cars" className=" shadow-lg p-4 outline-none" onChange={(e) => setWard(e.target.value)} >
                        <option value="select" disabled="true" selected>Select Your Ward</option>
                        {place && place.map((area, index) => {
                            return <option value={area} selected={area === ward ? true : false} key={index}>{area}</option>
                        })}

                    </select>

                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                    <h1 className="text-2xl font-bold">Choose Job Deadline</h1>
                    <input type="date" className="shadow-4xl p-3 outline-none min-w-[250px] w-full" onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">From</h1>
                    <div className="contols flex justify-between">
                        <div onClick={() => handleClick("left")} className="left xm:cursor-pointer w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                            <Left />
                        </div>
                        <div onClick={() => handleClick("right")} className="left xm:cursor-pointer w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                            <Right />
                        </div>

                    </div>
                    <div className="w-full overflow-x-hidden p-3">
                        <motion.div animate={{
                            x: -index
                        }}

                            className="gap-4 h-[50px]  flex " >
                            {clock.map((time, index) => {
                                return <Time hour={time} key={time} select={select} index={index} setSelect={setSelect} />
                            })}
                        </motion.div>
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">To</h1>
                    <div className="contols flex justify-between">
                        <div onClick={() => handleClicked("left")} className="left xm:cursor-pointer w-[30px] h-[30px] shadow-md rounded-full flex justify-center items-center">
                            <Left />
                        </div>
                        <div onClick={() => handleClicked("right")} className="left w-[30px] h-[30px] shadow-md rounded-full flex xm:cursor-pointer justify-center items-center">
                            <Right />
                        </div>

                    </div>
                    <div className=" w-full overflow-x-hidden p-3">
                        <motion.div animate={{
                            x: -index1
                        }}

                            className="gap-4 h-[50px]  flex " >
                            {clock.map((time, index) => {
                                return <Time hour={time} key={time} select={select1} index={index} setSelect={setSelect1} />
                            })}
                        </motion.div>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Job Title</h1>
                    <textarea name="title" onChange={(e) => handleChange(e)} className="shadow-lg p-1 h-20 outline-none resize-none" placeholder="Type the job title" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Job Description</h1>
                    <textarea name="desc" onChange={(e) => handleChange(e)} className="shadow-lg p-1 h-20 outline-none resize-none" placeholder="Type the job description" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Qualifications</h1>
                    <textarea name="specs" onChange={(e) => handleChange(e)} className="shadow-lg p-1 h-20 outline-none resize-none" placeholder="Enter minimal qualifucations for this job" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                        <label htmlFor="file" className="opacity-[.6]">Upload Profile Pic(optional)</label>
                        <label htmlFor="file" className="text-3xl"><BsFillImageFill /></label>
                        <input type="file" className="hidden" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />

                    </div>
                </div>
                <button className="shadow-4xl mt-4 p-4" type="submit">{loading ? 'Loading...' : 'POST JOB'}</button>

            </div>

        </div>
        <ToastContainer />
    </form>;
};
export const getServerSideProps = async (ctx) => {
    const cookie = ctx.req?.cookies || "";

    if (!cookie.token === process.env.password || !cookie.token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    return {
        props: {

        }
    }
}


export default Cart;
