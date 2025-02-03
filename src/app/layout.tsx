import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import ParallaxDemo from "./components/parallax"
import Text from "./components/text"
export default function RootLayout({
  // children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation/>
        <ParallaxDemo/>
        <Text/>
        <Footer />
      </body>
    </html>
  );
}
