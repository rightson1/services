import Link from "next/link";
import React from "react";

const SideNav = () => {

    return <div className="h-screen  w-[350px] flex shadow-lg border-l flex-col gap-4 px-4 py-4">
        <Link href="/" passHref>
            <div className="w-full cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                <h1>Home</h1>
            </div>
        </Link>
        <Link href="/inbox" passHref>
            <div className="w-full  cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                <h1>Inbox</h1>
            </div></Link>
        <Link href="/disputes" passHref>
            <div className="w-full  cursor-pointer shadow-md py-2 px-2 text-light bg-red-50 text-xl text-center">
                <h1>Disputes</h1>
            </div>
        </Link>




    </div>;
};

export default SideNav;
