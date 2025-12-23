//import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { LogOut } from "lucide-react";
import Logout from "@/components/ui/Logout";


export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <div className="flex w-full h-full">
        <div className="w-1/6 h-full  flex flex-col   items-center gap-3 bg-gray-50 text-zinc-800 dark:text-zinc-200/90 dark:bg-zinc-700">
          <Link
            className="rounded-md w-2/3 flex  justify-between items-center text-gray-200 dark:bg-zinc-200/10 hover:bg-zinc-200/30 px-3 py-2"
            href={"/dashboard/create-article"}
          >
            <span>Create Article</span> <ArrowRight />
          </Link>
          <Link
            className="rounded-md w-2/3 flex  justify-between items-center text-gray-200 dark:bg-zinc-200/10 hover:bg-zinc-200/30 px-3 py-2"
            href={"/dashboard/image-upload"}
          >
            <span>Create Image URL</span> <ArrowRight />
          </Link>
          <Link
            className="rounded-md w-2/3 flex  justify-between items-center text-gray-200 dark:bg-zinc-200/10 hover:bg-zinc-200/30 px-3 py-2"
            href={"/dashboard/register"}
          >
            <span>Register</span> <ArrowRight />
          </Link>
          <Link
            className="rounded-md w-2/3 flex  justify-between items-center text-gray-200 dark:bg-zinc-200/10 hover:bg-zinc-200/30 px-3 py-2"
            href={"/dashboard/view-database"}
          >
            <span>Database Source</span> <ArrowRight />
          </Link>
        </div>
        {/* border border-zinc-500 */}
        <div className="w-full h-full px-6 py-3">
          <div className="w-full h-15 flex justify-end gap-3">
          
            <Logout />
          </div>
          <h1>
            Welcome
            <span className="text-2xl font-bold text-lime-400">
              {session.user.name}
            </span>
            <br />
            <span className="text-2xl font-bold text-lime-400">
              {session.user.email}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
