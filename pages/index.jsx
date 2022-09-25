import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Featured from "../components/Featured";
import NavBar from "../components/NavBar";
import Profile from "../components/Profile";
import User from "../components/User";
export default function Home() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    const juser = JSON.parse(localStorage.getItem("user"));

    axios.get(`http://localhost:3000/api/user/${juser._id}`).then(res => {
      setUser(res.data)

    })
  }, [])


  if (user) {

    return (

      <div className="overflow-x-hidden " >
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && <NavBar user={user} />}
        {user && <Profile user={user} />}
        <User />
        <Featured />
      </div>
    );
  }
  else {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-red-900">An error occured </div>
      <button onClick={() => router.push('/login')} className="border-2 m-4 p-2  cursor-pointer">Navigate To Login</button>
    </div>
  }
}
export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req?.cookies || "";


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

    }
  }
}
