import Checkout from "@/components/landing-page/Checkout";
import React from "react";

const Page = ({ params }: { params: { uuid: string } }) => {
  const { uuid } = params;

  return (
    <>
      <Checkout paramsUUID={uuid} />
    </>
  );
};

export default Page;
