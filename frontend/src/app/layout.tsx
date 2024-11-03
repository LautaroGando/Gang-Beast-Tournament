import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/HeaderComponents/Header/Header";
import { MenuProvider } from "@/context/MenuContext/MenuContext";
import Footer from "@/components/FooterComponents/Footer/Footer";
import { UserProvider } from "@/context/UserContext/UserContext";

export const metadata: Metadata = {
  icons: {
    icon: 'https://www.speedrun.com/static/game/pdv4qrdw/cover.png?v=7cb6cdf'
  },
  title: "Gang Beast 🏆",
  description: "Bienevenid@s al torneo de Gang Beast.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (

    <html lang="es">
      <body>
        <UserProvider>
          <MenuProvider>
            <Header />
            {children}
            <Footer />
          </MenuProvider>
        </UserProvider>
      </body>
    </html>

  );

};