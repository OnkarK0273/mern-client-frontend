"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import ToppingList from "./topping-list";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product, Topping } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { startTransition, Suspense, useMemo, useState } from "react";
import { SkeletonWrapper, ToppingSkeletonCard } from "./skeleton-cards";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, CartItem } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";
import { hashTheItem } from "@/lib/utils";

type ChosenConfig = {
  [key: string]: string;
};

const ProductModal = ({ product }: { product: Product }) => {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const defaultConfiguration = Object.entries(
    product.category.priceConfiguration,
  )
    .map(([key, value]) => {
      return { [key]: value.availableOptions[0] };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(
    defaultConfiguration as unknown as ChosenConfig,
  );
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: Product) => {
    const itemToAdd: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: chosenConfig!,
        selectedToppings: selectedToppings,
      },
      qty: 1,
    };
    dispatch(addToCart(itemToAdd));
    setSelectedToppings([]);
    setDialogOpen(false);
    toast.success("Product has been added to addtocart", {
      position: "top-center",
    });
  };

  const totalPrice = useMemo(() => {
    const toppingsTotal = selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0,
    );

    const configPricing = Object.entries(chosenConfig).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = product.priceConfiguration[key].availableOptions[value];
        return acc + price;
      },
      0,
    );
    return configPricing + toppingsTotal;
  }, [chosenConfig, selectedToppings, product]);

  const handleRadioChange = (key: string, data: string) => {
    /**
          {
            Size: "Medium",
            Crust: "Thin"
        }
         */

    startTransition(() => {
      setChosenConfig((prev) => {
        return { ...prev, [key]: data };
      });
    });
  };

  const alreadyHasInCart = useMemo(() => {
    const currentConfiguration = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: { ...chosenConfig },
        selectedToppings: selectedToppings,
      },
      qty: 1,
    };

    const hash = hashTheItem(currentConfiguration);
    return cartItems.some((item) => item.hash === hash);
  }, [product, chosenConfig, selectedToppings, cartItems]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element._id === topping._id,
    );

    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) =>
          prev.filter((elm: Topping) => elm._id !== topping._id),
        );
        return;
      }

      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl ">
        <div className="flex p-1">
          <div className="w-1/3 p-8 rounded-xl   flex items-center justify-center bg-card">
            <Image
              src={product.image}
              width={450}
              height={450}
              alt={product.name}
            />
          </div>
          <div className="w-2/3 p-8 bg-background">
            <DialogTitle className="text-xl font-bold">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-1">
              {product.description}
            </DialogDescription>

            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <h4 className="mt-6">Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      onValueChange={(data) => {
                        handleRadioChange(key, data);
                      }}
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      {value.availableOptions.map((option) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label={option}
                            />
                            <Label
                              htmlFor={option}
                              className="flex flex-col items-center justify-between rounded-md border-2 bg-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                );
              },
            )}

            <Suspense
              fallback={
                <SkeletonWrapper count={3} className="gap-4 mt-2">
                  <ToppingSkeletonCard />
                </SkeletonWrapper>
              }
            >
              <ToppingList
                selectedToppings={selectedToppings}
                handleCheckBoxCheck={handleCheckBoxCheck}
                categoryId={product.categoryId}
              />
            </Suspense>

            <div className="flex items-center justify-between mt-12">
              <span className="font-bold">{totalPrice}</span>
              <Button
                className={alreadyHasInCart ? "bg-gray-700" : "bg-primary"}
                disabled={alreadyHasInCart}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart size={20} />
                <span className="ml-2">
                  {alreadyHasInCart ? "Already in cart" : "Add to cart"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
