import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Login from './Login';

const Home = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const loginFormRef = useRef(null);

  useEffect(() => {
    // Animating the heading, paragraph, and buttons
    gsap.fromTo(
      [headingRef.current, paragraphRef.current, buttonRef.current],
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 }
    );

    // Animating the login form to pop up
    gsap.fromTo(
      loginFormRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 1.5 }
    );
  }, []);

  return (
    <div className="h-full">
      <main className="flex-1">
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1
                    ref={headingRef}
                    className="text-3xl pb-8 font-bold tracking-tighter sm:text-5xl xl:text-6xl"
                  >
                    Task Management System
                  </h1>
                  <p
                    ref={paragraphRef}
                    className="max-w-[600px] text-gray-800 md:text-xl dark:text-gray-400"
                  >
                    Organize your tasks, collaborate with your team, and achieve your goals with our powerful task
                    management platform.
                  </p>
                </div>
                <div
                  ref={buttonRef}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Link
                    to="/register"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <div
                ref={loginFormRef}
                className="transform translate-y-10 opacity-0"
              >
                <Login />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
