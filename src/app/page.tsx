import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // console.log("user--", user)

  if (!user) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-zinc-200">
        <div className="rounded-md bg-white p-6 shadow">
          <p className="text-zinc-700">You are not authenticated.</p>
          <div className="mt-4">
            <Link
              href="/signin"
              className="text-blue-600 underline hover:text-blue-500"
            >
              Sign in
            </Link>
            <span className="mx-2 text-zinc-400">or</span>
            <Link
              href="/signup"
              className="text-blue-600 underline hover:text-blue-500"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const name = (user.user_metadata && (user.user_metadata.name || user.user_metadata.full_name)) || "";
  const email = user.email || user.user_metadata?.email || "";

  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-100">
      <div className="rounded-md w-fit mt-30 bg-white p-6 shadow space-y-2">
        <h1 className="text-xl font-semibold">Welcome{name ? `, ${name}` : ""}!</h1>
        <p className="text-zinc-700">User ID: {user.id}</p>
        {email ? <p className="text-zinc-700">Email: {email}</p> : null}
        <form action="/api/auth/signout" method="post" className="pt-2">
          {/* Optional: use your existing logout action instead */}
        </form>
      </div>
    </div>
  );
}
