"use client";
import { useCallback, useEffect } from "react";
import NavbarWithoutLogin from "./NavbarList/NavbarWithoutLogin";
import useMe from "@/store/me";
import NavbarWithLogin from "./NavbarList/NavbarWithLogin";
import MyTickets from "./my-tickets/MyTickets";

const LandingMyTickets = () => {
  const { user, setUser } = useMe();

  const checkLogin = useCallback(() => {
    if (!user) {
      setUser();
    }
  }, [user, setUser]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <div>
      {user ? <NavbarWithLogin /> : <NavbarWithoutLogin />}
      <main className="min-h-screen">
        <MyTickets />
      </main>
    </div>
  );
};

export default LandingMyTickets;
