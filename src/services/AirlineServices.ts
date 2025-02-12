import { IPayload } from "@/types/jwt";
import { NextRequest } from "next/server";
import { createResponse } from "@/lib/response";
import path from "path";
import { prisma_connection } from "@/lib/prisma-orm";
import { promises as fs } from "fs";

export const airlineService = {
  getAllAirlines: async (payload: IPayload) => {
    if (payload.role === "USER") return createResponse(401, "Unauthorized");
    try {
      const userId = payload.role === "MASKAPAI" ? payload.id : undefined;
      const response = await prisma_connection.tbl_airlines.findMany({
        where: {
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              uuid: true,
              username: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!response) return createResponse(404, "Airlines not found");

      return createResponse(200, "Success", response);
    } catch (error) {
      createResponse(400, (error as Error).message);
    }
  },
  getSelectedAirlines: async (payload: IPayload, id: string) => {
    if (payload.role === "USER") return createResponse(401, "Unauthorized");
    try {
      const userId = payload.role === "MASKAPAI" ? payload.id : undefined;

      const response = await prisma_connection.tbl_airlines.findUnique({
        where: {
          id: Number(id),
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              uuid: true,
              username: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!response) return createResponse(404, "Airlines not found");

      return createResponse(200, "Success", response);
    } catch (error) {
      createResponse(400, (error as Error).message);
    }
  },
  createAirlines: async (req: NextRequest, payload: IPayload) => {
    if (payload.role === "USER") return createResponse(401, "Unauthorized");
    try {
      const formData = await req.formData();
      const file: File | null = formData.get("logo") as File;

      console.log({ formData, file });

      if (!formData.get("name")) return createResponse(400, "Name not found");
      if (!file) return createResponse(400, "File not found");
      if (file.size > 1000000) return createResponse(400, "File too large");
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
        return createResponse(400, "File type not supported");
      if (file.length > 1) return createResponse(400, "Upload file only one");

      await prisma_connection.tbl_airlines.create({
        data: {
          name: formData.get("name") as string,
          logo: file.name,
          userId: Number(payload.id),
        },
      });

      const filePath = path.resolve("public/img-airlines/", file.name);
      await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

      return createResponse(200, "Success");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  updateAirlines: async (req: NextRequest, payload: IPayload, id: string) => {
    if (payload.role === "USER") return createResponse(401, "Unauthorized");
    try {
      const formData = await req.formData();
      const file: File | null = formData.get("logo") as File | null;

      const search = await prisma_connection.tbl_airlines.findUnique({
        where: {
          id: Number(id),
        },
      });

      // console.log({ formData, file, req });

      if (!search) return createResponse(404, "Airlines not found");
      let files;
      if (file !== null && file.size > 0) {
        if (file.size > 1000000) return createResponse(400, "File too large");
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
          return createResponse(400, "File type not supported");
        if (file.length > 1) return createResponse(400, "Upload file only one");
        await fs.unlink("public/img-airlines/" + search.logo);

        const filePath = path.resolve("public/img-airlines/", file.name);
        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

        files = file.name;
      } else {
        files = search.logo;
      }

      await prisma_connection.tbl_airlines.update({
        where: {
          id: Number(id),
        },
        data: {
          name: formData.get("name") as string,
          logo: files,
        },
      });

      return createResponse(200, "Success");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  deleteAirlines: async (payload: IPayload, id: string) => {
    if (payload.role === "USER") return createResponse(401, "Unauthorized");
    try {
      const search = await prisma_connection.tbl_airlines.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!search) return createResponse(404, "Airlines not found");

      await prisma_connection.tbl_airlines.delete({
        where: {
          id: search.id,
        },
      });

      return createResponse(200, "Airlines berhasil di hapus!");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
};
