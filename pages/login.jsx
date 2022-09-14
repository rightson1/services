import Image from "next/image";
import React from "react";

const Login = () => {
    return <div className="w-screen bg-white h-screen flex justify-center items-center  ">

        <div className="container max-w-[500px] flex flex-col items-center gap-8">
            <Image src="/rightson.png" alt="logo" width="100px" height="100px" />
            <input type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" placeholder="username" />
            <input type="text" className="w-[300px] h-16  shadow-md  outline-none px-8" placeholder="password" />
            <button className="w-[300px] h-16  shadow-md  outline-none px-8">LOGIN</button>
        </div>


    </div>
};

export default Login;