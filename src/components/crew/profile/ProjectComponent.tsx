import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  imageUrl: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
}

const ProjectComponent: React.FC<ProjectProps> = ({
  imageUrl,
  projectTitle,
  projectDescription,
  projectLink,
}) => {
  if (!imageUrl) {
    return null;
  }
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none border p-2">
      <div className="relative bg-clip-border rounded-xl overflow-hidden text-white mx-0 mt-0 mb-4 h-64 xl:h-40">
        <Image
          src={imageUrl}
          alt={projectTitle}
          className="h-full w-full object-cover"
          layout="fill"
        />
      </div>
      <div className="p-6 py-0 px-1">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mt-1 mb-2">
          {projectTitle}
        </h5>
        <p className="font-normal text-sm text-blue-gray-500 mb-6 w-full line-clamp-4">
          {projectDescription}
        </p>
      </div>
      <div className="p-6 mt-auto mx-auto mb-2 flex items-center justify-between py-0 px-1">
        <Link href={projectLink}>
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
            type="button"
          >
            View Project
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectComponent;
