import "./Logo.css";

interface LogoArgs {
  active: boolean,
  onClick: () => void
}

export default function Logo({ active, onClick }: LogoArgs) {
  return (
    <button
      className={"logo centerScreen"}
      onClick={onClick}
    >
      <img
        src="face.jpeg"
        alt="Noise! Noise! Noise! Face!"
        className={active ? 'grey': ''}
      />
    </button>
  );
}
