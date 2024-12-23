import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToBase64 = (
  file: string | ArrayBuffer | File | null
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return null;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(new Error("File could not be read or is empty"));
      }
    };

    reader.onerror = () => {
      reject(new Error("File reading failed"));
    };

    if (file instanceof File || file instanceof Blob) {
      reader.readAsDataURL(file);
    } else if (typeof file === "string") {
      // Convert string to Blob and then read it
      const blob = new Blob([file], { type: "text/plain" });
      reader.readAsDataURL(blob);
    } else if (file instanceof ArrayBuffer) {
      // Convert ArrayBuffer to Blob and then read it
      const blob = new Blob([file]);
      reader.readAsDataURL(blob);
    } else {
      reject(new Error("Unsupported file type"));
    }
  });
};

export const getFileTypeFromUrl = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" }); // Use 'HEAD' to fetch headers only
    const contentType = response.headers.get("Content-Type");
    return contentType;
  } catch (error) {
    console.error("Error fetching file type:", error);
    return null;
  }
};

export function formatError(error: unknown): { title: string; description: string } {
  if (typeof error === "object" && error !== null && "data" in error) {
    const { data, message } = error as {
      message?: string;
      data?: Record<string, string[]>;
    };

    const description = data
      ? Object.entries(data)
          .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
          .join("; ")
      : "An unexpected error occurred.";

    return {
      title: message || "An error occurred",
      description,
    };
  }

  return {
    title: "An unknown error occurred",
    description: "Please try again",
  };
}
