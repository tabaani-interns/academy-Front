import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Course from '@/models/Course';
import Enrollment from '@/models/Enrollment';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const cart = await Cart.findOne({ userId: session.user.id })
      .populate('items.courseId', 'title thumbnail price originalPrice level category tutorId')
      .populate({
        path: 'items.courseId',
        populate: {
          path: 'tutorId',
          select: 'name image'
        }
      });

    if (!cart) {
      return NextResponse.json({
        items: [],
        totalAmount: 0,
        totalItems: 0
      });
    }

    return NextResponse.json({
      items: cart.items,
      totalAmount: cart.totalAmount,
      totalItems: cart.items.length
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const { courseId } = await request.json();

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const enrollment = await Enrollment.findOne({
      userId: session.user.id,
      courseId: courseId
    });

    if (enrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: session.user.id });
    
    if (!cart) {
      cart = new Cart({
        userId: session.user.id,
        items: [],
        totalAmount: 0
      });
    }

    // Check if course already in cart
    const existingItem = cart.items.find(item => 
      item.courseId.toString() === courseId
    );

    if (existingItem) {
      return NextResponse.json(
        { error: 'Course already in cart' },
        { status: 400 }
      );
    }

    // Add course to cart
    cart.items.push({
      courseId: courseId,
      price: course.price,
      addedAt: new Date()
    });

    // Update total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

    await cart.save();

    return NextResponse.json({
      message: 'Course added to cart',
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        totalItems: cart.items.length
      }
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add course to cart' },
      { status: 500 }
    );
  }
}
