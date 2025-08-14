import {
  BreadcrumbInit,
  Loader,
  NotFoundProduct,
  Spinner,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/hooks/use-orders";
import { useGetProduct } from "@/hooks/use-products";
import { useSession } from "@/lib/auth";
import { Heart, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { Product } from "@monorepo/types";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const navigate = useNavigate();

  const {
    data: product,
    isPending: isProductPending,
    error,
  } = useGetProduct(id as string);
  const { mutateAsync: createOrder } = useCreateOrder();
  const [isAddToCartLoading, setAddToCartLoading] = useState(false);
  const [isBuyNowLoading, setBuyNowLoading] = useState(false);

  const handleAddToCart = async (product: Product) => {
    if (!session) {
      toast.error("يرجى تسجيل الدخول أولاً");
    }
    try {
      setAddToCartLoading(true);
      await createOrder({
        userId: session?.user.id as string,
        productId: product._id!,
        title: product.title,
        image: product.image,
        quantity: 1,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice || 0,
        inStock: product.inStock,
      });
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleBuyNow = async (product: Product) => {
    if (!session) {
      toast.error("يرجى تسجيل الدخول أولاً");
    }
    try {
      setBuyNowLoading(true);
      await createOrder(
        {
          userId: session?.user.id as string,
          productId: product._id!,
          title: product.title,
          image: product.image,
          quantity: 1,
          oldPrice: product.oldPrice,
          newPrice: product.newPrice || 0,
          inStock: product.inStock,
        },
        {
          onSuccess: () => {
            navigate("/checkout");
          },
          onError: () => {
            toast.error("تعذر إضافة المنتج إلى السلة");
          },
        }
      );
    } finally {
      setBuyNowLoading(false);
    }
  };

  if (isProductPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="flex justify-center items-center my-10 min-h-screen">
          <NotFoundProduct title="حدث خطأ اثناء تحميل المنتج!" />
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-[calc(100vh-455px)]">
      <BreadcrumbInit
        items={[
          { label: `جميع القطع`, isCurrentPage: false, href: "/shop" },
          { label: product?.title, isCurrentPage: true },
        ]}
      />
      <div className="flex flex-col gap-8 mb-16 lg:gap-12 md:flex-row lg:items-center">
        {/* Product Image */}
        <div className="overflow-hidden relative rounded-lg aspect-square bg-muted max-h-[400px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="object-cover w-full h-full"
            width={700}
            height={700}
          />
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full backdrop-blur-sm bg-background/80"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {product.isRecentlyAdded && (
            <span className="px-3 py-1 text-sm font-medium rounded-full w-fit bg-primary/10 text-primary">
              منتج جديد
            </span>
          )}

          <h1 className="my-2 text-3xl font-bold"> {product?.title}</h1>
          <div className="flex gap-4 items-baseline mb-6">
            <span className="text-2xl font-bold">${product?.newPrice}</span>
            <span className="text-lg line-through text-muted-foreground">
              ${product?.oldPrice}
            </span>
            {product.newPrice > 0 && (
              <span className="text-sm font-medium text-chart-2">
                وفّر{" "}
                {Math.round(
                  ((product?.oldPrice - product?.newPrice) /
                    product?.oldPrice) *
                    100
                )}
                %
              </span>
            )}
          </div>

          <p className="mb-6 text-muted-foreground">{product?.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex gap-2 items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{product?.inStock > 0 ? "متوفر" : "غير متوفر"} </span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Truck className="w-4 h-4" />
              <span>الشحن متوفر</span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>
                ضمان لمدة:{" "}
                {product?.warranty === "" ? "لايوجد ضمان" : product?.warranty}
              </span>
            </div>
          </div>

          <div>
            <span>التوصيات:</span>
            <p className="mb-6 text-muted-foreground">
              {product?.careInstruction}
            </p>
          </div>

          {product?.material && (
            <div>
              <span>المادة المصنعة:</span>
              <p className="mb-6 text-muted-foreground">{product?.material}</p>
            </div>
          )}

          <div></div>

          <div className="flex gap-4 mt-8">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => handleAddToCart(product)}
              disabled={isAddToCartLoading}
            >
              {isAddToCartLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  أضف الى السلة
                  <ShoppingCart className="mr-1 w-4 h-4" />
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => handleBuyNow(product)}
              disabled={isBuyNowLoading}
            >
              {isBuyNowLoading ? <Spinner size="sm" /> : <>اشتري الان</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
