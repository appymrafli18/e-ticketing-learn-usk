import { verifyToken } from "@/lib/auth";
import { createResponse } from "@/lib/response";
import { airlineService } from "@/services/AirlineServices";
import { IPayload } from "@/types/jwt";
import { IParamsServer } from "@/types/params-server";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;
  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "create":
      return airlineService.createAirlines(req, verif);
    default:
      return createResponse(404, "Not Found Path");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;
  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "update":
      return airlineService.updateAirlines(req, verif, id[1]);
    default:
      return createResponse(404, "Not Found Path");
  }
}
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
      return airlineService.getAllAirlines(verif);
    case "select":
      return airlineService.getSelectedAirlines(verif, id[1]);
    default:
      return createResponse(404, "Not Found Path");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;
  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "delete":
      return airlineService.deleteAirlines(verif, id[1]);
    default:
      return createResponse(404, "Not Found Path");
  }
}
