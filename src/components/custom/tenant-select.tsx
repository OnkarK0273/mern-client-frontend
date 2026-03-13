"use client";
import { Tenant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSelect = (id: string) => {
    router.push(`?restaurantId=${id}`);
  };

  const tenantId = searchParams.get("restaurantId");

  return (
    <Select onValueChange={handleSelect} defaultValue={tenantId || ""}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {restaurants.data.map((restaurant) => {
          return (
            <SelectItem key={restaurant.id} value={String(restaurant.id)}>
              {restaurant.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
