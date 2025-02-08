import { verifyToken } from "@/lib/auth";
import { createResponse } from "@/lib/response";
import { userServices } from "@/services/UserServices";
import { IPayload } from "@/types/jwt";
import { IParamsServer } from "@/types/params-server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;

  if (!verif) return createResponse(401, "Not Found Token!");

  switch (id[0]) {
    case "all":
      return userServices.getAllUser(verif);
    case "me":
      break;
    case "select":
      return userServices.getOneUser(verif, id[1]);
    default:
      return createResponse(404, "Not Found");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;

  if (!verif) return createResponse(401, "Not Found Token!");

  switch (id[0]) {
    case "update":
      return userServices.updateUser(req, id[1], verif);
    default:
      return createResponse(404, "Not Found");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;

  if (!verif) return createResponse(401, "Not Found Token!");

  switch (id[0]) {
    case "delete":
      return userServices.deleteUser(verif, id[1]);
    default:
      return createResponse(404, "Not Found");
  }
}
