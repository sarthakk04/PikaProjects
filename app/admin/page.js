// app/shop/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Admin from "../../components/admin/Admin";

export const metadata = {
  title: "Shop - PikaProjects",
  description: "Browse and purchase amazing projects from our marketplace",
};

export default function ShopPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token");

  // 🔑 Validate token — replace with actual logic
  const isValid = token?.value === "your_secret_admin_token";

  if (!isValid) {
    redirect("/adminlog");
  }

  return <Admin />;
}
