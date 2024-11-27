import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-[#0d1117] fix ed z-50 w-full px-6 py-3 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/Video.svg"
          width={32}
          height={32}
          alt="Sky-hub logo"
          className="max-sm:w-10 max-sm:h-10"
        />
        <div className='flex'>
          <p className="text-[26px] font-extrabold text-sky-400 max-sm:hidden hover:text-blue-100 glow-effect">
            Sky-Hub
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
