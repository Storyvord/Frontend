import clsx from "clsx";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const items = [
  {
    id: 1,
    title: "Postings",
    link: "/crew/postings",
    heading: "Awaiting work sample verification",
    description:
      " You still have work samples awaiting verification. You can change your verification methods by clicking here.",
  },
  {
    id: 2,
    link: "/crew/applications",
    title: "Application",
    heading: "Apply to a position",
    description: "Once you've applied, you can track the status of your open applications here.",
  },
  {
    id: 3,
    link: "/crew/projects",
    title: "Projects",
    heading: "Start a new project",
    description:
      "A project is a work order between you and a client. A client can start a project with you directly or hire you as a result of an application.",
  },
  {
    id: 4,
    link: "/crew/home",
    title: "Actions",
    heading: "",
    description: "",
  },
  { id: 5, link: "/crew/home", title: "My network", description: "" },
  { id: 6, link: "/crew/home", title: "Reports ", heading: "", description: "" },
  { id: 7, link: "/crew/home", title: "Learn", heading: "", description: "" },
];

const Dashboard = () => {
  const { data } = useGetUserProfile();
  return (
    <div className="">
      <nav className=" sm:flex block justify-between">
        <div>
          <h3 className=" text-md text-gray-500">
            {" "}
            Welcome, {data?.data?.personal_info.full_name}
          </h3>
          <h2 className="sm:text-lg sm:font-semibold text-gray-700">
            Here&apos;s your Storyvord Glance
          </h2>
        </div>
        <Link href="/crew/profile" className=" flex gap-4 items-center text-md mt-4">
          Manage your Profile <FaArrowRightLong />
        </Link>
      </nav>
      <main className="grid grid-cols-4 grid-rows-2 gap-6 md:grid-cols-8 lg:p-8 mt-4 lg:mt-0">
        {items.map((item, index) => (
          <Link
            href={item.link}
            key={item.id}
            className={clsx(`col-span-4 md:col-span-2 row-span-1 text-gray-900 cursor-pointer`, {
              "row-span-2": item.id === 4,
            })}
          >
            <CardTitle className=" text-lg ml-4 flex gap-4 items-center w-fit hover:scale-105 cursor-pointer">
              {item.title}
            </CardTitle>
            <Card
              className={clsx(" min-h-60 hover:border-2 hover:border-gray-300", {
                "h-full": item.id === 4,
              })}
            >
              <p className="mb-3">{item.heading}</p>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
