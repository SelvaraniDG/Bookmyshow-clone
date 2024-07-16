// src/components/Header.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import logo from '../../assets/images/logo.jpg';
import { authActions } from '../../redux/authSlice'; 
import NavItems from './NavItems';
import MobileNav from './MobileNav';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isLoggedIn state:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <>
    <header className="w-full border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className='w-36'>
          <img src={logo} width={120} height={20} alt="Eventino logo" />
        </Link>
        {isLoggedIn && (
          <div className='md:flex-between hidden w-full max-w-xs'>
          <NavItems />
          </div>
        )}
        <div className='flex w-32 justify-end gap-3'>
          {isLoggedIn ? (
            <div className='flex items-center gap-2'>
              <MobileNav handleLogout={handleLogout}/>
              {/* <Avatar>
                <AvatarImage src='https://img.freepik.com/premium-vector/cute-cartoon-cat-profile-avatar_1177872-8.jpg' />
                <AvatarFallback>EN</AvatarFallback>
              </Avatar> */}
              {/* <Button onClick={handleLogout} className='rounded-full p-4' size='lg'>Logout</Button> */}
            </div>
          ) : (
            <Link to='/login'>
              <Button className='rounded-full p-4' size='lg'>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;