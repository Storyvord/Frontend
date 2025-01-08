"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FilePreviewProps {
  fileUrl: string;
  fileName: string;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, fileName, onClose }) => {
  // useEffect(() => {
  //   console.log('File URL:', fileUrl);
  // }, [fileUrl]);

  (async function getMimeType(url: string): Promise<string | null> {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        const mimeType = response.headers.get("Content-Type");
        // console.log("MIME Type:", mimeType);
        return mimeType;
      } else {
        console.error("Failed to fetch the URL:", response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching MIME type:", error);
      return null;
    }
  })(fileUrl);

  const renderFilePreview = () => {
    // Images (png, jpg, jpeg, gif)
    if (
      fileUrl.includes("png") ||
      fileUrl.includes("jpg") ||
      fileUrl.includes("jpeg") ||
      fileUrl.includes("gif") ||
      fileUrl.includes("svg")
    ) {
      return (
        <div className="flex items-center justify-center h-full bg-[#f5f5f5] rounded-lg">
          <div className="relative w-full h-full">
            <Image
              src={fileUrl}
              alt={fileName}
              fill
              style={{ objectFit: "contain" }}
              className="p-4"
            />
          </div>
        </div>
      );
    }

    // PDF files
    if (fileUrl.includes("pdf")) {
      return (
        <div className="w-full h-full">
          <iframe src={fileUrl} className="w-full h-full border-0" title="PDF Preview" />
        </div>
      );
    }

    // Word documents (doc, docx)
    if (
      fileUrl.includes("msword") ||
      fileUrl.includes("officedocument.wordprocessingml.document")
    ) {
      return (
        <div className="w-full h-full">
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            className="w-full h-full border-0"
            title="Word Document Preview"
          />
        </div>
      );
    }

    // PowerPoint files (ppt, pptx)
    if (
      fileUrl.includes("ms-powerpoint") ||
      fileUrl.includes("officedocument.presentationml.presentation")
    ) {
      return (
        <div className="w-full h-full">
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            className="w-full h-full border-0"
            title="PowerPoint Preview"
          />
        </div>
      );
    }

    // Excel files (xls, xlsx)
    if (fileUrl.includes("ms-excel") || fileUrl.includes("officedocument.spreadsheetml.sheet")) {
      return (
        <div className="w-full h-full">
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            className="w-full h-full border-0"
            title="Excel Preview"
          />
        </div>
      );
    }

    // Text files
    if (fileUrl.includes("txt")) {
      return (
        <div className="w-full h-full">
          <iframe src={fileUrl} className="w-full h-full border-0" title="Text Preview" />
        </div>
      );
    }

    // Default: Download link for unsupported files
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-600 mb-4">Preview not available for this file type</p>
        <a
          href={fileUrl}
          download={fileName}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Download File
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90vw] md:w-[70vw] h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{fileName}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
            <Image src="/cancel.svg" alt="Close" width={24} height={24} />
          </Button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-4">{renderFilePreview()}</div>
      </div>
    </div>
  );
};

export default FilePreview;
