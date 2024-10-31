import Page from "./inicio/page";
import { auth } from "@/auth";

async function Dashboard() {
  const session = await auth();
  return (
    <Page session={session} />
  );
}

export default Dashboard;
