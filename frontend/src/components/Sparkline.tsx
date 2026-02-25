type Props = {
  data: number[];
  stroke?: string;
};

export default function Sparkline({ data, stroke = "var(--accent)" }: Props) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data, 1);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" width="100%" height="48" aria-hidden="true">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
