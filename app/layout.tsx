import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { Providers } from "../components/providers";


const geist = Geist({
                        subsets: [ "latin" ],
                        variable: "--font-geist",
                    });

const geistMono = Geist_Mono({
                                 subsets: [ "latin" ],
                                 variable: "--font-geist-mono",
                             });

const cairo = Cairo({
                        subsets: [ "arabic" ],
                        variable: "--font-cairo",
                    });

export default async function RootLayout( { children, params } ) {
    const { locale } = await params;
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
        <body className={`${geist.variable} ${geistMono.variable} ${cairo.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}