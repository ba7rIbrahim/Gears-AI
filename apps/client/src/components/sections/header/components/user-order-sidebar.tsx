import { useState, useMemo } from "react";
import { Link } from "react-router";
import type { Order } from "@monorepo/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderCardSkeleton, Spinner } from "@/components/shared";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Trash,
  Plus,
  Minus,
  Truck,
  CreditCard,
} from "lucide-react";
import {
  useDeleteOrder,
  useGetOrders,
  useUpdateOrder,
} from "@/hooks/use-orders";

export const UserOrdersSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: orders, isPending: isOrdersPending } = useGetOrders();
  const {
    mutate: updateOrder,
    isPending: isUpdatePending,
    variables: updateVariables,
  } = useUpdateOrder();
  const {
    mutate: deleteOrder,
    isPending: isDeletePending,
    variables: deleteVariables,
  } = useDeleteOrder();

  const handleQuantityChange = async (
    id: string,
    delta: number,
    action: "plus" | "minus"
  ) => {
    const order = orders.find((order: Order) => order._id === id);
    if (!order) return;
    const newQuantity = Math.max(1, order.quantity + delta);
    updateOrder({ id, quantity: newQuantity, action });
  };

  const handleRemoveItem = async (id: string) => {
    deleteOrder(id);
  };

  const subtotal = useMemo(() => {
    return (orders ?? []).reduce(
      (sum: number, item: Order) => sum + item.oldPrice * item.quantity,
      0
    );
  }, [orders]);

  const shippingCost = useMemo(() => {
    return subtotal >= 750 ? 0 : 5.99;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shippingCost;
  }, [subtotal, shippingCost]);

  const totalItems = useMemo(() => {
    return (orders ?? []).reduce(
      (sum: number, item: Order) => sum + item.quantity,
      0
    );
  }, [orders]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5! w-5!" />
          {totalItems > 0 && (
            <span className="flex absolute -top-1 -left-1 justify-center items-center w-5 h-5 text-xs font-bold rounded-full bg-primary text-secondary">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 w-full max-w-md shadow-lg sm:max-w-lg md:max-w-xl">
        <SheetHeader className="flex justify-between items-center mb-6 w-full">
          <div className="flex flex-row-reverse justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <SheetTitle className="text-2xl font-bold">سلة التسوق</SheetTitle>
              <ShoppingCart className="w-6 h-6" />
            </div>
            <SheetDescription
              className="text-sm text-muted-foreground"
              dir="rtl"
            >
              {totalItems} {totalItems === 1 ? "منتح" : "منتجات"}
            </SheetDescription>
          </div>
        </SheetHeader>
        {isOrdersPending && (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <OrderCardSkeleton key={index} />
            ))}
          </div>
        )}
        <div className="overflow-y-auto flex-1 pr-2">
          {!isOrdersPending && orders.length === 0 ? (
            <div className="flex justify-center items-center h-full text-muted-foreground">
              سلة التسوق الخاصة بك فارغة.
            </div>
          ) : (
            <div className="space-y-6">
              {orders?.map((order: Order) => (
                <div key={order._id} className="flex gap-4 items-center">
                  <img
                    src={order.image}
                    alt={order.title}
                    width={80}
                    height={80}
                    className="object-cover rounded-md aspect-square bg-card"
                  />
                  <div className="grid flex-1 gap-1">
                    <h3 className="text-base font-semibold">{order.title}</h3>
                    <p className="text-base font-medium">
                      ${order.oldPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent"
                      onClick={() =>
                        handleQuantityChange(order._id!, -1, "minus")
                      }
                      disabled={
                        order.quantity <= 1 ||
                        (isUpdatePending && updateVariables?.id === order._id)
                      }
                    >
                      {isUpdatePending &&
                      updateVariables?.id === order._id &&
                      updateVariables.action === "minus" ? (
                        <Spinner size="sm" />
                      ) : (
                        <Minus className="w-4 h-4" />
                      )}
                    </Button>
                    <span className="w-6 text-base font-medium text-center">
                      {order.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent"
                      disabled={
                        order.quantity === order.inStock ||
                        (isUpdatePending && updateVariables?.id === order._id)
                      }
                      onClick={() =>
                        handleQuantityChange(order._id!, 1, "plus")
                      }
                    >
                      {isUpdatePending &&
                      updateVariables?.id === order._id &&
                      updateVariables?.action === "plus" ? (
                        <Spinner size="sm" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-destructive"
                    disabled={isDeletePending && deleteVariables === order._id}
                    onClick={() => handleRemoveItem(order._id!)}
                  >
                    {isDeletePending && deleteVariables === order._id ? (
                      <Spinner size="sm" />
                    ) : (
                      <Trash className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div className="grid gap-2 text-base">
          <div className="flex justify-between items-center">
            <span>المجموع الفرعي</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>الشحن</span>
            <span className="font-medium">
              {shippingCost === 0 ? "مجاناً" : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 text-lg font-bold">
            <span>المجموع</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center mt-4 text-sm text-muted-foreground">
          <Truck className="w-4 h-4" />
          <span>شحن مجاني للطلبات التي تزيد قيمتها عن 750$</span>
        </div>

        <SheetFooter className="mt-6">
          <Button className="text-base">
            <Link
              to="/checkout"
              className="flex gap-2 justify-center items-center w-full h-full"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="w-5 h-5" />
              الدفع
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
