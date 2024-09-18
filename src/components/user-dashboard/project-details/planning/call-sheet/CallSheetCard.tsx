import { Button } from "@/components/ui/button";
import React from "react";
import { BsTrash2 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { LuArrowDownToLine } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CgMoreVertical } from "react-icons/cg";
import { Clapperboard } from "lucide-react";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
type Props = {
  title: string;
  date: string;
  time: string;
  id: number;
  deleteCallSheet: (id: number) => void;
  isLoadingDelete: boolean;
};
const CallSheetCard = ({ title, date, time, id, deleteCallSheet, isLoadingDelete }: Props) => {
  const { id: projectId } = useParams();
  const router = useRouter();
  const handleEditCallSheet = () => {
    router.push(`/project-details/${projectId}/call-sheets/edit/?id=${id}`);
  };
  return (
    <div className="mt-3 shadow-lg rounded-md w-full lg:w-1/3 md:w-3/5 p-2 relative bg-white">
      <div className="absolute top-4 right-2">
        <Popover>
          <PopoverTrigger>
            <CgMoreVertical className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className=" w-fit">
            <Button
              onClick={handleEditCallSheet}
              className=" w-full flex space-x-1 px-2 py-1 text-left"
              variant="ghost"
            >
              <FiEdit2 className="w-4 h-4" /> <span>Edit Sheet</span>
            </Button>
            <Button className="w-full flex space-x-1 px-2 py-1 text-left" variant="ghost">
              <LuArrowDownToLine className="w-4 h-4" /> <span>Download</span>
            </Button>
            <Button
              onClick={() => deleteCallSheet(id)}
              className="w-full flex space-x-1 px-2 py-1 text-left"
              variant="ghost"
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? <Loader /> : <BsTrash2 className="w-4 h-4" />}
              <span>Remove</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center p-4 rounded-md">
        <Clapperboard className="text-gray-900 w-8 h-8 mr-4" />
        <div>
          <h4 className="text-sm font-semibold py-2 text-slate-700">{title}</h4>
          <p className="text-xs text-slate-600">Date: {new Date(date).toDateString()}</p>
          <p className="text-xs text-slate-600">Call Time: {time}</p>
        </div>
      </div>
      <div className="hidden">
        {/* <CallSheetTemplate ref={templateRef} formData={callsheetDetails} /> */}
      </div>
    </div>
  );
};

export default CallSheetCard;
