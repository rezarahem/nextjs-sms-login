'use client';

import { CheckEmailAction } from '@/actions/CheckEmailAction';
import { OTP } from '@/actions/sms';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';

export default function LoginPage() {
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState('');
  const [isVCode, setIsVCode] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const checkEmail = async (data: FieldValues) => {
    setIsSubmitting(true);

    const { phoneNumber } = data;

    const res = await CheckEmailAction(phoneNumber);

    if (!res) return;

    reset();
    setIsStepTwo(true);
    const otp = await OTP(phoneNumber);
    setIsPhoneNumber(phoneNumber);
    setIsVCode(otp.data.code);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const verifyCode = (data: FieldValues) => {
    const { uCode } = data;
    const phone = isPhoneNumber;
    const verification = uCode === isVCode;
    
    if (!verification) return null;

    signIn('credentials', {
      phone,
      callbackUrl: '/',
    });
    reset();

    // setIsStepTwo(true);
    // console.log('verifyCode');
  };

  return (
    <form
      onSubmit={handleSubmit(isStepTwo ? verifyCode : checkEmail)}
      className='flex flex-col justify-center items-center gap-y-3 pt-36'
    >
      {isStepTwo ? (
        <input
          {...register('uCode', {
            required: 'کد احراز را وارد کنید',
          })}
          type='text'
          placeholder='کد احراز'
          className='border-2 border-cyan-950 w-1/5 rounded px-3 py-1'
        />
      ) : (
        <input
          {...register('phoneNumber', {
            required: 'لطفا شماره خود را وارد کنید',
          })}
          type='text'
          placeholder='شماره تلفن'
          className='border-2 border-cyan-950 w-1/5 rounded px-3 py-1'
        />
      )}
      {errors.phomeNumber && (
        <p className='text-red-500'>{`${errors.phomeNumber.message}`}</p>
      )}
      <button
        disabled={isSubmitting}
        className=' bg-blue-500 w-1/5 rounded px-3 py-1 text-white disabled:cursor-not-allowed'
      >
        {isStepTwo ? (
          <span className='flex justify-center items-center gap-3'>
            ثبت کد
            {isSubmitting && <CgSpinner className='animate-spin' />}
          </span>
        ) : (
          <span className='flex justify-center items-center gap-3'>
            ورود
            {isSubmitting && <CgSpinner className='animate-spin' />}
          </span>
        )}
      </button>
    </form>
  );
}
