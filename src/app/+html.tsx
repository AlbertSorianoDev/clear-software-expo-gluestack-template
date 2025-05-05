// app/+html.tsx
import { ScrollViewStyleReset } from "expo-router/html";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <ScrollViewStyleReset />

        <link rel="icon" href="@/assets/favicon.png" />
        <title>Expo App</title>
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">{children}</body>
    </html>
  );
}
