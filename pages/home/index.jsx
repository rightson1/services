import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Featured from "../../components/Featured";
import NavBar from "../../components/NavBar";
import { url } from "../../components/carts";
import Profile from "../../components/Profile";
import { createUser } from "../../redux/user"
import User from "../../components/User";
import { useDispatch, useSelector } from "react-redux";
let rawUrl = ""
export default function Home({ worker }) {
  const [user, setUser] = useState();
  const router = useRouter();
  const [baseUrl, setBaseUrl] = useState();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch()


  useEffect(() => {
    const juser = JSON.parse(localStorage.getItem("user"));
    if (currentUser.user) {

      setUser(currentUser.user)
    } else {
      axios.get(`${url}/api/user/${juser._id}`).then(res => {
        setUser(res.data)
        dispatch(createUser(res.data))

      })
    }

  }, [])


  useEffect(() => {
    setBaseUrl(window.location.href)


  }, [])
  useEffect(() => {
    rawUrl = baseUrl


  }, [baseUrl])


  if (user) {

    return (

      <div className="overflow-x-hidden " >
        <Head>
          <title>Rightson Workers</title>
          <meta name="description" content="Look for profession home service workers all around nairobi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && <NavBar user={user} />}
        {user && <Profile user={user} />}
        <User />
        <Featured workers={worker} />
      </div>
    );

  }

  else {
    return <div className="flex h-screen flex-col  gap-4 w-screen py-4 px-8">
      <div role="status" className=" animate-pulse flex flex-col gap-8">

        <div className="h-12 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4 w-full"></div>
        <div className="flex gap-8">
          <div className="h-[200px] md:h-[300px] bg-gray-200  dark:bg-gray-700 mb-4 w-full"></div>

        </div>
        <div className="h-12 bg-gray-200 rounded-sm dark:bg-gray-700 mb-4 w-full"></div>
      </div>
      <div className="flex items-center flex-col"><span className="text-[10px] text-red-200">If it takes too long</span>  <button onClick={() => router.push('/login')} className="border-2  p-2  xm:cursor-pointer">Navigate To Login</button></div>
    </div>
  }
}

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req?.cookies || "";
  const worker = await axios.get(`${url}/api/worker`)

  if (cookie.token !== process.env.cookie || !cookie.token || cookie.token == undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }
  return {
    props: {

      worker: worker.data
    }
  }
}
