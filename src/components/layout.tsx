import React from "react";

//I would usually make a defualt Layout with css, grid, bootstrap etc. but simple inline for this to give us margin
//here I would put in LayoutProps and pass a header, footer and such
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <div style={{ margin: "auto", maxWidth: "1280px", marginTop: "50px" }}>
        <h1>Inbox Ready Team .. Ready? ...</h1>
        <div>{children}</div>
      </div>
    </>
  );
}
