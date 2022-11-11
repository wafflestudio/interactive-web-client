import { api } from "./api";

export const projectWebsocketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProjectMessages: build.query<any, number>({
      query: (projectId) =>
        `wss://webgam-server.shop/ws/project/${projectId}?access_token=${
          localStorage.getItem("access_token") || ""
        }`,
      async onCacheEntryAdded(
        projectId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        // create a websocket connection when the cache subscription starts
        const access_token = localStorage.getItem("accessToken");
        if (access_token) {
          const ws = new WebSocket(
            `wss://webgam-server.shop/ws/project/${projectId}/?access_token=${access_token}`,
          );
          try {
            // wait for the initial query to resolve before proceeding
            //   await cacheDataLoaded;
            console.log((await cacheDataLoaded).data);

            // when data is received from the socket connection to the server,
            // if it is a message and for the appropriate channel,
            // update our query result with the received message
            const listener = (event: MessageEvent) => {
              const data = event.data as string;
              console.log(data);
              updateCachedData((draft) => {
                draft.push(data);
              });
            };
            ws.addEventListener("message", listener);
          } catch {
            // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            // in which case `cacheDataLoaded` will throw
          }
          // cacheEntryRemoved will resolve when the cache subscription is no longer active
          await cacheEntryRemoved;
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          ws.close();
        }
      },
    }),
  }),
});

export const { useGetProjectMessagesQuery } = projectWebsocketApi;
