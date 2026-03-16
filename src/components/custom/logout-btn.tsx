"use client";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/logout";

const LogoutBtn = () => {
  return (
    <Button
      size={"sm"}
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
