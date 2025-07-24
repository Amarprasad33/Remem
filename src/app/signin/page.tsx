"use client"
import { useRouter } from 'next/navigation';
import SigninForm from '@/components/forms/signin-form';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="bg-white inset-0 flex justify-center flex-col items-center min-h-screen" >
      <div className="form-container mx-auto mt-30 bg-white border border-gray-300  w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[25rem] px-6 py-8 rounded-xl">
        <div className="space-y-2 text-center mb-4">
          <h1 className="text-2xl font-semibold text-black tracking-tight">Sign in</h1>
          <p className="text-sm text-gray-400">Enter your detals to log in.</p>
        </div>
        <div className="flex flex-col items-center">
          <SigninForm />
          {/* <div className='min-h-screen w-full flex justify-center items-center'>
            <form className='flex flex-col gap-4'>
              <label htmlFor="email">Email:</label>
              <input className='outline-1 outline-neutral-700 p-4 rounded-xl' id="email" name="email" type="email" required />
              <label htmlFor="password">Password:</label>
              <input className='outline-1 outline-neutral-700 p-4 rounded-xl' id="password" name="password" type="password" required />
              <button className='px-6 py-2 bg-slate-400' formAction={login}>Log in</button>
            </form>
          </div> */}
          <div className='flex gap-2 mt-6'>
            <span>Don&apos;t have an account?</span>
            <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => router.push("/signup")}>Sign Up</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <span>Sign up as a charging station owner</span>
        <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => router.push("/station_signup")}>click here.</span>
      </div>
    </div>
  )
}