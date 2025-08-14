import { BreadcrumbInit } from "@/components/shared";
import { CheckoutOrders, OrderSummary } from "@/components/sections/checkout";
import {
  useDeleteOrder,
  useGetOrders,
  useUpdateOrder,
} from "@/hooks/use-orders";

export type VariablesType = "plus" | "minus";

const CheckoutPage = () => {
  const { data: orders, isPending: isOrdersPending } = useGetOrders();
  const {
    mutate: updateOrder,
    isPending: isUpdateOrderPending,
    variables: updateVariables,
  } = useUpdateOrder();
  const {
    mutate: deleteOrder,
    isPending: isDeletePending,
    variables: deleteVariables,
  } = useDeleteOrder();

  return (
    <div className="container">
      <BreadcrumbInit items={[{ label: "عملية الدفع", isCurrentPage: true }]} />
      <div>
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">عربة التسوق</h1>
            <p className="text-muted-foreground">
              {orders?.length === 1 ? "العنصر" : "العناصر"} في سلة التسوق الخاصة
              بك ({orders.length})
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-8 lg:gap-8 lg:grid-cols-3">
            <CheckoutOrders
              orders={orders}
              isOrdersPending={isOrdersPending}
              updateOrder={updateOrder}
              isUpdateOrderPending={isUpdateOrderPending}
              updateVariables={updateVariables}
              deleteOrder={deleteOrder}
              isDeletePending={isDeletePending}
              deleteVariables={deleteVariables}
            />
            <OrderSummary orders={orders} deleteOrder={deleteOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
