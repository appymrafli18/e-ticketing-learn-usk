import { NextResponse } from "next/server";

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: T;
}

export const createResponse = <T>(
  statusCode: number,
  message: string,
  data?: T,
  error?: T
) => {
  const response: ApiResponse<T> = {
    statusCode,
    message,
  };

  if (data !== undefined) response.data = data;
  if (error !== undefined) response.error = error;

  return NextResponse.json(response, { status: statusCode });
};
