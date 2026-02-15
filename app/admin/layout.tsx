import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mutz-shell">
            <div className="relative md:flex">
                <aside className="md:h-screen md:w-80 border-r border-[#2A2A2A] bg-black/70 backdrop-blur-sm">
                    <AdminSidebar />
                </aside>

                <main className="md:h-screen md:flex-1 md:overflow-y-scroll p-5 lg:p-8">
                    {children}
                </main>
            </div>

            <ToastNotification />
        </div>
    )
}
