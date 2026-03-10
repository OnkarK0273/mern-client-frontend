import { Topping } from "@/lib/types";
import React, { startTransition, useEffect, useState } from "react";
import ToppingCard from "./topping-card";

const ToppingList = ({ tenantId }: { tenantId: string }) => {
  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        // todo: make tenantId dynamic
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${tenantId}`,
      );
      const toppingsData = await toppingResponse.json();
      setToppings(toppingsData.data);
      console.log("toppings", toppingsData);
    };
    fetchData();
  }, []);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element.id === topping.id,
    );

    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) =>
          prev.filter((elm: Topping) => elm.id !== topping.id),
        );
        return;
      }

      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    });
  };

  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings?.map((topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping.id}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
