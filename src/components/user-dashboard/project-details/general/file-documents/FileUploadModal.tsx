"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFileFormSchema } from "@/lib/validation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadFileFormData } from "@/types";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { FaRegFolderOpen } from "react-icons/fa6";

const FileUploadModal = ({
  uploadFile,
  isLoading,
  isError,
  isOpen,
  onClose,
}: {
  uploadFile: (data: UploadFileFormData) => void;
  isLoading: boolean;
  isError: boolean;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const form = useForm<UploadFileFormData>({
    resolver: zodResolver(uploadFileFormSchema),
    defaultValues: { name: "", file: null },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const file = watch("file") as File | null;

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue("file", acceptedFiles[0], { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const onSubmit = async (data: UploadFileFormData) => {
    uploadFile(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:w-[650px] w-[95%]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your file name"
              {...register("name")}
              className="border border-gray-300 rounded px-4 py-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Select File
            </label>
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 border-gray-400 p-4 rounded-md text-center cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here...</p>
              ) : file ? (
                <p>{file.name}</p>
              ) : (
                <div className=" flex flex-col items-center justify-center">
                  <p>Drag & drop a file here, or click to select a file</p>
                  <FaRegFolderOpen className=" w-12 sm:w-20 h-12 sm:h-20 text-gray-600" />
                </div>
              )}
            </div>
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          {isError && (
            <p className="text-red-500 text-sm">An error occurred while uploading the file.</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
