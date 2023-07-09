import { fetcher } from "../../fetcher";

export function getAll() {
  return fetcher.get("/all");
}
