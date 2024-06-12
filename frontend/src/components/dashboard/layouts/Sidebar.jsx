import { Link } from "react-router-dom";
import {
  FiClipboard,
  FiCalendar,
} from "react-icons/fi";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [active,setActive] = useState("/dashboard");
  const handleActive = (path) => {
    setActive(path);
  };
  return (
    <div className="h-screen">
      <nav className="h-full flex flex-col  bg-white rounded-2xl dark:bg-black border ">
        <div className="p-4 pb-2 flex justify-around items-center ">
          <span
            className={`font-semibold text-xl overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}

          >
            Task Manager
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <div className="flex-1 pt-4 px-3">
          <Link
            to="/tasks"
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors 
            ${
              active === "/tasks"
                ? "bg-gradient-to-tr from-slate-200 to-slate-100 text-blue-800"
                : ""
            }
          `}
            onClick={() => handleActive("/tasks")}
          >
            <FiClipboard />

            <span
              className={`font-medium overflow-hidden transition-all ${
                expanded ? "w-44 ml-3" : "w-0"
              }`}
            >
              Tasks
            </span>
          </Link>
          <Link
            to="/calendar"
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors 
            ${
              active === "/calendar"
                ? "bg-gradient-to-tr from-slate-200 to-slate-100 text-blue-800"
                : ""
            }
          `}
            onClick={() => handleActive("/calendar")}
          >
            <FiCalendar />

            <span
              className={`font-medium overflow-hidden transition-all ${
                expanded ? "w-44 ml-3" : "w-0"
              }`}
            >
              Calendar
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
