import React from "react";

const Time = ({ hour, setSelect, index, select }) => {
    return <div className="cursor-pointer  w-[100px]  
    h-full  shadow-5xl flex justify-between items-center gap-4 px-2 border-l-[1px] rounded-lg border-t-[1px] border-[rgba(0,0,0,.4)] rounded-5xl" onClick={() => setSelect(index)}
        style={{
            border: select === index ? '2px solid blue' : '',
        }}

    >

        <div className="flex flex-col flex-1 items-end">
            <h1>{hour < 10 ? `0${hour}:00H` : `${hour}:00H`}</h1>

        </div>
    </div>;
};

export default Time;
