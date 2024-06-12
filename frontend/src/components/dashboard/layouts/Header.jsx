import { FiSearch } from 'react-icons/fi';
import { loggedUser } from '@/store/authSlice';
import { logout } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Mail, MessageSquare, PlusCircle, Settings, User } from 'react-feather';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.user);
  const user = useSelector(loggedUser);
  const navigate = useNavigate();
  useEffect(() => {
  }, [dispatch, user]);
  

  if (status === 'loading') {
    return <div>Loading user data...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const userImageSrc = user.user_image ? user.user_image.url : "/profile.png";

  const handleProfileUpdate = () => {
    navigate (`/update/profile/${user.id}`); 
  };

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('user');
    window.location.replace('/');
  };
  return (
    <header className="z-40  items-center  sticky top-0 bg-white shadow-lg dark:bg-gray-700 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex w-3/4 h-full">
            <div className="relative flex items-center w-full h-full lg:w-64 group">
              <div className="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                <FiSearch />
              </div>
              <input
                type="text"
                className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
            <p className='mx-8'>{user.username}</p>
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
                <a href="/profile" className="relative block">
               <AvatarImage src={userImageSrc}
                    alt="profil"
                    className=" cursor-pointer"
                  />
                </a>
                </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
      <DropdownMenuItem  key="profile" >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProfileUpdate}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
        <DropdownMenuItem  onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
