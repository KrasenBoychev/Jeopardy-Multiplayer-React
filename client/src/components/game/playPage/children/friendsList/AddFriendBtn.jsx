import { toast } from "react-hot-toast";
import { sendFriendRequest } from "../../../../../../api/friends-api";
import { useAuthContext } from "../../../../../contexts/AuthContext";

export default function AddFriendBtn({ addFriendUsername, socket, friendsList, setAddFriendUsername }) {
    const { username } = useAuthContext();

    const sendFriendInvitation = async () => {
        if (!addFriendUsername.trim()) {
            return;
        } else if (addFriendUsername == username) {
            toast.error('Cannot add yourself');
            return;
        }

        let isUsernameInFriendList = false;
        friendsList.forEach(friend => {
            if (friend.username == addFriendUsername) {
                toast.error(addFriendUsername + ' is in your Friends List');
                isUsernameInFriendList = true;
                return;
            }
        });

        if (isUsernameInFriendList) {
            return;
        }

        try {
            const friendCheckResponse = await sendFriendRequest(addFriendUsername); 

            if (friendCheckResponse.status == 'success') {
                toast.success(friendCheckResponse.msg);

            } else if (friendCheckResponse.status == 'error') {
                toast.error(friendCheckResponse.msg);

            } else if (friendCheckResponse.status == 'send invitation') {
                await socket.emit("sendNotification", {
                    receiverSocketId: friendCheckResponse.socketId,
                });
                toast.success(friendCheckResponse.msg);

                setAddFriendUsername('');
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <button onClick={sendFriendInvitation}>Add Friend</button>
    );
}