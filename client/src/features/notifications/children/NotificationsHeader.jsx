export default function NotificationsHeader({ notificationsProps }) {
  const { isSuccess, isError, notifications } = notificationsProps;

  let content;
  if (isSuccess) {
    content = (
      <div
        className={`notifications_header ${
          notifications?.length > 0 && "notifications_unread"
        }`}
      >
        {isSuccess && notifications?.length}
        {isError && "!"}
      </div>
    );
  }

  return content;
}
