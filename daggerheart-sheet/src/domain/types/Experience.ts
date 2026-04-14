import type { UUID } from "../utils/UUID";

export interface Experience {
  id: UUID;
  name: string;
  rank: number; // oder "tier" - erstmal number
  note: string;
}
