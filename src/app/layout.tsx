import { SessionAuthProvider } from "@/components/SessionAuth";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoPRO - Sistema de Gestão Odontológica",
  description:
    "OdontoPRO é um sistema de gestão odontológica completo, projetado para otimizar o agendamento de consultas, gerenciamento de pacientes, controle financeiro e muito mais. Com uma interface intuitiva e recursos avançados, o OdontoPRO é a escolha ideal para clínicas odontológicas que buscam eficiência e excelência no atendimento ao paciente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>{children}</SessionAuthProvider>
      </body>
    </html>
  );
}
