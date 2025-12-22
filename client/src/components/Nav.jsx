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
          <House width={25} height={25} color="white" />
        </MenuItemLink>

        <Notifications />

        {user.userId == adminId && (
          <MenuItemLink to="/create">
            <BadgePlus />
          </MenuItemLink>
        )}
        <MenuItemLink to="/logout">
          <LogOut width={25} height={25} color="white" />
        </MenuItemLink>
      </Menu>
    </div>
  );
}
