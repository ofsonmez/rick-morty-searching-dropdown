import axios, { AxiosRequestConfig, AxiosError } from "axios";

import { HttpRequestParamsInterface, HttpClientInterface, HttpRequestType, HttpContentTypes } from "./models";

/**
 * @name HttpClientAxios
 * @description
 * Wraps http client functionality to avoid directly using a third party npm package like axios
 * and simplify replacement in the future if such npm package would stop being develed or other reasons
 */
export class HttpClientAxios implements HttpClientInterface {
  /**
   * @name request
   * @description
   * A method that executes different types of http requests (i.e. GET/POST/etc)
   * based on the parameters argument.
   * The type R specify the type of the result returned
   * The type P specify the type of payload if any
   * @returns A Promise<R> as the implementation of this method will be async.
   */
  async request<R, P>(parameters: HttpRequestParamsInterface<P>): Promise<R> {
    const { requestType, endpoint, requiresToken, headers } = parameters;

    const baseUrl = import.meta.env.VITE_API_CLIENT;
    const fullUrl = baseUrl + endpoint;

    const options: AxiosRequestConfig = { headers, maxRedirects: 0 };

    if (requiresToken && options.headers) {
      options.withCredentials = true;
      options.headers["Content-Type"] = HttpContentTypes.applicationJson;
    }

    let result!: R;
    try {
      switch (requestType) {
        case HttpRequestType.get: {
          const response = await axios.get(fullUrl, options);
          result = response?.data as R;
          break;
        }

        default: {
          console.warn("HttpClientAxios: Invalid request type argument or request type not implemented");
        }
      }
    } catch (e) {
      if (e as AxiosError) {
        throw Error(e.response.data.error as string);
      }
    }

    return result;
  }
}

export const httpClient = new HttpClientAxios();
