// components/forms/signin-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signinFormSchema, SigninSchemaType } from '@/lib/schema/atuhSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';
// import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { MultiSelect } from '../ui/multi-select';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { login } from '@/actions/auth.actions';

// type EV = {
//     brand: string;
//     model: string;
//     battery_capacity_kWh: number;
// }

export default function SigninForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    //   const { toast } = useToast();
    const router = useRouter();

    const form = useForm<SigninSchemaType>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });



    const togglePassword = () => setPasswordVisible(!passwordVisible);

    async function onSubmit(data: SigninSchemaType) {
        try {
            console.log("submit-data", data);

            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);
            const response = await login(formData);
            console.log('response', response);
            // if (response.status === 200) {
            //     toast("Signup successful. Welcome!")
            //     router.push('/');
            // } else {
            //     throw new Error('Signup failed');
            // }
        } catch (error: unknown) {
            toast("Signin failed", {
                description: 'Something went wrong!',
                action: {
                    label: "OK!",
                    onClick: () => console.log("Undo"),
                },
            });

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 items-center w-[85%]">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" type="email" {...field} />
                            </FormControl>
                            <FormDescription>We&apos;ll never share your email.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    {...field}
                                />
                            </FormControl>
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-8 text-sm text-muted-foreground"
                            >
                                {passwordVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            </button>
                            <FormDescription>
                                Must be at least 8 characters
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Sign In
                </Button>

            </form>
        </Form>
    );
}