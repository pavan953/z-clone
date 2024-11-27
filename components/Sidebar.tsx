'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import '@/styles/github-them.css'; // Properly imported the CSS file

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  // State to control sidebar's open/close animation
  const [isOpen, setIsOpen] = React.useState<boolean>(false); // Specify the type for state

  return (
    <motion.section
      className={cn(
        'sticky left-0 top-0 flex h-screen flex-col justify-between p-6 pt-28 bg-[#0d1117] text-[#c9d1d9] max-md:hidden', // Primary color as background
        { 'lg:w-[60px]': !isOpen, 'lg:w-[264px]': isOpen }
      )}
      animate={{
        width: isOpen ? '264px' : '80px',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start',
                { 'bg-[#212933] border-4 border-blue-500  glow-effect hover:shadow-lg hover:border-blue-200 ': isActive } // Lighter background for active state
              )}
            >
              {/* Icons are always visible */}
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className='text-[#c9d1d9]' // Changed text color to black for better contrast
              />
              {/* Text is hidden unless sidebar is open */}
              <p
                className={cn(
                  'text-lg font-semibold max-md:hidden transition-opacity duration-300',
                  {
                    'opacity-100': isOpen,
                    'opacity-0': !isOpen,
                  }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Sidebar;