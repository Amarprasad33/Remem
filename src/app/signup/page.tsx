"use client"
import { useRouter } from 'next/navigation';
import { login, signup } from '../../actions/auth.actions';
import SignupForm from '@/components/forms/signup-form';

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="bg-white inset-0 flex justify-center items-center min-h-screen" >
            <div className="form-container mx-auto mt-30 bg-white border border-gray-300  w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[25rem] px-6 py-8 my-14 rounded-xl">
                <div className="space-y-2 text-center mb-4">
                    <h1 className="text-2xl font-semibold text-black tracking-tight">Create Your Account.</h1>
                    <p className="text-sm text-gray-400">Enter your detals to get started.</p>
                </div>
                <div className="flex flex-col items-center">
                    <SignupForm />
                    {/* <form className='flex flex-col gap-4'>
                        <label htmlFor="name">Name:</label>
                        <input className='outline-1 outline-neutral-700 p-4 rounded-xl' id="name" name="name" type="name" required />
                        <label htmlFor="email">Email:</label>
                        <input className='outline-1 outline-neutral-700 p-4 rounded-xl' id="email" name="email" type="email" required />
                        <label htmlFor="password">Password:</label>
                        <input className='outline-1 outline-neutral-700 p-4 rounded-xl' id="password" name="password" type="password" required />
                        <button className='px-6 py-2 bg-slate-400' formAction={signup}>Sign up</button>
                    </form> */}
                    <div className='flex gap-2 mt-6'>
                        <span>Already have an account?</span>
                        <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => router.push("/signin")}>Sign In</span>
                    </div>
                </div>
            </div>
        </div>
    )
}