import { AnnouncementFormFieldConfig, projectArray } from "../types";
import { projectDetailItem } from "../types";
import { RiRobot2Line } from "react-icons/ri";
import { IoDocumentsSharp, IoLocationOutline, IoPeopleOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { GrAnnounce, GrResources, GrMoney } from "react-icons/gr";
import { LuFileSpreadsheet, LuMonitorPlay } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import {
  MdOutlineDescription,
  MdCamera,
  MdGroups,
  MdGridView,
  MdSubscriptions,
} from "react-icons/md";
import { PiCoatHanger } from "react-icons/pi";
import { GiLipstick } from "react-icons/gi";
import { CiShoppingTag } from "react-icons/ci";
import { GoLaw } from "react-icons/go";
import { CgFilm } from "react-icons/cg";

import { IoIosPeople, IoMdFolder, IoMdSettings, IoMdStopwatch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ImAddressBook } from "react-icons/im";
import { MdNaturePeople, MdLocationPin } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

export const API_URL = "https://sv-aibackend.azurewebsites.net";

export const USER_API = "https://api-dev.storyvord.com/api";
export const NEW_API_URL = "https://api-dev.storyvord.com/api";
export const NEW_API_URL_V2 = "https://api-dev.storyvord.com/api";

// export const USER_API = "http://0.0.0.0:8000";
// export const NEW_API_URL = "http://0.0.0.0:8000";

export const userTypes = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const projects: projectArray = [
  {
    id: 1,
    name: "Bruce Lee:The Man and the Legend",
    start_date: "",
    end_date: "",
    budget: "",
    location: "",
    status: false,
  },
  {
    id: 2,
    name: "Til Madness Do Us Part",
    start_date: "",
    end_date: "",
    budget: "",
    location: "",
    status: false,
  },
  {
    id: 3,
    name: "Sakura Dreams: A Journey Through Japan's Contrasting Culture",
    start_date: "",
    end_date: "",
    budget: "",
    location: "",
    status: false,
  },
  {
    id: 4,
    name: "The Secret Garden",
    start_date: "2024-06-01",
    end_date: "2024-09-30",
    budget: "$50,000,000",
    location: "England",
    status: true,
  },
  {
    id: 5,
    name: "Inception",
    start_date: "2024-03-15",
    end_date: "2024-08-30",
    budget: "$160,000,000",
    location: "United States",
    status: true,
  },
  {
    id: 6,
    name: "Avatar 2",
    start_date: "2024-10-01",
    end_date: "2025-03-31",
    budget: "$300,000,000",
    location: "New Zealand",
    status: true,
  },
  {
    id: 7,
    name: "Jurassic World: Dominion",
    start_date: "2023-07-01",
    end_date: "2024-05-30",
    budget: "$200,000,000",
    location: "United Kingdom",
    status: true,
  },
  {
    id: 8,
    name: "Wonder Woman 3",
    start_date: "2025-01-15",
    end_date: "2025-06-30",
    budget: "$120,000,000",
    location: "United States",
    status: true,
  },
];

export const projectdetailsItems: projectDetailItem[] = [
  {
    title: "general",
    items: [
      {
        text: "reports",
        link: "reports",
        icon: RiRobot2Line,
      },
      {
        text: "File & Documents",
        link: "file-documents",
        icon: IoDocumentsSharp,
      },
      {
        text: "tasks",
        link: "task",
        icon: FaTasks,
      },
      {
        text: "calendar",
        link: "calendar",
        icon: SlCalender,
      },
      {
        text: "announcements",
        link: "announcements",
        icon: GrAnnounce,
      },
    ],
  },
  {
    title: "Project Management",
    items: [
      {
        text: "crew",
        link: "crew",
        icon: MdGroups,
      },
      {
        text: "suppliers",
        link: "resource",
        icon: GrResources,
      },
      {
        text: "compliance",
        link: "compliance",
        icon: GoLaw,
      },
      {
        text: "budget",
        link: "budget",
        icon: GrMoney,
      },
      {
        text: "call sheets",
        link: "call-sheets",
        icon: LuFileSpreadsheet,
      },
    ],
  },
  {
    title: "creative hub",
    items: [
      {
        text: "script",
        link: "script",
        icon: MdOutlineDescription,
      },
      {
        text: "scenes",
        link: "scenes",
        icon: CgFilm,
      },
      {
        text: "shots",
        link: "shots",
        icon: MdCamera,
      },
      {
        text: "storyboard",
        link: "storyboard",
        icon: MdGridView,
      },
      {
        text: "content items",
        link: "content-items",
        icon: LuMonitorPlay,
      },
    ],
  },
  {
    title: "department hub",
    items: [
      {
        text: "cast",
        link: "cast",
        icon: IoPeopleOutline,
      },
      {
        text: "costumes",
        link: "costumes",
        icon: PiCoatHanger,
      },
      {
        text: "makeup & hair",
        link: "makeup-hair",
        icon: GiLipstick,
      },
      {
        text: "locations & sets",
        link: "locations-sets",
        icon: IoLocationOutline,
      },
      {
        text: "production design",
        link: "production-design",
        icon: CiShoppingTag,
      },
    ],
  },
];

export const content_type = [
  {
    value: "Events",
    label: "Events",
  },
  {
    value: "People Stories",
    label: "People Stories",
  },
  {
    value: "Animation",
    label: "Animation",
  },
  {
    value: "Company News",
    label: "Company News",
  },
  { value: "Company Stories", label: "Company Stories" },
  { value: "Case Studies", label: "Case Studies" },
  { value: "Interviews", label: "Interviews" },
  { value: "Tutorial", label: "Tutorial" },
  { value: "Product Demo", label: "Product Demo" },
  { value: "Help & How To", label: "Help & How To" },
  { value: "Virtual Events", label: "Virtual Events" },
  { value: "Advertising", label: "Advertising" },
  { value: "Live Stream", label: "Live Stream" },
  { value: "Speaker", label: "Speaker" },
  { value: "Recruitment", label: "Recruitment" },
];

export const equipment_data = [
  { value: "Camera", label: "Camera" },
  { value: "Tripod", label: "Tripod" },
  { value: "Lighting Kit", label: "Lighting Kit" },
  { value: "Microphone", label: "Microphone" },
  { value: "Boom Pole", label: "Boom Pole" },
  { value: "Audio Recorder", label: "Audio Recorder" },
  { value: "Drone", label: "Drone" },
  { value: "Gimbal Stabilizer", label: "Gimbal Stabilizer" },
  { value: "Reflectors", label: "Reflectors" },
  { value: "Clapperboard", label: "Clapperboard" },
  { value: "Lens Kit", label: "Lens Kit" },
  { value: "Monitor", label: "Monitor" },
  { value: "Video Switcher", label: "Video Switcher" },
];

export const crew_data = [
  { value: "Producer", label: "Producer" },
  { value: "Director", label: "Director" },
  { value: "Technical Director", label: "Technical Director" },
  { value: "Camera Operator", label: "Camera Operator" },
  { value: "Sound Engineer", label: "Sound Engineer" },
  { value: "Lighting Technician", label: "Lighting Technician" },
  { value: "Graphics Operator", label: "Graphics Operator" },
  { value: "Streaming Technician", label: "Streaming Technician" },
  { value: "Floor Manager", label: "Floor Manager" },
  { value: "Teleprompter Operator", label: "Teleprompter Operator" },
  { value: "IT Support", label: "IT Support" },
  { value: "Logistics Coordinator", label: "Logistics Coordinator" },
  { value: "Talent/Host", label: "Talent/Host" },
  {
    value: "Makeup Artist and Hair Stylist",
    label: "Makeup Artist and Hair Stylist",
  },
  { value: "Venue Coordinator", label: "Venue Coordinator" },
  { value: "Time Zone Manager", label: "Time Zone Manager" },
];

export const tempTaskList = [
  {
    id: 1,
    title: "Test task",
    description: "string",
    due_date: "2024-07-29",
    completed: false,
    completion_requested: true,
    project: "248f1b86-8deb-4d74-be6f-bdc15560ed79",
    assigned_to: 2,
    requester: 2,
    created_by: 6,
  },
  {
    id: 2,
    title: "Location Permit",
    description: "string",
    due_date: "2024-07-29",
    completed: false,
    completion_requested: true,
    project: "248f1b86-8deb-4d74-be6f-bdc15560ed79",
    assigned_to: 2,
    requester: 2,
    created_by: 6,
  },
  {
    id: 3,
    title: "Location Permit",
    description: "string",
    due_date: "2024-07-29",
    completed: false,
    completion_requested: true,
    project: "248f1b86-8deb-4d74-be6f-bdc15560ed79",
    assigned_to: 2,
    requester: 2,
    created_by: 6,
  },
  {
    id: 4,
    title: "Permit for Talent",
    description: "string",
    due_date: "2024-07-29",
    completed: false,
    completion_requested: true,
    project: "248f1b86-8deb-4d74-be6f-bdc15560ed79",
    assigned_to: 2,
    requester: 2,
    created_by: 6,
  },
  {
    id: 5,
    title: "Equipment Rental",
    description: "string",
    due_date: "2024-09-29",
    completed: false,
    completion_requested: true,
    project: "248f1b86-8deb-4d74-be6f-bdc15560ed79",
    assigned_to: 2,
    requester: 2,
    created_by: 6,
  },
  {
    id: 6,
    title: "Location Scouting",
    description: "string",
    due_date: "2024-09-29",
    completed: false,
    completion_requested: true,
    project: "248f1b86-8deb-4d74-be6f-bdc15560ed79",
    assigned_to: 2,
    requester: 2,
    created_by: 6,
  },
];

export const destn = [
  {
    name: "HONG KONG",
    image: "https://storyvord.com/img/video-world-img1.png",
  },
  {
    name: "DUBAI",
    image: "https://storyvord.com/img/video-world-img2.png",
  },
  {
    name: "QATAR",
    image: "https://storyvord.com/img/video-world-img3.png",
  },
  {
    name: "TOKYO",
    image: "https://storyvord.com/img/video-world-img4.png",
  },
  {
    name: "NEW YORK",
    image: "https://storyvord.com/img/video-world-img5.png",
  },
  {
    name: "TORONTO",
    image: "https://storyvord.com/img/video-world-img6.png",
  },
  {
    name: "SINGAPORE",
    image: "https://storyvord.com/img/video-world-img7.png",
  },
  {
    name: "SHANGHAI",
    image: "https://storyvord.com/img/video-world-img8.png",
  },
  {
    name: "MUMBAI",
    image: "https://storyvord.com/img/video-world-img9.png",
  },
  {
    name: "PARIS",
    image: "https://storyvord.com/img/video-world-img10.png",
  },
  {
    name: "AUSTRALIA",
    image: "https://storyvord.com/img/video-world-img11.png",
  },
  {
    name: "LONDON",
    image: "https://storyvord.com/img/video-world-img12.png",
  },
];

export const companySettingsMenuItems = [
  {
    title: "General",
    items: [
      {
        link: "employees",
        icon: IoIosPeople,
        text: "Employees & Staff",
      },
      {
        link: "address-book",
        icon: ImAddressBook,
        text: "Address Book",
      },
      {
        link: "company-files",
        icon: IoMdFolder,
        text: "Company Files",
      },
      {
        link: "company-tasks",
        icon: FaTasks,
        text: "Company Tasks",
      },
      {
        link: "activity-logs",
        icon: RxActivityLog,
        text: "Activity Logs",
      },
    ],
  },
  {
    title: "planning",
    items: [
      {
        link: "company-calendar",
        icon: SlCalender,
        text: "Company Calendar",
      },
      {
        link: "timesheets",
        icon: IoMdStopwatch,
        text: "Time Sheets",
      },
      {
        link: "resource-planning",
        icon: GrResources,
        text: "Resource Planning",
      },
    ],
  },
  {
    title: "database",
    items: [
      {
        link: "actor-database",
        icon: MdNaturePeople,
        text: "Actor Database",
      },
      {
        link: "location-database",
        icon: MdLocationPin,
        text: "Location Database",
      },
      {
        link: "costume-database",
        icon: PiCoatHanger,
        text: "Costume Database",
      },
      {
        link: "prop-database",
        icon: CiShoppingTag,
        text: "Prop Database",
      },
    ],
  },
  {
    title: "administrative",
    items: [
      {
        link: "settings",
        icon: IoMdSettings,
        text: "Settings",
      },
      {
        link: "subscriptions",
        icon: MdSubscriptions,
        text: "Subscriptions",
      },
    ],
  },
];
