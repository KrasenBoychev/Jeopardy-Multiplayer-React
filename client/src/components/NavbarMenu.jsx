"use client";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, MenuItemLink } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authentication/authSlice";
import Notifications from "../features/notifications/Notifications";
import { adminId } from "../app/credentials";

export function NavbarMenu() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const user = useSelector(selectCurrentUser);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItemLink to="/">Home</MenuItemLink>

        <MenuItemLink to="/about">About</MenuItemLink>
        {user ? (
          <>
            <div className="flex items-start gap-1 ">
              <MenuItemLink to="/play">Play</MenuItemLink>
              <Notifications />
            </div>
            {user.userId == adminId && (
              <MenuItemLink to="/create">Create</MenuItemLink>
            )}
            <MenuItemLink to="/logout">Logout</MenuItemLink>
          </>
        ) : (
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink to="/login">Login</HoveredLink>
              <HoveredLink to="/register">Register</HoveredLink>
            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
