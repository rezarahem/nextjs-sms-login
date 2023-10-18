'use server';

import axios from 'axios';

export async function OTP(phone: string) {
  const res = await axios.post(
    'https://console.melipayamak.com/api/send/otp/8a0ad3e4276344c493ef1abc5c102d16',
    { to: phone }
  );
  const { data, status, statusText } = res;


  return {
    data,
    status,
    statusText,
  };
}

// export async function simpleSms() {
//   const res = await axios.post(
//     'https://console.melipayamak.com/api/send/simple/8a0ad3e4276344c493ef1abc5c102d16',
//     {
//       from: '50004001753061',
//       to: '09384264057',
//       text: 'تلگرام',
//     }
//   );

//   const { data, status, statusText } = res;
//   return {
//     data,
//     status,
//     statusText,
//   };
// }

// export async function advanceSms() {
//   const res = await axios.post(
//     'https://console.melipayamak.com/api/send/advanced/8a0ad3e4276344c493ef1abc5c102d16',
//     {
//       from: '50004001753061',
//       to: ['09384264057', '09903776525'],
//       text: '',
//     }
//   );

//   const { data, status, statusText } = res;
//   return {
//     data,
//     status,
//     statusText,
//   };
// }
