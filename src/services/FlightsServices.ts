import { prisma_connection } from "@/lib/prisma-orm";
import { createResponse } from "@/lib/response";
import { IPayload } from "@/types/jwt";
import { NextRequest } from "next/server";

export const FlightsServices = {
  getAllFlight: async (payload: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
      });

      if (!searchAirlines && payload.role === "MASKAPAI")
        return createResponse(404, "Airlines not found");

      const response = await prisma_connection.tbl_flights.findMany({
        where: {
          ...(payload.role === "MASKAPAI" && {
            airlinesId: searchAirlines?.id,
          }),
        },
        omit: {
          airlinesId: true,
        },
        include: {
          airlines: {
            omit: {
              userId: true,
            },
          },
        },
      });

      return createResponse(200, "Success", response);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  getFlightById: async (id: string, payload: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
      });

      if (!searchAirlines && payload.role === "MASKAPAI")
        return createResponse(404, "Airlines not found");

      const response = await prisma_connection.tbl_flights.findUnique({
        where: {
          ...(payload.role === "MASKAPAI" && {
            airlinesId: searchAirlines?.id,
          }),
          id: Number(id),
        },
        omit: {
          airlinesId: true,
        },
        include: {
          airlines: {
            omit: {
              userId: true,
            },
          },
        },
      });

      if (!response) return createResponse(404, "Not Found Flights");

      return createResponse(200, "Success", response);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  createFlight: async (req: NextRequest, payload: IPayload) => {
    if (payload.role === "USER") return createResponse(401, "Unauthorized");
    try {
      const body = await req.json();
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
      });

      if (!searchAirlines) return createResponse(404, "Airlines not found");

      const flightsData = {
        ...body,
        harga: Number(body.harga),
        kapasitas_kursi: Number(body.kapasitas_kursi),
        kursi_tersedia: Number(body.kursi_tersedia),
        airlinesId: searchAirlines.id,
      };

      await prisma_connection.tbl_flights.create({
        data: flightsData,
      });

      return createResponse(200, "Success created Flights");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  updateFlight: async (req: NextRequest, id: string, payload: IPayload) => {
    if (payload.role === "USER") return createResponse(404, "Unauthorized");
    try {
      const body = await req.json();
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
      });

      if (!searchAirlines && payload.role === "MASKAPAI")
        return createResponse(404, "Airlines not found");

      const flightsData = {
        ...body,
        harga: Number(body.harga),
        kapasitas_kursi: Number(body.kapasitas_kursi),
        kursi_tersedia: Number(body.kursi_tersedia),
      };

      const searchFlights = await prisma_connection.tbl_flights.findUnique({
        where: {
          id: Number(id),
          ...(payload.role === "MASKAPAI" && {
            airlinesId: searchAirlines?.id,
          }),
        },
      });

      if (!searchFlights) return createResponse(404, "Not Found Flights");

      await prisma_connection.tbl_flights.update({
        data: flightsData,
        where: {
          id: searchFlights.id,
        },
      });

      return createResponse(200, "Success updated Flights");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  deleteFlight: async (id: string, payload: IPayload) => {
    if (payload.role === "USER") return createResponse(404, "Unauthorized");
    try {
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
      });

      if (!searchAirlines && payload.role === "MASKAPAI")
        return createResponse(404, "Airlines not found");

      const searchFlights = await prisma_connection.tbl_flights.findUnique({
        where: {
          id: Number(id),
          ...(payload.role === "MASKAPAI" && {
            airlinesId: searchAirlines?.id,
          }),
        },
      });

      if (!searchFlights) return createResponse(404, "Not Found Flights");

      await prisma_connection.tbl_flights.delete({
        where: {
          id: searchFlights.id,
        },
      });

      return createResponse(200, "Success Deleted Flights");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
};
