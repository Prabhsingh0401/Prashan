"use client";
import { usePathname } from "next/navigation";
import DashboardLayoutWrapper from "../components/layouts/DashboardLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCreatePage = pathname === "/dashboard/create";

  if (isCreatePage) {
    return <>{children}</>;
  }

  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
