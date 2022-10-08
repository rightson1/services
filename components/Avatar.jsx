import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle as Close } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";

const Avatar = ({ setUrl, setOpen }) => {
    const api = "https://avatars.dicebear.com/api/adventurer/";
    const [avatar, setAvatars] = useState([]);
    const [urlNum, setUrlNum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [reload, setReload] = useState(true)

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };
    const setProfile = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const url = urlNum.find(({ index }) => index === selectedAvatar)
            setUrl(url.url)
            setOpen(false)
        }
    };

    useEffect(() => {
        const data = [];
        const urlArray = [];

        for (let i = 0; i < 4; i++) {
            let fullUrl = `${api}${Math.round(Math.random() * 1000)}.svg`;

            // axios.get(fullUrl).then((res) => {
            // const buffer = new Buffer(res.data);
            data.push(fullUrl);
            urlArray.push({ url: fullUrl, index: i });
            setUrlNum(urlArray);
            setAvatars(data);
            setIsLoading(false);
            // });
        }
    }, [reload]);

    return <div className="w-screen min-h-screen overflow-y-auto  fixed top-0 left-0 bg-white flex justify-center items-center">
        <div className=" relative h-full overflow-scroll min-h-[120vh] w-full flex flex-col gap-8 bg-red-50  md:w-[500px] sm:gap-8 md:h-[90%] md:rounded-md">
            <div className="absolute right-2 top-4 " onClick={() => setOpen(false)}>
                <Close className="text-2xl" />
            </div>
            <h1 className="mt-8 font-semibold text-xl text-center">CHOOSE AVATAR</h1>
            <div className="container  grid grid-rows-2 grid-cols-2 mx-auto  gap-8">
                {
                    avatar.map((item, index) => {
                        return <div key={index} onClick={() => setSelectedAvatar(index)} className={!(selectedAvatar === index) ? `w-full h-full flex items-center justify-center` :
                            `w-full h-full flex items-center justify-center border-[3px] rounded-[10px]`}>
                            <Image src={item} width="100" height="100" alt="" />
                        </div>
                    })
                }
            </div>
            <button className="shadow-md w-[300px] mx-auto p-4 text-xl" onClick={() => setReload(!reload)}>Reload</button>
            <button className="shadow-md w-[300px] mx-auto p-4 text-xl" onClick={setProfile}>Select</button>

        </div>

        <ToastContainer />
    </div>;

};

export default Avatar;
