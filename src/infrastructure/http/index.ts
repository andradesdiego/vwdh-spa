let http: typeof import("./http.car");

if (process.env.NODE_ENV === "production") {
  console.log("Using serverless HTTP client");

  http = await import("./http.car.serverless");
} else {
  http = await import("./http.car");
}

export const getAll = http.getAll;
export const create = http.create;
export const update = http.update;
export const remove = http.remove;
