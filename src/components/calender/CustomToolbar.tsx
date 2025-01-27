"use client";
import { CalenderEventType } from "@/types";
import Image from "next/image";
import { ToolbarProps, View } from "react-big-calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomToolbar: React.FC<ToolbarProps<CalenderEventType, object>> = (props) => {
  const { label, view } = props;

  const goToToday = () => props.onNavigate("TODAY");

  const goToBack = () => props.onNavigate("PREV");

  const goToNext = () => props.onNavigate("NEXT");

  const setView = (view: View) => {
    props.onView(view);
  };

  return (
    <div className="flex justify-between items-center pb-4 text-gray-600">
      {/* Left Section: Navigation Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={goToToday}
          className="md:px-4 px-2 md:py-2 py-1 rounded-full border border-gray-500"
        >
          Today
        </button>
        <button
          onClick={goToBack}
          className="bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 p-2"
        >
          <Image
            src="/icons/arrow-left.svg"
            alt=""
            width={15}
            height={15}
            className=" w-2 rotate-180"
          />
        </button>
        <button
          onClick={goToNext}
          className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <Image src="/icons/arrow-left.svg" alt="" width={15} height={15} className=" w-2" />
        </button>
        <div className=" text-sm md:text-base font-poppins-medium text-gray-600">{label}</div>
      </div>

      {/* Center Section: Label */}

      {/* Right Section: Dropdown for Views */}
      <Select onValueChange={(value) => setView(value as View)} defaultValue={view}>
        <SelectTrigger className=" w-fit rounded-full text-md border border-gray-500 flex items-center gap-3 focus:ring-none h-9 md:h-11">
          <SelectValue placeholder={view.charAt(0).toUpperCase() + view.slice(1)} />
        </SelectTrigger>
        <SelectContent>
          {["month", "week", "day", "agenda"].map((item) => (
            <SelectItem key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomToolbar;
