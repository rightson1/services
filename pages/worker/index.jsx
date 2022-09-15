import React from "react";
import WorkerNav from "../../components/WorkerNav"
import Sidebar from "../../components/Sidebar"
const Index = () => {
    return <div className="flex">
        <div className="hidden md:flex flex-1">
            <Sidebar worker={true} />
        </div>
        <div className="w-full flex-2">
            <WorkerNav />
        </div>


    </div>;
};

export default Index;
