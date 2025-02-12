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

      const result = userSchema.safeParse(body);

      if (!result.success)
        return createResponse(
          400,
          "Validation Error",
          undefined,
          converterError(result.error)
        );

      const hashing = await argon2d.hash(result.data.password);

      await prisma_connection.tbl_user.create({
        data: {
          name: result.data.name,
          username: result.data.username,
          email: result.data.email,
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
      const body: LOGIN = await req.json();

      const findUser = await prisma_connection.tbl_user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) return createResponse(404, "Akun tidak terdaftar");
      const unhashing = await verifyPassword(body.password, findUser.password);
      if (!unhashing) return createResponse(401, "Password Salah");

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
      const user = await prisma_connection.tbl_user.findMany({
        where: {
          role: role,
        },
        select: {
          id: true,
          uuid: true,
          username: true,
          name: true,
          role: true,
          email: true,
        },
      });

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
        select: {
          id: true,
          uuid: true,
          username: true,
          name: true,
          role: true,
          email: true,
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
        select: {
          id: true,
          uuid: true,
          username: true,
          name: true,
          role: true,
          email: true,
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

      const changePass = body.password
        ? await hashPassword(body.password)
        : search.password;

      if (payload.role === "ADMIN") {
        const newRole = body.role ?? search.role;

        if (!["ADMIN", "USER", "MASKAPAI"].includes(newRole.toUpperCase()))
          return createResponse(400, "Role yang di berikan tidak valid");

        await prisma_connection.tbl_user.update({
          where: {
            id: search.id,
          },
          data: {
            name: body.name || search.name,
            username: body.username || search.username,
            email: body.email || search.email,
            role: newRole.toUpperCase(),
          },
        });
      } else {
        await prisma_connection.tbl_user.update({
          where: {
            id: payload.id,
          },
          data: {
            name: body.name || search.name,
            email: body.email || search.email,
            password: changePass,
          },
        });
      }

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
