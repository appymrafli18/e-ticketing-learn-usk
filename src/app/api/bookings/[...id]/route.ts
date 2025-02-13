import { verifyToken } from "@/lib/auth";
import { createResponse } from "@/lib/response";
import { BookingServices } from "@/services/BookingServices";
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

  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "all":
      return BookingServices.getAllBookings(verif);
    case "select":
      return BookingServices.getOneBooking(id[1], verif);
    default:
      return createResponse(404, "Not Found");
  }
}
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
      return BookingServices.createBookings(req, verif);
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

  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "update":
      return BookingServices.updateBookings(req, id[1], verif);
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

  if (!verif) return createResponse(401, "Failed Token");

  switch (id[0]) {
    case "delete":
      return BookingServices.deleteBookings(id[1], verif);
    default:
      return createResponse(404, "Not Found");
  }
}
