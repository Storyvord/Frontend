"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUploadModal from "./FileUploadModal";
import FilePreview from "./FilePreview";
import { FaRegFolderOpen } from "react-icons/fa";
import FileCard from "./FileCard";
import { useDeleteFile, useGetAllFiles } from "@/lib/react-query/queriesAndMutations/file";
import { useParams } from "next/navigation";

type FileType = {
  id: number;
  file: string;
  name: string;
  folder: number;
};

const FileManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePreview = (fileUrl: string, fileName: string) => {
    setPreviewFile({ fileUrl, fileName });
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const { roomId: roomID }: { roomId: string } = useParams();
  const { data: fileList } = useGetAllFiles(roomID);
  const { mutateAsync: deleteFile } = useDeleteFile();
  const handleDeleteFile = (fileId: number) => {
    deleteFile(fileId);
  };
  return (
    <section>
      <div className="flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between mt-5">
        <Button variant="outline" className="flex flex-row" onClick={handleOpenModal}>
          +<span className="ml-2">Upload File</span>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {fileList?.map((file: FileType, index: number) => (
          <FileCard
            key={index}
            file={file}
            onDeleteFile={handleDeleteFile}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {fileList?.length === 0 && (
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

      <FileUploadModal isOpen={isModalOpen} onClose={handleCloseModal} />

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
