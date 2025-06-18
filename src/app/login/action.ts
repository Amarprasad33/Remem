'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, ...res } = await supabase.auth.signInWithPassword(data)
  console.log("res", res);
  console.log("error", error)
  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  })
  console.log("erro=- signup", error)
  if (error) {
    redirect('/error')
  }
  console.log("data-signup--", data);
  // Save name into 'profiles' table manually
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user.id, // match auth user id
        name,
        email,
      },
    ])
    if (profileError) {
      console.error("Error creating profile:", profileError)
      redirect('/error')
    }
  }
  console.log("success")
  revalidatePath('/', 'layout')
  redirect('/')
}