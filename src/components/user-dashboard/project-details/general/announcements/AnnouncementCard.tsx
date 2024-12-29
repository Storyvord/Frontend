import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import Loader from "@/components/Loader";

type AnnouncementCardProps = {
  title: string;
  message: string;
  isLoading: boolean;
  onDelete: () => void;
  onEdit: () => void; // New onEdit prop
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  message,
  isLoading,
  onDelete,
  onEdit,
}) => {
  return (
    <Card className="relative max-h-[40rem]">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <div className="absolute top-4 right-3">
        <Popover>
          <PopoverTrigger>
            <BsThreeDotsVertical />
          </PopoverTrigger>
          <PopoverContent className="w-fit flex flex-col gap-2">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <MdEdit
                  onClick={onEdit}
                  className="cursor-pointer text-blue-500"
                  title="Edit Announcement"
                />
                <MdDelete
                  onClick={onDelete}
                  className="cursor-pointer text-red-500"
                  title="Delete Announcement"
                />
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <CardContent>
        <p className="mt-4 text-gray-500 line-clamp-6">{message}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
