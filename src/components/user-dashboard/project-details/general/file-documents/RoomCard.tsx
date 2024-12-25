import { FC } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Edit } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

type RoomCardProps = {
  room: {
    id: string;
    name: string;
    description: string;
    icon: string;
    default: boolean;
  };
  onClick: (roomId: string) => void;
  handleDeleteRoom?: (roomId: number) => void;
  handleEditRoom?: (room: any) => void;
  isPendingDelete?: boolean;
};

const RoomCard: FC<RoomCardProps> = ({
  room,
  onClick,
  handleDeleteRoom,
  handleEditRoom,
  isPendingDelete,
}) => {
  return (
    <div className="relative shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {!room.default && (
        <span className="absolute top-2 right-1 z-20">
          {handleDeleteRoom && handleEditRoom && (
            <Popover>
              <PopoverTrigger>
                <BsThreeDotsVertical />
              </PopoverTrigger>
              <PopoverContent className="w-fit space-y-3">
                {isPendingDelete ? (
                  <Loader />
                ) : (
                  <MdDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRoom(Number(room.id));
                    }}
                    className="w-5 h-5 cursor-pointer text-red-500"
                  />
                )}
                <Edit
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditRoom(room);
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
              </PopoverContent>
            </Popover>
          )}
        </span>
      )}

      <div className="flex justify-between items-start" onClick={() => onClick(room.id)}>
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{room.name}</h3>
          <span className="text-slate-500 text-sm">{room.description}</span>
        </div>
        {room.icon === "IoFolderOpenOutline" ? (
          <IoFolderOpenOutline className="w-6 h-6 mr-2" />
        ) : (
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: room.icon }}
            style={{ width: 24, height: 24 }}
          />
        )}
      </div>
    </div>
  );
};

export default RoomCard;
