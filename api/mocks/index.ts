const initMocks = async () => {
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    worker
      .start()
      .then(() => console.log("worker start success"))
      .catch((err) => console.log(err));
  }
};

initMocks()
  .then(() => console.log("msw init success"))
  .catch((err) => console.log(err));

export {};
