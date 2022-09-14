import Image from "next/image";
import React from "react";

const Profile = () => {
    return <div className="w-[100vw] flex items-center justify-center px-6">
        <div className="hidden  h-[130px] shadow-md overflow-hidden relative md:flex items-center justify-center">
            <div className="text-xl font-normal absolute w-[100%] h-[100%] z-[2] bg-[rgba(0,0,0,.3)] flex items-center justify-center">
                Best Cleaning Services in Kenya
            </div>
            <Image src="/cleaner.png" alt="" width="1000%" objectFit="cover" height="400%" />

        </div>
        <div className="container h-[130px] shadow-md flex flex-col p-2 gap-4">
            <div className="flex gap-8">
                <div className=" w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src="/cleaner.png" alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-xl">Rightson Kirigha</h1>
                    <h1 className="font-light">@username</h1>
                </div>
            </div>

            <button className="shadow-lg border-t p-2">View Profile</button>

        </div>

    </div>;
};

export default Profile;
