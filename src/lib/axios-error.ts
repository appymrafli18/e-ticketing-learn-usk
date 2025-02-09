import { AxiosError } from "axios";

export default function ErrorAxios (error: unknown) {
  if (error instanceof AxiosError) {
    return error.response!.data.message;
  } else {
    return null;
  }
}