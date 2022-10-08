import Image from "next/image";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs"
import { carts } from "../../components/carts";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { areas } from "../../components/carts";
import { url } from "../../components/carts";
const Register = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState();
    const router = useRouter()
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${url}/api/worker`, values).then((res) => {
            console.log(res)
            if (res.data.username) {
                router.push("/worker/login");
                toast.success(`Welcome ${res.data.username}`, toastOptions)


            } else {

                toast.error(res.data, toastOptions)
            }
        }).catch(e => {
            console.log(e)
        })

    }
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
    return <form className="w-screen bg-white h-screen flex  pt-4  mb-[50vh] justify-center">

        <div className="  flex-col justify-center  items-center gap-8 max-w-[600px]">
            <div className="flex justify-center">       <Image src="/rightson.png" alt="logo" width="100px" height="100px" />
            </div>

            <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Enter Username</label>
                <input required type="text" name="username" onChange={(e) => handleChange(e)} className="w-full h-16  outline-none px-8" placeholder="username" />

            </div>
            <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Enter Username</label>
                <input required type="text" name="email" onChange={(e) => handleChange(e)} className="w-full h-16  outline-none px-8" placeholder="email" />

            </div>
            <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Password</label>
                <input required type="text" className="w-full h-16  outline-none px-8" onChange={(e) => handleChange(e)} name="password" placeholder="password" />

            </div>
            <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Upload Profile Pic</label>
                <label htmlFor="file" className="text-3xl"><BsFillImageFill /></label>
                <input type="file" className="hidden" name="file" id="file" />

            </div>
            <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Select Field of work</label>
                <select required name="type" id="type" onChange={(e) => handleChange(e)} className="w-full  p-4 outline-none" defaultValue="select">
                    <option value="select" disabled="true" defaultChecked>Select Work Field</option>

                    {carts.map((item, index) => {
                        return <option value={item.item} key={index}>{item.title}</option>
                    })}

                </select>
            </div>

            <div className="w-full  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Select Your Area </label>
                <select required name="area" id="cars" className="w-full  p-4 outline-none" defaultValue="select" onChange={(e) => handleChange(e)}>
                    <option value="select" disabled="true" defaultChecked>Select Your Constituency</option>
                    {areas.map((area, index) => {
                        return <option value={area} key={index}>{area}</option>
                    })}

                </select>
            </div>



            <button onClick={(e) => handleSubmit(e)} className="w-full h-16  shadow-md  outline-none px-8 py-2" type="submit">Register</button>
            <p>Already have an  Account?   <button className=" h-16  shadow-md  outline-none px-14 my-3" onClick={() => router.push('/worker/login')}>Login</button></p>
        </div>

        <ToastContainer />
    </form>
};

export default Register;