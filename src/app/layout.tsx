import "./globals.css";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import Text from "../components/text"
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
        <Text/>
        <Footer />
      </body>
    </html>
  );
}
