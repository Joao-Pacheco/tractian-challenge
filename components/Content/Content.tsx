import { Props } from "@/utils/types/props";

export default function ContentHeader({ children }: Props) {
  return <div className="flex h-full w-full justify-around">{children}</div>;
}
