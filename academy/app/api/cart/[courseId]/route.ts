import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const cart = await Cart.findOne({ userId: session.user.id });
    
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Remove item from cart
    cart.items = cart.items.filter((item: any) => 
      item.courseId.toString() !== params.courseId
    );

    // Update total amount
    cart.totalAmount = cart.items.reduce((total: number, item: any) => total + item.price, 0);

    await cart.save();

    return NextResponse.json({
      message: 'Course removed from cart',
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        totalItems: cart.items.length
      }
    });

  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove course from cart' },
      { status: 500 }
    );
  }
}
