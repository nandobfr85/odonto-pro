import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/ServicesContent";

export default async function ServicesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <ServicesContent userId={session.user?.id} />;
}
