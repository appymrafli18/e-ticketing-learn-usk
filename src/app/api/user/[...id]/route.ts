import { verifyToken } from "@/lib/auth";
import { createResponse } from "@/lib/response";
import { userServices } from "@/services/UserServices";
import { IPayload } from "@/types/jwt";
import { IParamsServer } from "@/types/params-server";
import { Role } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;

  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "all":
      if (["ADMIN", "USER", "MASKAPAI"].includes(id[1].toUpperCase()))
        return userServices.getAllUser(verif, id[1].toUpperCase() as Role);
      return createResponse(400, "Role yang di berikan tidak valid");
    case "me":
      return userServices.getMeUser(verif, getToken);
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
