import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const rtkQueryErrorLog = (
  error: FetchBaseQueryError | SerializedError | undefined,
) => {
  if (error && "status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    console.log(errMsg);
  }
};
