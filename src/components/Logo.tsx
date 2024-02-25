import "./Logo.css";

interface LogoArgs {
  className?: string;
  inGreyScale: boolean,
  onClick: () => void
}

export default function Logo({ className = '', inGreyScale, onClick }: LogoArgs) {
  return (
    <button
      className={`logo centerScreen ${className}`}
      onClick={onClick}
    >
      <img
        src="face.jpeg"
        alt="Noise! Noise! Noise! Face!"
        className={`${inGreyScale && 'grey'}`}
      />
    </button>
  );
}
