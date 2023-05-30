import { useState } from "react";

function Logo() {
  const [soundIsOn, setSoundIsOn] = useState(false);

  return (
    <button
      onClick={() => {
        setSoundIsOn(!soundIsOn);
      }}
    >
      <img
        src="face.jpeg"
        alt="Noise! Noise! Noise! Face!"
        className={soundIsOn ? "" : "grey"}
      />
    </button>
  );
}

export default Logo;
