interface LogoArgs {
  soundIsOn: boolean,
  toggleSound: (val: boolean) => void
}

function Logo({soundIsOn, toggleSound}: LogoArgs) {
  return (
    <button
      onClick={() => {
        toggleSound(!soundIsOn);
      }}
    >
      <img
        src="face.jpeg"
        alt="Noise! Noise! Noise! Face!"
        className={soundIsOn ? "grey" : ""}
      />
    </button>
  );
}

export default Logo;
