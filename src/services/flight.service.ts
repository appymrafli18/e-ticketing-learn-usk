import { prisma_connection } from "@/lib/prisma-orm";
import { FLIGHT } from "@/types/flight";
import { IPayload } from "@/types/jwt";

const flightServices = {
  getAllFlight: async (user: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!searchAirlines && user.role === "Maskapai")
        return { statusCode: 404, message: "Airlines not found" };

      const response = await prisma_connection.flights.findMany({
        where: {
          ...(user.role === "Maskapai" && {
            airlinesId: searchAirlines?.id,
          }),
        },
        omit: {
          airlinesId: true,
        },
      });

      return { statusCode: 200, message: "Success", data: response };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
  getFlightById: async (uuid: string, user: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!searchAirlines && user.role === "Maskapai")
        return { statusCode: 404, message: "Airlines not found" };

      const response = await prisma_connection.flights.findUnique({
        where: {
          ...(user.role === "Maskapai" && {
            airlinesId: searchAirlines?.id,
          }),
          uuid,
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

      if (!response) return { statusCode: 404, message: "Flight not found" };

      return { statusCode: 200, message: "Success", data: response };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
  createFlight: async (body: FLIGHT, user: IPayload) => {
    if (user.role === "User")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!searchAirlines)
        return { statusCode: 404, message: "Airlines not found" };

      const flightsData = {
        ...body,
        harga: Number(body.harga),
        kapasitas_kursi: Number(body.kapasitas_kursi),
        kursi_tersedia: Number(body.kursi_tersedia),
        airlinesId: searchAirlines.id,
      };

      await prisma_connection.flights.create({
        data: flightsData,
      });

      return {
        statusCode: 201,
        message: "Success created data flight",
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
  updateFlight: async (body: FLIGHT, uuid: string, user: IPayload) => {
    if (user.role === "User")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!searchAirlines && user.role === "Maskapai")
        return {
          statusCode: 404,
          message: "Airlines not found",
        };

      const flightsData = {
        ...body,
        harga: Number(body.harga),
        kapasitas_kursi: Number(body.kapasitas_kursi),
        kursi_tersedia: Number(body.kursi_tersedia),
      };

      const searchFlights = await prisma_connection.flights.findUnique({
        where: {
          uuid,
          ...(user.role === "Maskapai" && {
            airlinesId: searchAirlines?.id,
          }),
        },
      });

      if (!searchFlights)
        return { statusCode: 404, message: "Flight not found" };

      await prisma_connection.flights.update({
        data: flightsData,
        where: {
          id: searchFlights.id,
        },
      });

      return {
        statusCode: 200,
        message: "Success updated data flight",
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
  deleteFlight: async (uuid: string, user: IPayload) => {
    if (user.role === "User")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!searchAirlines && user.role === "Maskapai")
        return { statusCode: 404, message: "Airlines not found" };

      const searchFlights = await prisma_connection.flights.findUnique({
        where: {
          uuid,
          ...(user.role === "Maskapai" && {
            airlinesId: searchAirlines?.id,
          }),
        },
      });

      if (!searchFlights)
        return { statusCode: 404, message: "Flight not found" };

      await prisma_connection.flights.delete({
        where: {
          id: searchFlights.id,
        },
      });

      return { statusCode: 200, message: "Success deleted data flight" };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
};

export default flightServices;
