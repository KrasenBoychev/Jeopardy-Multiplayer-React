import { notifTypes } from "./notificationsType";
import AcceptNotification from "./actions/AcceptNotification";
import ReadNotification from "./actions/ReadNotification";
import RejectNotification from "./actions/RejectNotification";

export default function NotificationsBody({ notificationsProps }) {
  const { isSuccess, isError, notifications } = notificationsProps;

  let content = (
    <div className="absolute max-w-max top-[63px] right-[70px] py-3 px-2 bg-white rounded-md max-[1600px]:top-[55px] max-[1600px]:right-[60px] max-[1400px]:top-[50px] max-[1400px]:right-[50px] shadow-lg z-30">
      {isSuccess && notifications.length > 0 ? (
        <ul className="custom-scroll-container max-h-[150px] overflow-auto h-auto flex flex-col gap-3 px-2">
          {notifications.map((notification, index) => {
            return (
              <li
                key={notification.type + notification.sentBy + index}
                className="flex justify-between items-center gap-3 p-2 bg-[#00000020] rounded-md"
              >
                <p className="w-max text-[18px] max-[1800px]:text-[16px] max-[1600px]:text-[14px] max-[1400px]:text-[12px]">
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
        <p className="w-max text-[18px] max-[1800px]:text-[16px] max-[1600px]:text-[14px] max-[1400px]:text-[12px]">
          There are no notifications at the moment
        </p>
      )}
      {isError && (
        <p className="w-max text-[18px] max-[1800px]:text-[16px] max-[1600px]:text-[14px] max-[1400px]:text-[12px]">
          Cannot load notifications!
        </p>
      )}
    </div>
  );

  return content;
}
