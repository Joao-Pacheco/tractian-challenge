export const getStatusColor = (status: string | null) => {
  if (status === "operating") return "text-green-500";
  if (status === "alert") return "text-red-500";
  return "text-gray-400";
};
