import React from "react";
import WorkerNav from "../../components/WorkerNav"
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import Image from "next/image";
const Profile = () => {
    return <div className="flex">
        <div className="hidden md:flex flex-1">
            <Sidebar worker={true} />
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav profile={true} />
            <div className="flex flex-col px-4 gap-4">
                <div className="flex  shadow-lg  gap-4 px-4">
                    <div className="relative ">
                        <Image src="/cleaner.png" alt="" width="100%" objectFit="cover" height="100%" />
                        <label htmlFor="file" className="absolute p-2 shadow-lg bg-[rgba(0,0,0,.3)] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl"><BiEditAlt /></label>

                    </div>    <input type="file" id="file" className="hidden" />
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">Rightson Kirigha</h1>
                        <h1 className="font-light">Nairobi,Starehe</h1>
                    </div>


                </div>
                <div className="shadow-md  outline-none flex flex-col items-center gap-1" >
                    <label htmlFor="" className="opacity-[.6]">Change field Of Work Field of work</label>
                    <select name="Constituencies" id="cars" className="w-full p-4 outline-none" defaultValue="select">
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
                <div className="shadow-md  outline-none flex flex-col items-center gap-1" >
                    <label htmlFor="" className="opacity-[.6]">Change Constituency</label>
                    <select name="Constituencies" id="cars" className="w-full p-4 outline-none" defaultValue="select">
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
                <div className="shadow-md  outline-none flex flex-col items-center gap-1" >
                    <label htmlFor="" className="opacity-[.6]">Work Eperience</label>

                    <textarea type="text" placeholder="Type your work eperience" className="w-full shadow-lg
                    outline-none resize-none
                    " />
                </div>


            </div>

        </div>

    </div>;
};

export default Profile;
