import { House,Search } from 'lucide-react';
import {useLocation, Link} from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import ThemeSelector from './ThemeSelector';
export default function SideBar() {
  const {authData} = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <aside className='bg-base-300 h-full p-[20px] flex flex-col gap-10'>
      <a href="/home">Social Media</a>
      <nav className='flex flex-col gap-[20px]'>
        <Link className={`flex items-center  justify-start gap-2 btn ${currentPath === '/home' ? 'btn-active btn-primary' : ''}`} to='/home'>
          <House/> Home
        </Link>
        <Link className={`flex items-center justify-start gap-2 btn  ${currentPath === '/search' ? 'btn-active btn-primary' : ''}`} to='/search'>
          <Search/> Search
        </Link>
        <Link className={`flex items-center justify-start gap-2 btn  ${currentPath === '/search' ? 'btn-active btn-primary' : ''}`} to='/search'>
          <Search/> Explore
        </Link>
        <Link className={`flex items-center justify-start gap-2 btn  ${currentPath === '/search' ? 'btn-active btn-primary' : ''}`} to='/search'>
          <Search/> Messages
        </Link>
        <Link className={`flex items-center justify-start gap-2 btn  ${currentPath === '/search' ? 'btn-active btn-primary' : ''}`} to='/search'>
           <img src={authData?.user?.profileImage} className="w-[30px] h-[30px] rounded-full" /> Profile
        </Link>
        <ThemeSelector className='w-full'/>
      </nav>
      <footer>
        asd
      </footer>
    </aside>
  )
}
