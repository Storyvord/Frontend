"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetAllFiles } from "@/lib/react-query/queriesAndMutations/crew/files";
import FileCard from "@/components/user-dashboard/project-details/general/file-documents/FileCard";
import FilePreview from "@/components/user-dashboard/project-details/general/file-documents/FilePreview";
import { Button } from "@/components/ui/button";

type FileType = {
  id: number;
  file: string;
  name: string;
  folder: number;
};

const FileManagement = () => {
  const [previewFile, setPreviewFile] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);
  const { id: projectId, room: roomId }: { room: string; id: string } = useParams();
  const router = useRouter();

  const handlePreview = (fileUrl: string, fileName: string) => {
    setPreviewFile({ fileUrl, fileName });
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const { data: fileList } = useGetAllFiles(roomId);

  return (
    <section>
      <Button
        variant="outline"
        className="my-4"
        onClick={() => router.push(`/crew/file-documents/${projectId}`)}
      >
        <IoMdArrowRoundBack /> Back
      </Button>
      <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {fileList?.data?.map((file: FileType, index: number) => (
          <FileCard key={index} file={file} onPreview={handlePreview} />
        ))}
      </div>

      {fileList?.data?.length === 0 && (
        <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
          <FaRegFolderOpen className=" w-12 sm:w-20 h-12 sm:h-20 text-blue-600" />
          <label className="block text-sm text-slate-500 mb-2">
            No files have been uploaded yet.
          </label>
        </div>
      )}
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
