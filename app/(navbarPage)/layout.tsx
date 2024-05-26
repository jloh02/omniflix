import NavigationBar from "@/components/navigationBar/NavigationBar";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
