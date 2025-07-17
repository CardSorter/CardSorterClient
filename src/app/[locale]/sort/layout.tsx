import React from "react";
import "app/[locale]/sort/sorter.scss";

export default function Layout({children}: {children: React.ReactNode}) {

  return (
    <>{children}</>
  );
}