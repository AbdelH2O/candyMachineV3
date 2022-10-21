import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head >
        <script>
            window.global = window;
        </script>
      </Head>
      <body className="bg-neutral-900 h-screen w-screen flex justify-center items-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
};