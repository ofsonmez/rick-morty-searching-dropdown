/**
 * @name HttpRequestType
 * @description
 * The type of http request we need to execute in our HttpClient request method
 */
export const enum HttpRequestType {
  get,
}

export const HttpContentTypes = Object.freeze({
  applicationJson: "application/json",
  formUrlEncoded: "application/x-www-form-urlencoded;charset=UTF-8",
});
