export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="mark"
    >
      {/* Aperture ring */}
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {/* Compounding curve */}
      <path
        d="M6 24C11.5 24 13.5 20 15.5 15C17.5 10 19.5 8 26 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      {/* Meridian */}
      <path d="M16 1V31" stroke="currentColor" strokeWidth="1" opacity="0.18" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <Mark />
      <span className="wordmark__text">
        <span className="wordmark__name">PAULMERE</span>
        <span className="wordmark__sub">CAPITAL</span>
      </span>
    </span>
  );
}
