import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Header from "../components/Header";
export const metadata={title:"SpideyDelivery.in",description:"Snacks at super speed"};
export default function RootLayout({children}){return <html lang="en"><body><CartProvider><Header/><main>{children}</main></CartProvider></body></html>}