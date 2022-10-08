import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import axios from "axios"
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { areas } from "../components/carts";
import { url as baseUrl } from "../components/carts";
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
const Register = () => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(null);
    const [values, setValues] = useState({
        email: null,
        username: null,
        password: null,
        url: null,
        area: null,
    });

    const router = useRouter();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        setValues({ ...values, avatar: url })
    }, [url])

    const handleSubmit = async () => {
        const data = await axios.post(`${baseUrl}/api/user`, values).then((res) => {
            if (res.data.username) {
                router.push("/login")
            } else {

                toast.error(res.data, toastOptions)
            }
        }).catch(e => {
            console.log(e)
        })




    }
    return <div className="w-screen bg-white h-[fit-content]  flex justify-center items-center py-4  ">

        <div className="container max-w-[500px] flex flex-col items-center gap-8">
            <Image src="/rightson.png" alt="logo" width="100px" height="100px" />
            <input type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" onChange={(e) => handleChange(e)} name="username" placeholder="username" />
            <input type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" onChange={(e) => handleChange(e)} name="email" placeholder="email" />
            <input type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" onChange={(e) => handleChange(e)} name="password" placeholder="password" />
            <div className="shadow-md  outline-none flex flex-col items-center gap-1 w-[300px]" >

                <select name="area" id="cars" className="w-full p-4 outline-none" onChange={(e) => handleChange(e)} defaultValue="select">
                    <option value="select" disabled="true" defaultChecked>Select Your Constituency</option>
                    {areas.map((area, index) => {
                        return <option value={area} key={index}>{area}</option>
                    })}

                </select>

            </div>
            <button className="w-[300px] h-16  shadow-md  outline-none px-8" onClick={() => setOpen(true)}>Choose Avatar</button>
            {open && <Avatar setUrl={setUrl} setOpen={setOpen} />}
            <button className="w-[300px] h-16  shadow-md  outline-none px-8" onClick={() => handleSubmit()}>Register</button>
            <p>Already have an Account?   <button className=" h-16  shadow-md  outline-none px-8" onClick={() => router.push('/login')}>Login</button></p>

        </div>

        <ToastContainer />
    </div>
};

export default Register;
