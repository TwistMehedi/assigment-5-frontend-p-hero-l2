import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = { role: "provider" };

  if (user.role === "admin") {
    redirect("/dashboard/admin");
  } else if (user.role === "provider") {
    redirect("/dashboard/provider");
  } else {
    redirect("/dashboard/user");
  }

  return null;
}
