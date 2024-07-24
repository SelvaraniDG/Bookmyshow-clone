import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import logo from '../../assets/images/logo.jpg';
import { authActions } from '../../redux/authSlice';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import Modal from 'react-modal'; // Import react-modal
import Login from '../../auth/Login'; // Import the Login component
import SignUp from '../../auth/SignUp'; // Import the SignUp component
import '../common/Modal.css';

Modal.setAppElement('#root'); // Set app element for accessibility

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  const openLoginModal = () => {
    setIsSignUpModalOpen(false); // Close Sign Up modal if open
    setIsLoginModalOpen(true);
  };

  const openSignUpModal = () => {
    setIsLoginModalOpen(false); // Close Login modal if open
    setIsSignUpModalOpen(true);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
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
              </div>
            ) : (
              <Button onClick={openLoginModal} className='rounded-full p-4' size='lg'>Login</Button>
            )}
          </div>
        </div>
      </header>

      {/* Render SignUp Modal */}
      <Modal
        isOpen={isSignUpModalOpen}
        onRequestClose={closeModals}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <SignUp onClose={closeModals} openLoginModal={openLoginModal} />
      </Modal>

      {/* Render Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeModals}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <Login onClose={closeModals} openSignUpModal={openSignUpModal} />
      </Modal>
    </>
  );
};

export default Header;