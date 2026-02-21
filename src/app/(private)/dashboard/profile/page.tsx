import { redirect } from "next/navigation";

import getSession from "@/lib/getSession";

import { getUserData } from "./_data-access/get-user-data";

import { ProfileContent } from "./_components/ProfileContent";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({ userId: session.user.id });

  if (!user) {
    redirect("/");
  }

  return <ProfileContent user={user} />;
}
