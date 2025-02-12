import { Props } from "@/utils/types/props";

export default function Content({ children }: Props) {
  return (
    <div className="flex h-full w-full justify-around max-h-[94%]">
      {children}
    </div>
  );
}
