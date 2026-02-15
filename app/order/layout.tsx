import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return(
        <div className="mutz-shell">
            <div className="relative md:flex">
                <OrderSidebar />

                <main className="md:h-screen md:flex-1 md:overflow-y-scroll p-5 lg:p-8">
                    {children}
                </main>

                <OrderSummary />
            </div>

            <ToastNotification />
        </div>
    )

  }
