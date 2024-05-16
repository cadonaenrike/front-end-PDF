// src/pages/about/index.tsx
import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar/SideBar";

const Account = dynamic(() => import("@/components/About/Account"));
const Orders = dynamic(() => import("@/components/About/Orders"));
const Library = dynamic(() => import("@/components/About/Library"));

const About = () => {
  const [activeComponent, setActiveComponent] = useState("Account");

  const renderContent = () => {
    switch (activeComponent) {
      case "Account":
        return <Account />;
      case "Orders":
        return <Orders />;
      case "Library":
        return <Library />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="flex ">
      <Sidebar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <div className="flex-grow p-6 ">{renderContent()}</div>
    </div>
  );
};

export default About;
