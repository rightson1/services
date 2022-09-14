import React from "react";

const Time = ({ hour }) => {
    return <div className="min-w-[10s0px] w-[100px]  
    h-full  shadow-lg flex justify-between items-center gap-4 px-2 border-[1px] border-black rounded-md">

        <div className="flex flex-col flex-1 items-end">
            <h1>{(hour / 60)}</h1>

        </div>
    </div>;
};

export default Time;
