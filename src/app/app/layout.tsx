export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav className="flex w-full items-center justify-between p-4">
                <img src="/static/logot.png" alt="logo" className="h-16" />
                <button>
                    <span className="material-symbols-outlined text-3xl">
                        menu
                    </span>
                </button>
            </nav>
            <main>{children}</main>
        </div>
    );
}