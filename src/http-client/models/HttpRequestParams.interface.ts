import { HttpRequestType } from "./Constants";

/**
 * @name HttpRequestParamsInterface
 * @description
 * Represents an object we'll use to pass arguments into our HttpClient request method.
 */
export interface HttpRequestParamsInterface<P = void> {
  requestType: HttpRequestType;
  endpoint: string;
  requiresToken: boolean;
  headers?: { [key: string]: string };
  payload?: P;
}
