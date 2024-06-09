export default function Layout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <main className="bg-zinc-300 dark:bg-zinc-900 text-black dark:text-white px-3">
            {children}
        </main>
    );
};

