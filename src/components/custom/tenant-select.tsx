"use client";
import { Tenant } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
  const router = useRouter();
  const handleSelect = (id: string) => {
    router.push(`?restaurantId=${id}`);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {restaurants.data.map((restaurant) => {
          return (
            <SelectItem key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
