// root layout required

import React from "react";
import RootProvider from "./provider";
import "../styles/globals.scss";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
