import type * as Http from "./http.car";
import type * as HttpServerless from "./http.car.serverless";

let http: typeof Http | typeof HttpServerless | undefined;

async function getHttp() {
  if (!http) {
    if (import.meta.env.MODE === "production") {
      console.log("Using serverless HTTP client");
      http = await import("./http.car.serverless");
    } else {
      console.log("Using local JSON Server HTTP client");
      http = await import("./http.car");
    }
  }
  return http;
}

export async function getAll() {
  const client = await getHttp();
  return client.getAll();
}

export async function create(dto: any) {
  const client = await getHttp();
  return client.create(dto);
}

export async function update(dto: any) {
  const client = await getHttp();
  return client.update(dto);
}

export async function remove(id: number) {
  const client = await getHttp();
  return client.remove(id);
}
