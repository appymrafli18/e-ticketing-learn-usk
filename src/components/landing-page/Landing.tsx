"use client";
import { useCallback, useEffect } from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import NavbarWithoutLogin from "./NavbarList/NavbarWithoutLogin";
import useMe from "@/store/me";
import NavbarWithLogin from "./NavbarList/NavbarWithLogin";

const Landing = () => {
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
        <MainContent />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
