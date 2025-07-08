import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { CartProvider } from "./context/CartProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resina Jewellery",
  description: "Elegant resin jewellery collection",
};

// const CartProvider = dynamic(() => import("./context/CartProvider").then(mod => mod.CartProvider), {
//   ssr: false, // Disable server-side rendering for CartProvider
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
        </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { CartProvider } from "./context/CartProvider";
// import Footer from "./components/footer";

// export const metadata: Metadata = {
//   title: "Resina Jewellery",
//   description: "Elegant resin jewellery collection",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <CartProvider>
//           {children}
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

