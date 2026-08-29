import { getOrderById } from "@/app/actions";
import { notFound } from "next/navigation";
import { OrderDetailClient } from "@/components/orders/OrderDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { order } = await getOrderById(params.id);
  if (!order) return { title: "Order Not Found" };
  return { title: `Order #${order.id.slice(0, 8).toUpperCase()}` };
}

export default async function OrderDetailPage({ params }) {
  const { order, error } = await getOrderById(params.id);

  if (error || !order) {
    notFound();
  }

  return <OrderDetailClient orderId={params.id} order={order} error={error} />;
}
