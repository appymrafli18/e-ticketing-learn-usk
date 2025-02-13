import { prisma_connection } from "@/lib/prisma-orm";
import { createResponse } from "@/lib/response";
import { IPayload } from "@/types/jwt";
import { NextRequest } from "next/server";

export const BookingServices = {
  getAllBookings: async (payload: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
        include: {
          flights: true,
        },
      });

      if (!searchAirlines && payload.role === "MASKAPAI")
        return createResponse(404, "Airlines not found");

      const airlinesId = searchAirlines?.id;
      const response = await prisma_connection.tbl_bookings.findMany({
        where: {
          ...(payload.role === "USER" && { userId: payload.id }),
          flight: {
            airlinesId: airlinesId,
          },
        },
        omit: {
          flightId: true,
          userId: true,
        },
        include: {
          flight: {
            omit: {
              kapasitas_kursi: true,
              kursi_tersedia: true,
              airlinesId: true,
            },
          },
        },
      });

      if (!response) return createResponse(404, "Bookings not found");

      return createResponse(200, "Success", response);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  getOneBooking: async (id: string, payload: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.tbl_airlines.findUnique({
        where: {
          userId: payload.id,
        },
        include: {
          flights: true,
        },
      });

      if (!searchAirlines && payload.role === "MASKAPAI")
        return createResponse(404, "Airlines not found");

      const airlinesId = searchAirlines?.id;
      const response = await prisma_connection.tbl_bookings.findUnique({
        where: {
          id: Number(id),
          ...(payload.role === "USER" && { userId: payload.id }),
          flight: {
            airlinesId: airlinesId,
          },
        },
        omit: {
          flightId: true,
          userId: true,
        },
        include: {
          flight: {
            omit: {
              kapasitas_kursi: true,
              kursi_tersedia: true,
              airlinesId: true,
            },
          },
        },
      });

      if (!response) return createResponse(404, "Bookings not found");

      return createResponse(200, "Success", response);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  createBookings: async (req: NextRequest, payload: IPayload) => {
    if (payload.role === "MASKAPAI") return createResponse(401, "Unauthorized");
    try {
      const body = await req.json();

      const searchFlights = await prisma_connection.tbl_flights.findUnique({
        where: {
          id: Number(body.flightId),
        },
      });

      if (!searchFlights) return createResponse(404, "Flights not found");
      if (searchFlights.kursi_tersedia < Number(body.jumlah_kursi))
        return createResponse(400, "Kursi tidak tersedia");

      const data = {
        jumlah_kursi: Number(body.jumlah_kursi),
        total_harga: searchFlights.harga.toNumber() * Number(body.jumlah_kursi),
        flightId: Number(body.flightId),
        userId: payload.role === "ADMIN" ? Number(body.userId) : payload.id,
      };
      await prisma_connection.tbl_bookings.create({
        data,
      });

      await prisma_connection.tbl_flights.update({
        data: {
          kursi_tersedia:
            searchFlights.kursi_tersedia - Number(body.jumlah_kursi),
        },
        where: {
          id: searchFlights.id,
        },
      });

      return createResponse(200, "Success Created Bookings");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  updateBookings: async (req: NextRequest, id: string, payload: IPayload) => {
    if (payload.role === "MASKAPAI") return createResponse(401, "Unauthorized");
    try {
      const body = await req.json();

      const searchFlights = await prisma_connection.tbl_flights.findUnique({
        where: {
          id: Number(body.flightId),
        },
        include: {
          bookings: true,
        },
      });

      if (!searchFlights) return createResponse(404, "Flights not found");
      if (searchFlights.kursi_tersedia < Number(body.jumlah_kursi))
        return createResponse(400, "Kursi tidak tersedia");

      const searchBookings = await prisma_connection.tbl_bookings.findUnique({
        where: {
          id: Number(id),
          ...(payload.role === "USER" && { userId: payload.id }),
        },
      });

      if (!searchBookings) return createResponse(404, "Bookings not found");

      const data = {
        jumlah_kursi: Number(body.jumlah_kursi),
        total_harga: searchFlights.harga.toNumber() * Number(body.jumlah_kursi),
        flightId: Number(body.flightId),
        userId: payload.role === "ADMIN" ? Number(body.userId) : payload.id,
      };

      await prisma_connection.tbl_bookings.update({
        where: {
          id: searchBookings.id,
        },
        data,
      });

      return createResponse(200, "Success Updated Bookings");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  deleteBookings: async (id: string, payload: IPayload) => {
    if (payload.role === "MASKAPAI") return createResponse(401, "Unauthorized");
    try {
      const search = await prisma_connection.tbl_bookings.findUnique({
        where: {
          id: Number(id),
          ...(payload.role === "USER" && { userId: payload.id }),
        },
      });

      if (!search) return createResponse(404, "Bookings not found");

      await prisma_connection.tbl_bookings.delete({
        where: {
          id: search.id,
        },
      });

      return createResponse(200, "Success Deleted Bookings");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
};
