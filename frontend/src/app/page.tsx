import { redirect } from "next/navigation";

/** Root redirect — send users to /feed if logged in, else /login */
export default function HomePage() {
  redirect("/feed");
}
