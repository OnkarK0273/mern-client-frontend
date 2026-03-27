import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "./modeToggle";
import { Tenant } from "@/lib/types";
import DynamicCartCounter from "./client-wrapper";
import TenantSelect from "./tenant-select";
import { getSession } from "@/lib/session";
import LogoutBtn from "./logout-btn";
import Logo from "./logo";

const Header = async () => {
  const session = await getSession();
  const tenantsResponse = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/tenant?perPage=100`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );

  if (!tenantsResponse.ok) {
    throw new Error("Failed to fetch tenants");
  }

  const restaurants: { data: Tenant[] } = await tenantsResponse.json();
  return (
    <header className="bg-card">
      <nav className="lg:max-w-7xl max-w-sm  md:max-w-md mx-auto py-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />

          <TenantSelect restaurants={restaurants} />
        </div>
        <div className="flex items-center gap-x-4">
          <ul className="flex items-center font-medium space-x-4">
            <li>
              <Link className="hover:text-primary" href={"/"}>
                Menu
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={"/"}>
                Orders
              </Link>
            </li>
          </ul>
          <DynamicCartCounter />
          <div className="flex items-center ml-12">
            <Phone />
            <span>+91 9800 098 998</span>
          </div>
          {session ? (
            <LogoutBtn />
          ) : (
            <Button size={"sm"} asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
