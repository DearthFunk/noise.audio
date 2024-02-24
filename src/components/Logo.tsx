interface LogoArgs {
  inGreyScale: boolean,
  toggleSound: () => void
}

function Logo({inGreyScale, toggleSound}: LogoArgs) {
  return (
    <button
      className="logo centerScreen"
      onClick={() => toggleSound()}
    >
      <img
        src="face.jpeg"
        alt="Noise! Noise! Noise! Face!"
        className={inGreyScale ? "grey" : ""}
      />
      <div>{inGreyScale ? 'oN!' : 'oFf?'}</div>
    </button>
  );
}

export default Logo;
