import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,

} from "@/components/ui/navigation-menu";
import Login from "./Login";



const Home = () => {
  return (
    <div className="h-full bg-gradient-to-br from-[#6c5ce7] to-[#00b894]">
      <header className="p-4 z-50 flex justify-between gap-4 items-center sticky top-0 backdrop-blur-lg">
        <Link className="mr-2 flex items-center gap-2" href="#">
          <span className="font-semibold text-2xl text-amber-100">
          Task Management System
          </span>
        </Link>
        <NavigationMenu
        >
          <NavigationMenuList>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-2">
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center items-center pt-18">
          <Link
            className=" inline-flex h-10 w-68 items-center justify-center rounded-md  px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            to="/login"
          >
            Login
          </Link>
          <Link
            className=" inline-flex h-10 w-68 items-center justify-center rounded-md px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            to="/register"
          >
            Get Started
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-8 lg:py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow with Our Task Management System
                  </h1>
                  <p className="max-w-[600px] text-gray-800 md:text-xl dark:text-gray-400">
                    Organize your tasks, collaborate with your team, and achieve your goals with our powerful task
                    management platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Try It Free
                  </Link>
                </div>
              </div>
            <Login/>
            </div>
          </div>
        </section>
        </main>
    </div>
    
  );
};

export default Home;
