import "./globals.css";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
