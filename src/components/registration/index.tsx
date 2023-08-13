"use client";

import { useState } from "react";

interface CheckingUserProps {
  children: React.ReactNode[];
}

function Registration(props: CheckingUserProps) {
  const [isLoggedIn, setIsUserLogged] = useState(false);
  return (
    <div className="width-full bg-c">
      {isLoggedIn ? (
        <div className="bg-c">
          {/* if there is user */}
          {props.children[1]}
        </div>
      ) : (
        <div className="bg-c">{props.children[0]}</div>
      )}
    </div>
  );
}

export default Registration;
