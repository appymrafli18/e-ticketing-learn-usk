import { verifyToken } from "@/lib/auth";
import { createResponse } from "@/lib/response";
import { FlightsServices } from "@/services/FlightsServices";
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
      return FlightsServices.getAllFlight(verif);
    case "select":
      return FlightsServices.getFlightById(id[1], verif);
    default:
      return createResponse(404, "Not found");
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
      return FlightsServices.deleteFlight(id[1], verif);
    default:
      return createResponse(404, "Not found");
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
      return FlightsServices.updateFlight(req, id[1], verif);
    default:
      return createResponse(404, "Not found");
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<IParamsServer> }
) {
  const getToken = req.cookies.get("token")!.value;
  const verif: IPayload | null = verifyToken(getToken);
  const { id } = await params;

  if (!verif) return createResponse(401, "Not Found Token!");

  switch (id[0]) {
    case "create":
      return FlightsServices.createFlight(req, verif);
    default:
      return createResponse(404, "Not found");
  }
}
