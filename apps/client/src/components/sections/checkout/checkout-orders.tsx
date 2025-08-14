import type { Order } from "@monorepo/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NotFoundProduct,
  OrderCardSkeleton,
  Spinner,
} from "@/components/shared";
import { useDeleteOrder, useUpdateOrder } from "@/hooks/use-orders";

type UpdateVariablesType =
  | { id: string; quantity: number; action?: "plus" | "minus" }
  | undefined;
type DeleteVariablesType = string | undefined;

type CheckoutOrdersProps = {
  orders: Order[];
  isOrdersPending: boolean;
  updateOrder: ReturnType<typeof useUpdateOrder>["mutate"];
  isUpdateOrderPending: boolean;
  updateVariables: UpdateVariablesType;
  deleteOrder: ReturnType<typeof useDeleteOrder>["mutate"];
  isDeletePending: boolean;
  deleteVariables: DeleteVariablesType;
};

export const CheckoutOrders = ({
  orders,
  isOrdersPending,
  updateOrder,
  isUpdateOrderPending,
  updateVariables,
  deleteOrder,
  isDeletePending,
  deleteVariables,
}: CheckoutOrdersProps) => {
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

  return (
    <div className="col-span-2 space-y-4">
      {!isOrdersPending && orders?.length === 0 && (
        <div>
          <NotFoundProduct
            title="لايوجد منتجات مُضافة الى السلة"
            description="أضف منتجات الى السلة ثم قم بعملية إتمام الشراء"
            customStyle="pb-6"
          />
          <Button className="block mx-auto">
            <Link to="/shop">المنتجات</Link>
          </Button>
        </div>
      )}
      {isOrdersPending && (
        <div className="flex flex-col gap-6 mt-12 w-full">
          {Array.from({ length: 8 }).map((_, index) => (
            <OrderCardSkeleton key={index} />
          ))}
        </div>
      )}
      {orders?.map((order: Order) => (
        <Card key={order._id} className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="flex flex-row h-full">
              <div className="relative w-32 h-32">
                <img
                  src={order.image}
                  alt={order.title}
                  width={500}
                  height={500}
                  className="object-cover w-32 h-full"
                />
              </div>

              <div className="flex-1 p-6 pb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{order.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isDeletePending && deleteVariables === order._id}
                    onClick={() => handleRemoveItem(order._id!)}
                  >
                    {isDeletePending && deleteVariables === order._id ? (
                      <Spinner size="sm" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={
                        order.quantity <= 1 ||
                        (isUpdateOrderPending &&
                          updateVariables?.id === order._id &&
                          updateVariables?.action === "minus")
                      }
                      onClick={() =>
                        handleQuantityChange(order._id!, -1, "minus")
                      }
                    >
                      {isUpdateOrderPending &&
                      updateVariables?.action === "minus" &&
                      updateVariables?.id === order._id ? (
                        <Spinner size="sm" />
                      ) : (
                        <Minus className="w-4 h-4" />
                      )}
                    </Button>
                    <span className="w-8 text-center">{order.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={
                        order.quantity === order.inStock ||
                        (isUpdateOrderPending &&
                          updateVariables?.action === "plus" &&
                          updateVariables?.id === order._id)
                      }
                      onClick={() =>
                        handleQuantityChange(order._id!, 1, "plus")
                      }
                    >
                      {isUpdateOrderPending &&
                      updateVariables?.action === "plus" &&
                      updateVariables?.id === order._id ? (
                        <Spinner size="sm" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {order.newPrice > 0 ? (
                    <div className="text-right">
                      <div className="font-medium">
                        ${(order.newPrice * order.quantity).toFixed(2)}
                      </div>
                      {order.oldPrice && (
                        <div className="text-sm line-through text-muted-foreground">
                          ${(order.oldPrice * order.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="font-medium">
                        ${(order.oldPrice * order.quantity).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
