import React from "react";

import userdata from "./userdata.json";
import Navbar from "./Navbar";

export default function Account({ userId }) {
  const user = userdata[userId];

  let contactLinks = user.contact.map((contact) =>
    contact.public
      ? React.createElement(
          "li",
          [],
          React.createElement("a", { href: contact.link }, contact.title)
        )
      : null
  );

  console.log(contactLinks);

  return (
    <>
      <Navbar userId={userId}></Navbar>
      <div className="page-wrapper">
        <h1 style={{ lineHeight: "0px" }}>{user.username}</h1>
        <h4 className="txt-gray-400">
          @<span className="fs-xs">&nbsp;</span>
          {user.handle}
        </h4>
        <h2>Contact:</h2>
        <ul>{contactLinks}</ul>
      </div>
    </>
  );
}
