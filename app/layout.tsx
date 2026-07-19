import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
});

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Próximo Passo - Seu guia para os momentos mais importantes da vida",
  description:
    "Receba orientação personalizada para abrir empresa, comprar imóvel, aposentadoria, inventário, casamento, documentos, benefícios e muito mais.",
  keywords: [
    "orientação de vida",
    "guia completo",
    "abrir empresa",
    "comprar casa",
    "inventário",
    "casamento",
    "aposentadoria",
  ],
  authors: [{ name: "Próximo Passo" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://proximopasso.com.br",
    siteName: "Próximo Passo",
    title: "Próximo Passo - Seu guia para os momentos mais importantes da vida",
    description:
      "Receba orientação personalizada para os eventos mais importantes da sua vida.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body
        className={`${inter.variable} ${newsreader.variable} bg-slate-50 text-slate-900 dark:bg-dark-bg dark:text-dark-text min-h-screen antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
