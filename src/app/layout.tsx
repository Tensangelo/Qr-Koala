import type { Metadata } from "next";
import { Nokora, Montserrat } from "next/font/google";
// Styles
import "@styles/globals.css";
// Components
import { Toaster } from "@components/ui/sonner";
import { AuthProvider } from "@contexts/authContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const nokora = Nokora({
  variable: "--font-geist-nokora",
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dashboard - QR Koala",
  description: "Genera tus códigos QR fácilmente con QR Koala",
  keywords: ["QR", "generador", "códigos QR", "QR Koala", "crear QR", "QR personalizado"],
  authors: [
    {
      name: "Angelo Gaona | Desarrollador Fullstack",
      url: "https://portfolio-ang.vercel.app/"
    }
  ],
  creator: "Tu Nombre",
  icons: {
    icon: "/images/qr_koala_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nokora.variable}`}>
      <body className="antialiased flex bg-[#f6f5f4]">
        <AuthProvider>
            {children}
            <Toaster richColors position="top-right" duration={Infinity} closeButton={true} />
        </AuthProvider>
      </body>
    </html>
  );
}
