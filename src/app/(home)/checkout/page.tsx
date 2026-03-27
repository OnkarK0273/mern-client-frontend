import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ restaurantId: string }>;
}) {
  const Session = await getSession();

  const sParams = new URLSearchParams(await searchParams);
  const existingQueryString = sParams.toString();
  sParams.append("return-to", `/checkout?${existingQueryString}`);

  if (!Session) {
    redirect(`/login?${sParams}`);
  }

  return <CustomerForm />;
}
