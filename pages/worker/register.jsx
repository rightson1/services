import Image from "next/image";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs"

const Register = () => {
    const [open, setOpen] = useState(false);

    return <div className="w-screen bg-white h-screen flex  pt-4  mb-[50vh]">

        <div className="container max-w-[500px] flex flex-col items-center gap-8">
            <Image src="/rightson.png" alt="logo" width="100px" height="100px" />


            <div className="w-[300px]  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Enter Username</label>
                <input type="text" className="w-[300px] h-16  outline-none px-8" placeholder="password" />

            </div>
            <div className="w-[300px]  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Password</label>
                <input type="text" className="w-[300px] h-16  outline-none px-8" placeholder="password" />

            </div>
            <div className="w-[300px]  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Upload Profile Pic</label>
                <label htmlFor="file" className="text-3xl"><BsFillImageFill /></label>
                <input type="file" className="hidden" name="file" id="file" />

            </div>
            <div className="w-[300px]  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Select Field of work</label>
                <select name="Constituencies" id="cars" className="w-[300px]  p-4 outline-none" defaultValue="select">
                    <option value="select" disabled="true" defaultChecked>Select Work Field</option>
                    <option value="volvo">Baby Sitting</option>
                    <option value="saab">Cleaning</option>
                    <option value="mercedes">Gardening</option>
                    <option value="audi">Plumbing</option>
                    <option value="audi">Carpenter</option>
                    <option value="audi">Kasarani</option>
                    <option value="audi">Electircian</option>
                    <option value="audi">Other</option>

                </select>
            </div>

            <div className="w-[300px]  shadow-md  outline-none px-8 py-3 flex flex-col items-center gap-4" >
                <label htmlFor="" className="opacity-[.6]">Select Your </label>
                <select name="Constituencies" id="cars" className="w-[300px]  p-4 outline-none" defaultValue="select">
                    <option value="select" disabled="true" defaultChecked>Select Your Constituency</option>
                    <option value="volvo">Westlands</option>
                    <option value="saab">Dagorreti North</option>
                    <option value="mercedes">Langata</option>
                    <option value="audi">Kibra</option>
                    <option value="audi">Roysambu</option>
                    <option value="audi">Kasarani</option>
                    <option value="audi">Ruaraka</option>
                    <option value="audi">Embakasi South</option>
                    <option value="audi">Embakasi North</option>
                    <option value="audi">Embakasi Central</option>
                    <option value="audi">Embakasi East</option>
                    <option value="audi">Embakasi West</option>
                    <option value="audi">Madaraka</option>
                    <option value="audi">Kamkunji</option>
                    <option value="audi">Starehe</option>
                    <option value="audi">Mathare</option>
                </select>
            </div>



            <button className="w-[300px] h-16  shadow-md  outline-none px-8 py-2">Register</button>

        </div>


    </div>
};

export default Register;
