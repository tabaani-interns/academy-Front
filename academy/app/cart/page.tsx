"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";

interface CartItem {
  courseId: {
    _id: string;
    title: string;
    thumbnail: string;
    price: number;
    originalPrice?: number;
    level: string;
    category: string;
    tutorId: {
      name: string;
      image: string;
    };
  };
  price: number;
  addedAt: string;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchCart();
    }
  }, [session]);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items);
        setTotalAmount(data.totalAmount);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (courseId: string) => {
    try {
      const response = await fetch(`/api/cart/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart.items);
        setTotalAmount(data.cart.totalAmount);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleCheckout = async () => {
    setProcessingCheckout(true);

    try {
      // Enroll in all courses (dummy purchase)
      const enrollmentPromises = cartItems.map((item) =>
        fetch("/api/enrollments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: item.courseId._id,
          }),
        })
      );

      await Promise.all(enrollmentPromises);

      // Clear cart after successful enrollment
      await Promise.all(
        cartItems.map((item) => removeFromCart(item.courseId._id))
      );

      // Redirect to dashboard
      router.push("/dashboard?checkout=success");
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setProcessingCheckout(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "course" : "courses"}{" "}
            in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Browse our courses and add them to your cart to get started.
              </p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.courseId._id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {item.courseId.thumbnail && (
                          <img
                            src={item.courseId.thumbnail}
                            alt={item.courseId.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.courseId.title}
                        </h3>

                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {item.courseId.level}
                          </span>
                          <span>{item.courseId.category}</span>
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          by {item.courseId.tutorId.name}
                        </div>

                        <div className="text-sm text-gray-500">
                          Added on {new Date(item.addedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-gray-900 mb-2">
                          ${item.price}
                          {item.courseId.originalPrice &&
                            item.courseId.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${item.courseId.originalPrice}
                              </span>
                            )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.courseId._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.length} courses)</span>
                    <span>${totalAmount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span className="text-green-600">-$0</span>
                  </div>

                  <hr />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={processingCheckout}
                    className="w-full"
                    size="lg"
                  >
                    {processingCheckout ? "Processing..." : "Complete Purchase"}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    30-day money-back guarantee
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">This order includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Lifetime access to courses</li>
                      <li>• Mobile and TV access</li>
                      <li>• Certificate of completion</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
