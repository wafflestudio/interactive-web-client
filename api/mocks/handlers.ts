import { rest } from "msw";

export const handlers = [
  // Handles a POST /ping request
  rest.post("/msw-ping", (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json<{ message: string }>({
        message: "Success!",
      }),
    );
  }),
];
