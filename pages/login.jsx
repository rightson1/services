import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from "../redux/user";
import { url } from "../components/carts";
import axios from "axios";
import { useDispatch } from "react-redux";
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
const Login = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        username: null,
        password: null,

    });
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }
    const handleSubmit = async () => {
        setLoading(true)
        axios.patch(`${url}/api/user`, values).then((res) => {
            setLoading(false)
            dispatch(createUser(res.data))
            if (res.data.username) {
                router.push("/home")
                localStorage.setItem('user', JSON.stringify(res.data))
            } else {


                toast.error(res.data, toastOptions)
            }
        }).catch(e => {
            setLoading(false)
            console.log(e)
        })




    }

    return <div className="w-screen bg-white h-screen flex justify-center items-center  ">

        <div className="container max-w-[500px] flex flex-col items-center gap-8">
            <Image src="/rightson.png" alt="logo" width="100px" height="100px" />
            <input onChange={(e) => handleChange(e)} name="username" type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" placeholder="username" />
            <input onChange={(e) => handleChange(e)} name="password" type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" placeholder="password" />
            <button className="w-[300px] h-16  shadow-md  outline-none px-8" onClick={() => handleSubmit()}>{loading ? 'Loading...' : 'Login'}</button>
            <p>Dont  have an Account?   <button className=" h-16  shadow-md  outline-none px-8" onClick={() => router.push('/register')}>Register</button></p>
        </div>
        <ToastContainer />
    </div>
};

export default Login;