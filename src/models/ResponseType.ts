import { typeToFlattenedError } from "zod";

export enum ErrorType {
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  CONFLICT = "CONFLICT",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  FORM_ERROR = "FORM_ERROR",
}

export type ResponseType<T> = {
  success: boolean;
  data?: T;
  error?: typeToFlattenedError<T>["fieldErrors"]; // For form errors
  errorType?: ErrorType;
  message?: string; // For toast message
};
