import { useGetUserPointsQuery } from "./homePageApiSlice";

export default function UserPoints() {
  const {
    data: points,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserPointsQuery("getUserPoints", {
    refetchOnMountOrArgChange: true,
  });
  return (
    <p
      className={`shadow-lg shadow-chart-4 text-2xl max-w-xl mt-6 text-center uppercase bg-black p-3 rounded-lg max-[1800px]:text-xl max-[1600px]:text-lg max-[1400px]:text-sm ${
        isError ? "text-destructive" : "text-white"
      }`}
    >
      {isLoading && "Loading points..."}
      {isSuccess && `${points} game points`}
      {isError && "Failed to load points"}
    </p>
  );
}
