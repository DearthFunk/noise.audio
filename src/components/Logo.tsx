interface LogoArgs {
  inGreyScale: boolean,
  toggleSound: () => void
}

function Logo({inGreyScale, toggleSound}: LogoArgs) {
  return (
    <button
      onClick={() => toggleSound()}
    >
      <img
        src="face.jpeg"
        alt="Noise! Noise! Noise! Face!"
        className={inGreyScale ? "grey" : ""}
      />
    </button>
  );
}

export default Logo;
