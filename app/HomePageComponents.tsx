'use client';

import Link from 'next/link';
import { BiSolidErrorCircle } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { signOut } from 'next-auth/react';

export const NoUser = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-8'>
      <div className='flex justify-center items-center gap-3 pt-36 text-2xl font-semibold'>
        ابتدا وارد شوید
        <BiSolidErrorCircle className='text-red-600' />
      </div>
      <Link
        href='/login'
        className='bg-green-500 text-white w-1/5 py-2 rounded text-center'
      >
        ورود
      </Link>
    </div>
  );
};

export const ThereIsUser = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-8'>
      <div className='flex justify-center items-center gap-3 pt-36 text-2xl font-semibold'>
        شما وارد شدید
        <AiFillCheckCircle className='text-green-600' />
      </div>
      <button
        onClick={() => {
          signOut();
        }}
        className='bg-red-500 text-white w-1/5 py-2 rounded'
      >
        خروج
      </button>
    </div>
  );
};
