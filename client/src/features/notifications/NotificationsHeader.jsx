export default function NotificationsHeader({ notificationsProps }) {
  const { isSuccess, isError, notifications } = notificationsProps;

  let content;
  if (isSuccess) {
    content = (
      <div
        className={`absolute top-0 right-0 text-[12px] font-bold cursor-pointer ${
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
