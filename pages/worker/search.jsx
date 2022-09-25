import React from "react";
import WorkerNav from "../../components/WorkerNav";
import { BiEditAlt } from "react-icons/bi"
import Sidebar from "../../components/Sidebar";
import Image from "next/image";
import { FcSearch, FcLike } from "react-icons/fc"
import { BiDislike, BiLike } from "react-icons/bi"

const Search = () => {
    return <div className="flex">
        <div className="hidden md:flex flex-1">
            <Sidebar worker={true} />
        </div>
        <div className="w-full flex-2 flex-col">
            <WorkerNav search={true} />
            <div className="flex flex-col px-4 gap-4">
                <div className="flex px-4">
                    <input type="text" placeholder="Search for a job" className="border p-2 w-full flex-3 outline-none" />
                    <label htmlFor="" className="border flex items-center justify-center flex-1 w-full min-w-[100px]"><FcSearch /></label>
                </div>
                <div className="flex">
                    <h1 className="font-light">Recent Searches</h1>
                </div>
                <div className="flex">
                    <div className="flex gap-4">
                        <input type="checkbox" id="1" className="rounded-full" />
                        <label htmlFor="1">Baby Sitting</label>
                    </div>
                </div>



            </div>

        </div>

    </div >;
};

export default Search;
