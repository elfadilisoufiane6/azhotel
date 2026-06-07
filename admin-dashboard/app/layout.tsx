import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { Topbar }  from "@/components/Topbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AZ Hôtel · Admin Dashboard",
  description: "Operator dashboard for AZ Hôtel des Arts.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
