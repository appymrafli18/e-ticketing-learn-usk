import { AxiosError } from "axios";

export function ErrorAxios(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response!.data.message;
  } else {
    return null;
  }
}

export function ErrorAxiosValidation(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response!.data.error;
  } else {
    return null;
  }
}
