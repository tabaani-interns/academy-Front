import InstructorCard from "@/components/Instructor_Card";
import DetailedCard from "@/components/Detailed_Card";

const Page = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
        <p className="text-gray-400">Continue your learning journey</p>
      </div>

      <div className="grid gap-6">
        <DetailedCard
          courseTitle="Course – Introduction to Hosting"
          courseImage="/Course.png"
          instructorName="Jon Kanter"
          instructorSpecialty="Design Teacher"
          instructorImage="/Instructor_fdp.png"
          students={120}
          lessons={24}
          duration="6h"
          points={80}
          totalPoints={100}
          days={4}
        />

        <InstructorCard
          name="Jon Kanter"
          specialty="Design Teacher"
          imageUrl="/Instructor.png"
        />
      </div>
    </div>
  );
};
export default Page;
