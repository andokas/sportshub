import { getFlagCode } from "@/lib/f1/flags";

export default function Flag({
  nationality,
  className = "",
}: {
  nationality: string;
  className?: string;
}) {
  const code = getFlagCode(nationality);
  if (!code) return null;

  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={20}
      height={15}
      alt={nationality}
      title={nationality}
      className={`inline-block h-[15px] w-5 shrink-0 rounded-[2px] object-cover ${className}`}
    />
  );
}