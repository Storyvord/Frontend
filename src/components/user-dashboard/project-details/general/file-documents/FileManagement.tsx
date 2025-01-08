"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUploadModal from "./FileUploadModal";
import FilePreview from "./FilePreview";
import { FaRegFolderOpen } from "react-icons/fa";
import FileCard from "./FileCard";
import {
  useDeleteFile,
  useGetAllFiles,
  useUpdateRoomAccessRights,
  useUploadFile,
} from "@/lib/react-query/queriesAndMutations/file";
import { useParams } from "next/navigation";
import { convertToBase64 } from "@/lib/utils";
import { UploadFileFormData } from "@/types";
import AccessRights from "@/components/AccessRights";
import { useToast } from "@/components/ui/use-toast";

type FileType = {
  id: number;
  file: string;
  name: string;
  folder: number;
};

type OptionType = {
  value: string;
  label: string;
};

const FileManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);
  const { id: projectId, roomId }: { id: string; roomId: string } = useParams();
  const { toast } = useToast();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePreview = (fileUrl: string, fileName: string) => {
    setPreviewFile({ fileUrl, fileName });
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const { data: fileList, error } = useGetAllFiles(roomId);
  const { mutateAsync: deleteFile } = useDeleteFile();
  const handleDeleteFile = async (fileId: number) => {
    if (window.confirm("Are you sure you want to delete this file?"))
      try {
        await deleteFile(fileId);
        toast({
          title: "Success",
          description: "File deleted successfully!",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to delete the file. Please try again.",
          variant: "destructive",
        });
      }
  };
  const { mutateAsync, isError, isPending, error: uploadError } = useUploadFile();

  const handleUploadFile = async (data: UploadFileFormData) => {
    const base64 = await convertToBase64(data.file);
    const transformData = { ...data, file: base64, allowed_users: [], project: projectId };

    try {
      await mutateAsync({ uploadedFileData: transformData, roomId });
      handleCloseModal();
      toast({
        title: "File created",
      });
    } catch (error) {
      toast({
        title: uploadError?.message,
        variant: "destructive",
      });
    }
  };

  // section for giving access rights
  const { mutateAsync: giveAccessRights, isPending: isLoadingAccessRights } =
    useUpdateRoomAccessRights();
  const handleSubmitAccessRightsForm = async (data: OptionType[]) => {
    const user = data.map((item) => item.label);
    const transFormData = { add_users: user };
    const res = await giveAccessRights({ roomId, data: transFormData });
    if (res) {
      toast({ title: "Successfully give access to selected crew" });
    } else {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <section>
      <div className="flex flex-row gap-2 items-center justify-between mt-5 w-full">
        <Button variant="outline" className="flex flex-row" onClick={handleOpenModal}>
          +<span className="ml-2">Upload File</span>
        </Button>
        {/* <AccessRights
          handleSubmit={handleSubmitAccessRightsForm}
          isLoading={isLoadingAccessRights}
        /> */}
      </div>

      <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {fileList?.data.map((file: FileType, index: number) => (
          <FileCard
            key={index}
            file={file}
            onDeleteFile={handleDeleteFile}
            onPreview={handlePreview}
          />
        ))}
      </div>
      {error && <p className=" text-center">{error.message}</p>}
      {fileList?.data.length === 0 && (
        <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
          <FaRegFolderOpen className=" w-12 sm:w-20 h-12 sm:h-20 text-blue-600" />
          <label className="block text-sm text-slate-500 mb-2">
            No files have been uploaded yet.
          </label>
          <div className="flex py-3">
            <Button variant="outline" className="w-26 h-12 flex flex-row" onClick={handleOpenModal}>
              +<span className="font-semibold ml-2">Upload File</span>
            </Button>
          </div>
        </div>
      )}

      <FileUploadModal
        uploadFile={handleUploadFile}
        isLoading={isPending}
        isError={isError}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {previewFile && (
        <FilePreview
          fileName={previewFile.fileName}
          fileUrl={previewFile.fileUrl}
          onClose={handleClosePreview}
        />
      )}
    </section>
  );
};

export default FileManagement;
