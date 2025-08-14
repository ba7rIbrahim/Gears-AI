import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateOrder } from "@/hooks/use-orders";
import { useSession } from "@/lib/auth";
import type { Product } from "@monorepo/types";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: Product }) => {
  const { data: session } = useSession();
  const { mutate: createOrder, isPending: isCreateOrderPending } =
    useCreateOrder();

  const onAddToOrders = () => {
    if (!session) {
      toast.error("يرجى تسجيل الدخول أولاً");
      return;
    }

    if (!product?._id) {
      toast.error("لا يمكن إضافة منتج بدون معرف");
      return;
    }

    createOrder({
      userId: session?.user.id as string,
      productId: product._id!,
      title: product.title,
      image: product.image,
      quantity: 1,
      oldPrice: product.oldPrice,
      newPrice: product.newPrice ?? 0,
      inStock: product.inStock,
    });
  };

  return (
    <Card className="overflow-hidden p-0 transition-all duration-300 group bg-card border-border hover:shadow-lg">
      <Link to={`/shop/${product._id}`}>
        <div className="overflow-hidden relative flex-1 aspect-square bg-muted">
          <div className="flex justify-center items-center w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10">
            <img src={product.image} alt={product.title} />
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4 space-y-3">
        <div className="flex flex-col gap-y-2 justify-between items-start px-1">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1">
            {product.title}
          </h3>
          {product.newPrice && product.newPrice > 0 ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <span className="text-lg font-bold text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
                <span className="text-lg font-bold text-foreground">
                  ${product.newPrice}
                </span>
              </div>
              <p className="text-sm text-chart-2">
                وفّر{" "}
                {Math.round(
                  ((product.oldPrice - product.newPrice) / product.oldPrice) *
                    100
                )}
                %
              </p>
            </div>
          ) : (
            <span className="text-lg font-bold text-foreground">
              ${product.oldPrice}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            onClick={onAddToOrders}
            disabled={isCreateOrderPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isCreateOrderPending ? (
              <Spinner size="sm" />
            ) : (
              <>
                أضف الى السلة
                <ShoppingCart className="mr-1 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
