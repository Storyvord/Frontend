import clsx from "clsx";
import { FC } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
  className?: string;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab, tabs, className }) => {
  return (
    <div className={clsx("border-b border-gray-200 overflow-x-auto", className)}>
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap  px-1.5 py-2 font-poppins-semibold ${
              activeTab === tab
                ? "from-gray-900 border-b-2 border-gray-700"
                : " text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
