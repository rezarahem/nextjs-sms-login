import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { NoUser, ThereIsUser } from './HomePageComponents';

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  if (!session) return <NoUser />;

  return <ThereIsUser />;
}

// 'use client';

// import { OTP, advanceSms, simpleSms } from '@/actions/sms';

// export default function HomePage() {
//   const handleOtp = async () => {
//     const res = await OTP();
//     console.log(res);
//   };

//   const handleSimple = async () => {
//     const res = await simpleSms();
//     console.log(res);
//   };

//   const handleAdvance = async () => {
//     const res = await advanceSms();
//     console.log(res);
//   };

//   return (
//     <main className='flex justify-center items-center h-80 gap-x-3'>
//       <button
//         className='bg-blue-500 px-12 py-2 rounded text-white'
//         onClick={handleOtp}
//       >
//         OTP
//       </button>
//       <button
//         className='bg-blue-500 px-12 py-2 rounded text-white'
//         onClick={handleSimple}
//       >
//         ساده
//       </button>
//       <button
//         className='bg-blue-500 px-12 py-2 rounded text-white'
//         onClick={handleAdvance}
//       >
//         پیشرفته
//       </button>
//     </main>
//   );
// }
