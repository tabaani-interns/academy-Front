import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import User from '@/models/User';

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
    const existingEnrollment = await Enrollment.findOne({
      userId: session.user.id,
      courseId: courseId
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create enrollment
    const enrollment = new Enrollment({
      userId: session.user.id,
      courseId: courseId,
      paymentAmount: course.price,
      paymentStatus: course.price === 0 ? 'free' : 'paid' // Dummy payment
    });

    await enrollment.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrollmentCount: 1 }
    });

    // Update user's enrolled courses
    await User.findByIdAndUpdate(session.user.id, {
      $push: { enrolledCourses: courseId }
    });

    return NextResponse.json({
      message: 'Successfully enrolled in course',
      enrollment
    }, { status: 201 });

  } catch (error) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}

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
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Build query
    const query: any = { userId: session.user.id };
    if (status) query.status = status;

    const enrollments = await Enrollment.find(query)
      .populate('courseId', 'title thumbnail price level category tutorId')
      .populate({
        path: 'courseId',
        populate: {
          path: 'tutorId',
          select: 'name image'
        }
      })
      .sort({ enrollmentDate: -1 });

    return NextResponse.json({ enrollments });

  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}
