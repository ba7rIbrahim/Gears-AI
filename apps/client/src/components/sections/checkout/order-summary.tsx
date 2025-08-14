import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { useDeleteOrder } from "@/hooks/use-orders";
import type { Order } from "@monorepo/types";
import { CreditCard, Package, Shield, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "الشحن العادي",
    price: 5.99,
    estimatedDays: "3-5 أيام",
    description: "شحن مجاني للطلبات التي تزيد عن 200 دولار",
  },
  {
    id: "express",
    name: "الشحن السريع",
    price: 12.99,
    estimatedDays: "1-2 يوم",
    description: "توصيل أولوية مع تتبع الطلب",
  },
];

export const OrderSummary = ({
  orders,
  deleteOrder,
}: {
  orders: Order[];
  deleteOrder: ReturnType<typeof useDeleteOrder>["mutate"];
}) => {
  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [isCompleting, setIsCompleting] = useState<boolean>(false);

  const subtotal = useMemo(() => {
    return (orders ?? []).reduce(
      (sum: number, item: Order) => sum + item.oldPrice * item.quantity,
      0
    );
  }, [orders]);

  const shipping =
    shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const total = subtotal >= 750 ? subtotal : subtotal + shipping;

  const handleOrderCompletion = async () => {
    setIsCompleting(true);
    try {
      if (orders?.length === 0) return;
      await Promise.all(orders?.map((order: Order) => deleteOrder(order._id!)));
      toast.success("تم إكمال الدفع");
    } catch {
      toast.error("فشل إتمام عملية الدفع. يُرجى المحاولة مرة أخرى.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ملخص الطلب</CardTitle>
          <CardDescription>مراجعة تفاصيل طلبك ومعلومات الشحن</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shipping Method */}
          <div className="space-y-2">
            <Label className="mb-2">طريقة الشحن</Label>
            <Select
              value={shippingMethod}
              onValueChange={setShippingMethod}
              dir="rtl"
              disabled={subtotal > 750}
            >
              <SelectTrigger className="w-full max-w-none data-[size=default]:h-auto">
                <SelectValue placeholder="Select shipping method" />
              </SelectTrigger>
              <SelectContent className="!h-auto">
                {shippingMethods.map((method) => (
                  <SelectItem
                    key={method.id}
                    value={method.id}
                    className="!h-auto"
                  >
                    <div
                      className="flex gap-4 justify-between text-end"
                      dir="rtl"
                    >
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {method.estimatedDays}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 w-full lg:grid-cols-1">
            <div className="flex justify-between text-sm">
              <span>المجموع الفرعي</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>الشحن</span>
              <span>
                {subtotal > 750
                  ? "مجاناً"
                  : `$${(total - subtotal).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>المجموع الكلي</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4 space-y-4 border-t">
            <div className="flex gap-2 items-center text-sm">
              <Package className="w-4 h-4 text-primary" />
              <span>إرجاع مجاني خلال 30 يوماً</span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span>دفع آمن</span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Truck className="w-4 h-4 text-primary" />
              <span>توصيل سريع</span>
            </div>
          </div>

          <Button
            className="w-full"
            disabled={orders.length === 0 || isCompleting}
            onClick={handleOrderCompletion}
          >
            {isCompleting ? (
              <Spinner size="sm" />
            ) : (
              <>
                <CreditCard className="mr-2 w-4 h-4" />
                إكمال الطلب
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
