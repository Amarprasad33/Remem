import Sidebar from "@/components/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex">
            <Sidebar />
            <div>
                {children}
            </div>
        </div>
    )
}