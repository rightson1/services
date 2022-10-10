import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai"
const Single = ({ user }) => {
    return <div className="min-w-[250px] w-[250px]  
    h-full  shadow-lg flex justify-between items-center gap-4 px-2 border-[1px] border-black rounded-md">
        <div className="img flex-1  rounded-full overflow-hidden w-[100px] h-full">
            <Image objectFit="cover" src={user.avatar ? user.avatar : "https://avatars.dicebear.com/api/adventurer/1234.svg"} alt="img"
                width="70%" height="100%" />
        </div>
        <div className="flex flex-col flex-2">
            <h1>{user.username}</h1>
            <h1>@{user.name}</h1>
        </div>
        <div className="flex flex-col flex-1 items-end">
            <h1>4.1</h1>
            <h1 className="text-[#3a3835]"><AiFillStar /></h1>
        </div>
    </div>;
};

export default Single;
