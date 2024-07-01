import { useState, useEffect } from "react";

export default function Mark({ gradient, bgcolorhex, intercolor }) {

  const [bgcoloring, setBgColor] = useState(bgcolorhex);

  useEffect(() => {

    if (gradient == true) {

      setBgColor(`linear-gradient(180deg, ${bgcolorhex}, #4f65ff)`);

    } else {

      setBgColor(bgcolorhex);

    }

  }, [gradient, bgcolorhex]);

  return (
    <div
      className="rounded-[16px] m-5 p-2 cursor-default"
      style={{ background: bgcoloring, width: "fit-content" }}
    >
      <div className="flex items-center justify-center">
        <svg
          width="50px"
          className="text-blue-500 bg transparent"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={intercolor}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        <p style={{ fontSize: "auto", color: intercolor }} className="font-bold">
          metablog
        </p>
      </div>
    </div>
  );

}