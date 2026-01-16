"use client";
import { Menu, MenuItemLink } from "./ui/navbar-menu";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authentication/authSlice";
import Notifications from "../features/notifications/Notifications";
import { adminId } from "../app/credentials";
import { House, LogOut, BadgePlus } from "lucide-react";

export default function Nav() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="absolute top-0 right-0 z-20">
      <Menu>
        <MenuItemLink to="/">
          <House
            width={25}
            height={25}
            color="white"
            className="max-[1600px]:w-[20px] max-[1600px]:h-[20px] max-[1400px]:w-[15px] max-[1400px]:h-[15px]"
          />
        </MenuItemLink>

        {user.userId == adminId && (
          <MenuItemLink to="/create">
            <BadgePlus
              width={25}
              height={25}
              color="white"
              className="max-[1600px]:w-[20px] max-[1600px]:h-[20px] max-[1400px]:w-[15px] max-[1400px]:h-[15px]"
            />
          </MenuItemLink>
        )}

        <Notifications />

        <MenuItemLink to="/logout">
          <LogOut
            width={25}
            height={25}
            color="white"
            className="max-[1600px]:w-[20px] max-[1600px]:h-[20px] max-[1400px]:w-[15px] max-[1400px]:h-[15px]"
          />
        </MenuItemLink>
      </Menu>
    </div>
  );
}
