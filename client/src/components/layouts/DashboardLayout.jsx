import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBeer, FaHome, FaUser } from 'react-icons/fa';
const DashboardLayout = ({ children, title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(title);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".dropdown-menu") && !event.target.closest(".profile-button")) {
      setIsDropdownOpen(false);
      setIsNotificationsOpen(false);
    }
  };
  const [isLogin,setIsLogin]=useState(false)
  // Listen for clicks outside of the dropdowns
  useEffect(() => {
    if(localStorage.getItem('isLogin')==='yes')
        setIsLogin(true)
    console.log(localStorage.getItem('isLogin'))
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/movies"
                    className={`${
                      activeLink === "Movies"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                    onClick={() => setActiveLink("Movies")}
                    aria-current={activeLink === "Movies" ? "page" : undefined}
                  >
                    Movies
                  </Link>
                  <Link
                    to="/theatres"
                    className={`${
                      activeLink === "Theatres"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                    onClick={() => setActiveLink("Theatres")}
                  >
                    Theatres
                  </Link>
                  <Link
                    to="/show"
                    className={`${
                      activeLink === "Show"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                    onClick={() => setActiveLink("Show")}
                  >
                    Show
                  </Link>
                </div>
              </div>
            </div>
            {!isLogin&&<><Link to='/signin' className="text-white font-medium">SigIn</Link></>}
            {isLogin&&
            <>
            <div className="hidden md:block">
              
              <div className="ml-4 flex items-center md:ml-6">
                {/* Notifications Button */}
                <button
                  type="button"
                  onClick={toggleNotifications}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Notification 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Notification 2
                    </a>
                  </div>
                )}
                {/* User Profile Dropdown */}
                <div className="relative ml-3 profile-button">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                 <FaUser className="text-white text-3xl" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Settings
                      </a>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 pointer"
                        onClick={()=>{
                          
                          localStorage.setItem('isLogin','no');
                          setIsLogin(false)
                          window.location.reload()
                      }}
                      >
                        Sign out
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </>}
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
