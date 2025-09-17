import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return null;
}
