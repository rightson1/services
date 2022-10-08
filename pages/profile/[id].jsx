import WorkerNav from "../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../models/firebase";
import { url as baseUrl } from "../../components/carts";


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
    const [values, setValues] = useState()
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    console.log(`${baseUrl}/api/user/${user._id}`)

    const handleSubmit = async () => {


        if (!file) {
            return await axios.put(`${baseUrl}/api/user/${user._id}`, values).then((res) => {
                if (res.data.username) {
                    toast.success("Updated Succesfull", toastOptions)

                } else {

                    toast.error("There was an error", toastOptions)
                }
            }).catch(e => {
                toast.error("There was an error", toastOptions)

            })

        }
        let name = `${file.name}-${Math.floor(Math.random() * 1000)}`
        const fileRef = ref(storage, `users/${name}`)
        uploadBytes(fileRef, file).then((res) => {

            deleteObject(ref(storage, `/users/${user.pic}`)).then(() => {


            })
                .catch((err) => {
                    console.log(err);
                });
            getDownloadURL(res.ref).then((url) => {

                const data = { ...values, avatar: url, pic: name }
                axios.put(`${baseUrl}/api/user/${user._id}`, data).then((res) => {
                    if (res.data.username) {
                        toast.success("Updated Succesfull", toastOptions)

                    } else {

                        toast.error("There was an error", toastOptions)
                    }
                }).catch(e => {
                    toast.error("There was an error", toastOptions)
                })
            })

        }).catch(e => {
            toast.error("There was an error", toastOptions)
            console.log(e)
        })







    }
    // toast.error("There was an error", toastOptions)
    return <div className="flex mb-[50vh]">
        <div className="hidden md:flex flex-1">
            {user && <Sidebar user={user} />}
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav profile={true} non={true} />
            <div className="flex flex-col px-4 gap-4">
                <div className="flex  shadow-lg  gap-4 px-4">
                    <div className="relative ">
                        <Image src={file ? URL.createObjectURL(file) : user && user.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                        <label htmlFor="file" className="absolute p-2 shadow-lg bg-[rgba(0,0,0,.3)] top-[50%] left-[50%] translate-x-[-50%] text-white translate-y-[-50%] text-2xl"><BiEditAlt /></label>

                    </div>    <input type="file" id="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">Rightson Kirigha</h1>
                        <h1 className="font-light">Nairobi,Starehe</h1>
                    </div>



                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">Change Email</h1>
                    <input type="text" placeholder={user.email} name="email" className="shadow-4xl p-3 outline-none" onChange={(e) => handleChange(e)} />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">Change Password</h1>
                    <input type="text" placeholder="***************" name="password" className="shadow-4xl p-3 outline-none" onChange={(e) => handleChange(e)} />
                </div>

                <div className="shadow-lg  outline-none flex flex-col  gap-1" onChange={(e) => handleChange(e)}>
                    <label htmlFor="" className=" font-semibold">Change Constituency</label>
                    <select name="area" id="cars" className="w-full p-4 outline-none" defaultValue="select">
                        <option value="select" disabled="true" defaultChecked>Select Your Constituency</option>
                        <option value="Westlands">Westlands</option>
                        <option value="Dagorreti North">Dagorreti North</option>
                        <option value="Langata">Langata</option>
                        <option value="Kibra">Kibra</option>
                        <option value="Roysambu">Roysambu</option>
                        <option value="Kasarani">Kasarani</option>
                        <option value="Ruaraka">Ruaraka</option>
                        <option value="Embakasi Sputh">Embakasi South</option>
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


                <button className="shadow-4xl mt-4 p-4 " type="submit" onClick={(e) => handleSubmit(e)}>Change Profile</button>
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

    const user = await axios.get(`http://localhost:3000/api/user/${id}`);

    return {
        props: {
            user: user.data
        }
    }
}


export default Profile;