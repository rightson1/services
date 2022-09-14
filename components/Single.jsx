import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai"
const Single = () => {
    return <div className="min-w-[250px] w-[250px]  
    h-full  shadow-lg flex justify-between items-center gap-4 px-2 border-[1px] border-black rounded-md">
        <div className="img flex-1 ">
            <Image src="https://avatars.dicebear.com/api/adventurer/1234.svg" alt="img"
                width="70%" height="100%" />
        </div>
        <div className="flex flex-col flex-2">
            <h1>Tole Rightson</h1>
            <h1>@username</h1>
        </div>
        <div className="flex flex-col flex-1 items-end">
            <h1>4.1</h1>
            <h1 className="text-[orange]"><AiFillStar /></h1>
        </div>
    </div>;
};

export default Single;
