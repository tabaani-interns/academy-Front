import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tabaani Academy",
  description: "E-learning application",
};

export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
