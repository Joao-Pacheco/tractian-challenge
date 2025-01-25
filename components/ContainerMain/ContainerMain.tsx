import { Props } from "@/utils/types/props";

export default function ContainerMain({ children }: Props) {
  return (
    <div className="shadow-md bg-white m-3 rounded-sm block p-3">
      {children}
    </div>
  );
}
