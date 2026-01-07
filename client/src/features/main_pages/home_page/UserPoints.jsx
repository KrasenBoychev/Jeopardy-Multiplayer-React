import { useGetUserPointsQuery } from "./homePageApiSlice";

export default function UserPoints() {
  const {
    data: points,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserPointsQuery("getUserPoints");
  return (
    <p
      className={`shadow-lg shadow-chart-4 text-sm md:text-2xl max-w-xl mt-6 text-center uppercase bg-black p-3 rounded-lg ${
        isError ? "text-destructive" : "text-white"
      }`}
    >
      {isLoading && "Loading points..."}
      {isSuccess && `${points} game points`}
      {isError && "Failed to load points"}
    </p>
  );
}
