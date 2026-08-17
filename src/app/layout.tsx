import type { Metadata } from "next";
import { Architects_Daughter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MainContent from "@/components/MainContent";
import { ThemeProvider } from "@/components/ThemeProvider";

// Display font — headings only
const architectsDaughter = Architects_Daughter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

// Body font — all prose, UI, labels, nav
const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Events — Nigeria's #1 Event Planning Company",
  description:
    "Full-service event planning: weddings, corporate events, galas, activations and private celebrations. Your vision, our canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('aura-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${architectsDaughter.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
