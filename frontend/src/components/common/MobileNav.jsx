import React from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from "../ui/separator"
import NavItems from './NavItems';
import { Button } from '../ui/button';
import { useMediaQuery } from 'react-responsive';

const MobileNav = ({ handleLogout }) => {
    const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  return (
    <nav>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <Avatar>
            <AvatarImage src='https://img.freepik.com/premium-vector/cute-cartoon-cat-profile-avatar_1177872-8.jpg' />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[540px] flex flex-col gap-6 bg-white">
        <SheetTitle><strong>Nav Bar</strong></SheetTitle>
        <Separator />
        {isMobileOrTablet && <NavItems />}
        <Button onClick={handleLogout} className='rounded-md p-4' size='lg'>Logout</Button>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;