import { redirect } from "next/navigation";

import getSession from "@/lib/getSession";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h2>Dashboard Page</h2>
    </div>
  );
}
