import { notifTypes } from "./notificationsType";
import AcceptNotification from "./actions/AcceptNotification";
import ReadNotification from "./actions/ReadNotification";
import RejectNotification from "./actions/RejectNotification";

export default function NotificationsBody({ notificationsProps }) {
  const { isSuccess, isError, notifications } = notificationsProps;

  let content = (
    <div className="absolute max-w-max top-[63px] right-[70px] py-3 px-2 bg-white rounded-md">
      {isSuccess && notifications.length > 0 ? (
        <ul className="custom-scroll-container max-h-[150px] overflow-auto h-auto flex flex-col gap-3 px-2">
          {notifications.map((notification, index) => {
            return (
              <li
                key={notification.type + notification.sentBy + index}
                className="flex justify-between items-center gap-3 p-2 bg-[#00000020] rounded-md"
              >
                <p className="w-max">
                  <span className="font-bold">{notification.sentBy}</span>
                  {notifTypes[notification.type].content}
                </p>
                <div className="flex gap-1">
                  {notifTypes[notification.type].btns == "Accept/Reject" ? (
                    <>
                      <AcceptNotification notification={notification} />
                      <RejectNotification notification={notification} />
                    </>
                  ) : (
                    <ReadNotification notification={notification} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="w-max">There are no notifications at the moment</p>
      )}
      {isError && <p className="w-max">Cannot load notifications!</p>}
    </div>
  );

  return content;
}
