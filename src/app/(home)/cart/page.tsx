import CartItems from "./components/cart-items";

const CartPage = () => {
  return (
    <section>
      <div className="lg:max-w-7xl max-w-sm  md:max-w-md mx-auto py-6">
        <h1 className="text-lg font-bold">Shopping cart</h1>
        <div className="bg-card rounded-lg p-6 mt-6">
          <CartItems />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
