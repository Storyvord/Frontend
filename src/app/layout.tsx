import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import { SideBarContextProvider } from "@/contexts/SideBarContext";
import { ProjectContextProvider } from "@/contexts/ProjectContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: '400',
subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className='w-full min-h-screen bg-[#eceff180] relative'>
          
            <SideBarContextProvider>
              <ProjectContextProvider>
                <SideBar/>
                <div className="p-4 lg:ml-80">
                  <NavBar/>
                  {children}
                </div>
              </ProjectContextProvider>
            </SideBarContextProvider> 
          
        </div>
      </body>
    </html>
  );
}
