import React, { useState, useEffect } from "react";
import WorkerNav from "../../components/WorkerNav"
import Sidebar from "../../components/Sidebar"
import { FcSearch } from "react-icons/fc"
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../../components/carts"

const Index = ({ data }) => {

    const [select, setSelect] = useState(true);
    const [user, setUser] = useState();
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [area, setArea] = useState([]);


    useEffect(() => {
        const juser = JSON.parse(localStorage.getItem("user"));
        if (!juser) {
            return router.push('/worker/login')
        }
        axios.get(`${url}/api/worker/${juser._id}`).then(res => {
            setUser(res.data)
            if (!res.data) {
                router.push('/login')
            }

        })
    }, [])

    const handleClick = () => {
        if (!user) {
            return
        }
        axios.patch(`${url}/api/order/${user.type}`).then(res => {

            if (res.data) {

                setJobs(res.data)
            }

        })

    }

    useEffect(() => {
        if (!user) {
            return
        }

        axios.put(`${url}/api/order/?area=${user.area}`).then(res => {


            if (res.data) {

                setArea(res.data)
            }

        })
    }, [user])

    useEffect(() => {
        handleClick()

    }, [select])
    if (!user) {
        <div className="flex h-screen flex-col  gap-4 w-screen py-4 px-8">
            <div role="status" className=" animate-pulse flex flex-col gap-8">

                <div className="h-12 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4 w-full"></div>
                <div className="flex gap-8">
                    <div className="h-[200px] md:h-[300px] bg-gray-200  dark:bg-gray-700 mb-4 w-full"></div>

                </div>
                <div className="h-12 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4 w-full"></div>
            </div>
            <div className="flex items-center flex-col"><span className="text-[10px] text-red-200">If it takes too long</span>  <button onClick={() => router.push('/worker/login')} className="border-2  p-2  xm:cursor-pointer">Navigate To Login</button></div>
        </div>
    }
    else {
        return <div className="flex">
            <div className="hidden md:flex flex-1">
                {user && <Sidebar worker={true} user={user} />}
            </div>
            <div className="w-full flex-2 flex-col space-y-4 ">
                <WorkerNav user={user} />
                <div className="flex px-4 mt-5" onClick={(e) => router.push('/worker/search')}>
                    <input type="text" placeholder="Search for a job" className="border p-2 w-full flex-3 outline-none" />
                    <label htmlFor="" className="border flex items-center justify-center flex-1 w-full min-w-[100px]"><FcSearch /></label>
                </div>
                <div className="flex h-[30px] cursor-pointer gap-4 mx-4 bg-[rgba(0,0,0,.1)]  justify-center items-end font-semibold text-xl">
                    <h1 onClick={() => setSelect(true)} className={select ? "opacity-[.6] text-blue border-b-[2px] border-blue " : "opacity-[.6]"}>All Jobs</h1>
                    <h1 onClick={() => {
                        setSelect(false)
                    }} className={!select ? "opacity-[.6] text-blue border-b-[2px] border-blue " : "opacity-[.6]"}>Best Match</h1>
                </div>
                {select ?
                    area.map((item, index) => {
                        return <div className="flex cursor-pointer flex-col gap-2 mx-4 p-2 border-b-[2px]" key={index} onClick={() => router.push(`/worker/job/${item._id}`)}>
                            <div className="flex gap-4">
                                <h1 className="font-semibold text-2xl">{item.title}</h1>

                            </div>
                            <p className="font-light">specs:{item.specs}</p>
                            <p className="font-light">area:{item.area},{item.ward}</p>


                            <p>{item.desc}</p>
                            <p className="font-light text-xl bg-[rgba(0,0,0,.3)] w-[fit-content] rounded-lg px-2">{item.type}</p>
                        </div>
                    })
                    :
                    jobs ? jobs.map((item, index) => {
                        console.log(item)
                        return <div className="flex cursor-pointer flex-col gap-2 mx-4 p-2 border-b-[2px]" key={index} onClick={() => router.push(`/worker/job/${item._id}`)}>
                            <div className="flex gap-4">
                                <h1 className="font-semibold text-2xl">{item.title}</h1>

                            </div>
                            <p className="font-light">specs:{item.specs}</p>
                            <p className="font-light">area:{item.area},{item.ward}</p>
                            <p>{item.desc}</p>
                            <p className="font-light text-xl bg-[rgba(0,0,0,.3)] w-[fit-content] rounded-lg px-2">{item.type}</p>
                        </div>
                    })
                        : <div className="flex flex-col gap-2 mx-4 p-2 border-b-[2px] justify-center items-center" >
                            Loading....
                        </div>

                }
            </div>

        </div>
    }

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

    const res = await axios.get(`${url}/api/order`);



    return {
        props: {
            data: res.data

        }
    }
}

export default Index;
