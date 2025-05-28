import { LucideIcon } from "lucide-react";

export interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

export interface Suggestion {
  text: string;
  icon: LucideIcon;
}
