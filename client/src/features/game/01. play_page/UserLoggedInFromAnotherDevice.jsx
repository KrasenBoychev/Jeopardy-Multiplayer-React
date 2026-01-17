export default function UserLoggedInFromAnotherDevice() {
  return (
    <div className="flex-1 flex flex-col bg-[url(room.png)] bg-cover bg-center">
      <div className="flex-1 content-center justify-center  bg-[#00000090]">
        <div className="w-fit m-auto flex flex-col gap-10 p-10 text-white text-center font-bold rounded-md shadow-[inset_0_0_15px_orange]">
          <p className="text-[40px]  max-[1600px]:text-[30px]">
            You are logged in from another device. Please logout and try again.
          </p>
          <button
            className="text-[30px] uppercase underline cursor-pointer hover:text-chart-2 max-[1600px]:text-[20px]"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
