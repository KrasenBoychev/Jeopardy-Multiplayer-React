export default function NotificationsHeader({ notificationsProps }) {
  const { isSuccess, isError, notifications } = notificationsProps;

  let content;
  if (isSuccess) {
    content = (
      <div
        className={`flex-1 text-[12px] font-bold cursor-pointer max-[1600px]:text-[10px] max-[1400px]:text-[8px] ${
          notifications?.length > 0 ? "text-destructive" : "text-white"
        }`}
      >
        {isSuccess && notifications?.length}
        {isError && "!"}
      </div>
    );
  }

  return content;
}
