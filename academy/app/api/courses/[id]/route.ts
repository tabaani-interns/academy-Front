import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import Chapter from '@/models/Chapter';
import Lesson from '@/models/Lesson';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const course = await Course.findById(params.id)
      .populate('tutorId', 'name image');

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Get chapters and lessons
    const chapters = await Chapter.find({ courseId: params.id })
      .sort({ orderIndex: 1 });

    const lessons = await Lesson.find({ courseId: params.id })
      .sort({ orderIndex: 1 });

    // Group lessons by chapter
    const chaptersWithLessons = chapters.map(chapter => ({
      ...chapter.toObject(),
      lessons: lessons.filter(lesson => 
        lesson.chapterId.toString() === chapter._id.toString()
      )
    }));

    return NextResponse.json({
      course,
      chapters: chaptersWithLessons
    });

  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if user owns this course or is admin
    if (course.tutorId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const updateData = await request.json();
    const updatedCourse = await Course.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });

  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if user owns this course or is admin
    if (course.tutorId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete related data
    await Chapter.deleteMany({ courseId: params.id });
    await Lesson.deleteMany({ courseId: params.id });
    await Course.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
