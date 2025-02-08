import { createResponse } from "@/lib/response";
import { userServices } from "@/services/UserServices";
import { IParamsId } from "@/types/params-server";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<IParamsId> }
) {
  const { id } = await params;

  switch (id) {
    case "register":
      return userServices.registerUser(req);
    case "login":
      return userServices.loginUser(req);
    case "logout":
      return userServices.logoutUser();
    default:
      return createResponse(404, "Not Found");
  }
}
