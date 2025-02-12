import { HeroeInterface } from "./heroe";
import { StorageInterface } from "./storage";

export interface ApiResponse<T> {
  data: StorageInterface<T>
}
