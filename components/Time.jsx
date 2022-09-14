import React from "react";

const Time = ({ hour }) => {
    return <div className="  w-[100px]  
    h-full  shadow-5xl flex justify-between items-center gap-4 px-2 border-l-[1px] rounded-lg border-t-[1px] border-[rgba(0,0,0,.4)] rounded-5xl">

        <div className="flex flex-col flex-1 items-end">
            <h1>{hour < 10 ? `0${hour}:00H` : `${hour}:00H`}</h1>

        </div>
    </div>;
};

export default Time;
