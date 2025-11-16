import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/Navbar";
import "./globals.css";
import { GlobalProvider } from "./lib/globalState";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // was {true}
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GlobalProvider>
          <Navbar />
          {children}
          <ToastContainer position="top-center" />
        </GlobalProvider>
      </body>
    </html>
  );
}
