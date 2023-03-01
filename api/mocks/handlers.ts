import { rest } from "msw";
import { MswBooleanRequestResponseType, MswPingResponseType } from "./types";

export const handlers = [
  // Handles a GET /msw-ping request
  rest.get("/msw-ping", (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json<MswPingResponseType>({
        message: "Success!",
      }),
    );
  }),

  //   Handles a POST /msw-boolean request
  rest.post("/msw-boolean", async (req, res, ctx) => {
    const { success } = await req.json<MswBooleanRequestResponseType>();

    if (success) {
      // Respond with a 200 status code
      return res(
        ctx.status(200),
        ctx.json<MswBooleanRequestResponseType>({
          success: true,
        }),
      );
    }
    // Otherwise, bad request(400)
    return res(
      ctx.status(400),
      ctx.json<MswBooleanRequestResponseType>({
        success: false,
      }),
    );
  }),
];
