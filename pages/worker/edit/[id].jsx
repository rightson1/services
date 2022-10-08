
import WorkerNav from "../../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { carts, url as baseUrl } from "../../../components/carts";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Router, { useRouter } from "next/router";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../models/firebase";

const Profile = ({ user }) => {
    const [values, setValues] = useState()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

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
    const handleSubmit = async () => {
        setLoading(true)

        if (!file) {

            return await axios.put(`${baseUrl}/api/worker/${user._id}`, values).then((res) => {
                setLoading(false)
                if (res.data.username) {
                    toast.success("Updated Succesfull", toastOptions)
                    // setTimeout(() => {
                    //     router.push(`/worker/profile/${user._id}`)
                    // }, 2000)

                } else {

                    setLoading(false)
                    toast.error("There was an error", toastOptions)
                }
            }).catch(e => {
                setLoading(false)
                toast.error("There was an error", toastOptions)
            })

        }
        let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
        const fileRef = ref(storage, `/workers/${name}`);
        uploadBytes(fileRef, file).then((res) => {
            setLoading(false)
            deleteObject(ref(storage, `workers/${user.pic}`)).then((res) => {
                console.log('item deleted')
            }).then((res) => {
                console.log('deleted')
            }).catch((err) => {
                setLoading(false)
                console.log(err);
            });
            getDownloadURL(res.ref).then((url) => {
                setLoading(false)
                const data = { ...values, avatar: url, pic: name }
                axios.put(`${baseUrl}/api/worker/${user._id}`, data).then((res) => {
                    setLoading(false)
                    if (res.data.username) {
                        toast.success("Updated Succesfull", toastOptions)
                        setTimeout(() => {
                            router.push(`/worker/profile/${user._id}`)
                        }, 2000)

                    } else {

                        toast.error("There was an error", toastOptions)
                    }
                }).catch(e => {
                    setLoading(false)
                    toast.error("There was an error", toastOptions)
                })

            })

        }).catch((err) => {
            setLoading(false)
            console.log(err);
        });



    }

    return <div className="flex">
        <div className="hidden md:flex flex-1">
            {user && <Sidebar worker={true} user={user} />}
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav profile={true} />
            <div className="flex flex-col px-4 gap-4">
                <div className="flex  shadow-lg  gap-4 px-4">
                    <div className="relative ">
                        <Image src={file ? URL.createObjectURL(file) : user && user.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                        <label htmlFor="file" className="absolute p-2 shadow-lg bg-[rgba(0,0,0,.3)] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl"><BiEditAlt /></label>

                    </div>    <input type="file" id="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">Rightson Kirigha</h1>
                        <h1 className="font-light">Nairobi,Starehe</h1>
                    </div>


                </div>
                <div className="shadow-md  outline-none flex flex-col items-center gap-1" >
                    <label htmlFor="" className="opacity-[.6]">Change field Of Work Field of work</label>

                    <select id="cars " className="w-full p-4 outline-none" onChange={(e) => setValues({ ...values, experience: e.target.value })
                    } name="area">

                        {carts.map((item, index) => {
                            return <option key={index} selected={index == user._id ? true : false}
                                value={item.title} name={item.title}>{item.title}</option>
                        })}

                    </select>
                </div>
                <div className="shadow-md  outline-none flex flex-col items-center gap-1" >
                    <label htmlFor="" className="opacity-[.6]">Change Constituency</label>
                    <select name="area" id="cars" className="w-full p-4 outline-none" defaultValue="select" onChange={e => handleChange(e)}>
                        <option value="select" disabled="true" defaultChecked>Select Your Constituency</option>
                        <option value="select" disabled="true" defaultChecked>Select Your Constituency</option>
                        <option value="Westlands">Westlands</option>
                        <option value="Dagorreti North">Dagorreti North</option>
                        <option value="Langata">Langata</option>
                        <option value="Kibra">Kibra</option>
                        <option value="Roysambu">Roysambu</option>
                        <option value="Kasarani">Kasarani</option>
                        <option value="Ruaraka">Ruaraka</option>
                        <option value="Embakasi South">Embakasi South</option>
                        <option value="Embakasi North">Embakasi North</option>
                        <option value="Embakasi Central">Embakasi Central</option>
                        <option value="Embakasi East">Embakasi East</option>
                        <option value="Embakasi West">Embakasi West</option>
                        <option value="Madaraka">Madaraka</option>
                        <option value="Kamkunji">Kamkunji</option>
                        <option value="Starehe">Starehe</option>
                        <option value="Mathare">Mathare</option>
                    </select>

                </div>
                <div className="shadow-md  outline-none flex flex-col items-center gap-1" >
                    <label htmlFor="" className="opacity-[.6]">Work Eperience</label>

                    <textarea onChange={e => handleChange(e)} name="experience" type="text" placeholder="Type your work eperience" className="w-full shadow-lg
                    outline-none resize-none
                    " />
                </div>
                <button className="shadow-4xl mt-4 p-4 " type="submit" onClick={(e) => handleSubmit(e)}>{loading ? 'Loading...' : 'Change Profile'}</button>


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
    console.log(id)
    const user = await axios.get(`${baseUrl}/api/worker/${id}`);

    return {
        props: {
            user: user.data
        }
    }
}
export default Profile;
