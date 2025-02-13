import { userSchema } from "@/lib/validation-user";
import { LOGIN, REGISTER } from "@/types/user";
import argon2d from "argon2";
import converterError from "@/lib/convert-validation";
import { createResponse } from "@/lib/response";
import { prisma_connection } from "@/lib/prisma-orm";
import { cookies } from "next/headers";
import { IPayload } from "@/types/jwt";
import { generateToken, hashPassword, verifyPassword } from "@/lib/auth";
import { Role } from "@prisma/client";

export const userServices = {
  registerUser: async (req: Request) => {
    try {
      const body: REGISTER = await req.json();

      const { error, data } = userSchema.safeParse(body);

      if (error)
        return createResponse(
          400,
          "Validation Error",
          undefined,
          converterError(error)
        );

      const hashing = await argon2d.hash(data.password);

      await prisma_connection.tbl_user.create({
        data: {
          name: data.name,
          username: data.username,
          email: data.email,
          password: hashing,
        },
      });

      return createResponse(201, "User Created Successfully");
    } catch (error) {
      return createResponse(
        400,
        "Terjadi kesalahan internal",
        undefined,
        error
      );
    }
  },
  loginUser: async (req: Request) => {
    try {
      const { email, password }: LOGIN = await req.json();

      const findUser = await prisma_connection.tbl_user.findUnique({
        where: {
          email,
        },
      });

      if (!findUser) return createResponse(404, "Akun tidak terdaftar");
      if (!(await verifyPassword(password, findUser.password)))
        return createResponse(401, "Password Salah");

      const payload: IPayload = {
        id: findUser.id,
        username: findUser.username,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
      };

      const token = generateToken(payload);

      const cookiesStore = await cookies();

      cookiesStore.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60, // 1 jam
        path: "/",
      });

      return createResponse(200, "Login Success", token);
    } catch (error) {
      return createResponse(
        500,
        "Terjadi kesalahan internal",
        undefined,
        error
      );
    }
  },
  logoutUser: async () => {
    try {
      const cookiesStore = await cookies();
      cookiesStore.delete("token");
      return createResponse(200, "Logout Success");
    } catch (error) {
      return createResponse(
        500,
        "Terjadi kesalahan internal",
        undefined,
        error
      );
    }
  },
  getAllUser: async (payload: IPayload, role: Role) => {
    if (payload.role !== "ADMIN") return createResponse(401, "Unauthorized");
    try {
      if (!["ADMIN", "USER", "MASKAPAI"].includes(role?.toUpperCase()))
        return createResponse(400, "Role yang di berikan tidak valid");
      const user = await prisma_connection.tbl_user.findMany({
        where: {
          role,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) return createResponse(404, "Invalid Selected User");

      return createResponse(200, "Success", user);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  getOneUser: async (payload: IPayload, params: string) => {
    if (payload.role !== "ADMIN") return createResponse(401, "Unauthorized");
    try {
      const findUser = await prisma_connection.tbl_user.findFirst({
        where: {
          uuid: params,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!findUser) return createResponse(404, "User not found");

      return createResponse(200, "Success", findUser);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  getMeUser: async (payload: IPayload) => {
    try {
      const response = await prisma_connection.tbl_user.findUnique({
        where: {
          id: payload.id,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!response) return createResponse(404, "User not found");

      return createResponse(200, "Success", response);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  getTotalUser: async (payload: IPayload) => {
    if (payload.role !== "ADMIN") return createResponse(401, "Unauthorized");
    try {
      const response = await prisma_connection.tbl_user.count();
      if (!response) return createResponse(404, "Not Have User");
      return createResponse(200, "Success", response);
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  updateUser: async (req: Request, uuid: string, payload: IPayload) => {
    if (payload.role !== "ADMIN") return createResponse(401, "Unauthorized");
    try {
      const body = await req.json();

      const search = await prisma_connection.tbl_user.findUnique({
        where: {
          uuid,
        },
      });

      if (!search) return createResponse(404, "User not found");

      const updatedData = {
        ...search,
        ...body,
        password: body.password
          ? await hashPassword(body.password)
          : search.password,
        role: body.role ? body.role?.toUpperCase() : search.role,
      };

      if (
        payload.role === "ADMIN" &&
        !["ADMIN", "USER", "MASKAPAI"].includes(updatedData.role)
      )
        return createResponse(400, "Role yang di berikan tidak valid");

      await prisma_connection.tbl_user.update({
        where: {
          id: search.id,
        },
        data: updatedData,
      });

      return createResponse(200, "User berhasil di ubah!");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
  deleteUser: async (payload: IPayload, uuid: string) => {
    if (payload.role !== "ADMIN") return createResponse(401, "Unauthorized");
    try {
      const search = await prisma_connection.tbl_user.findUnique({
        where: {
          uuid,
        },
      });

      if (!search) return createResponse(404, "User not found");

      await prisma_connection.tbl_user.delete({
        where: {
          id: search.id,
        },
      });

      return createResponse(200, "User berhasil di hapus!");
    } catch (error) {
      return createResponse(400, (error as Error).message);
    }
  },
};
