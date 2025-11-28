import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SIDHU Motors - Premium Car Rentals",
  description: "Experience luxury and comfort with SIDHU Motors. Book premium cars for your next journey.",
  keywords: "car rental, luxury cars, premium vehicles, car booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

