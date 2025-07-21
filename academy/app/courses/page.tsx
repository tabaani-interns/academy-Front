import InstructorCard from "@/components/Instructor_Card";
import DetailedCard from "@/components/Detailed_Card";

const Page = () => {
    return (
       <>
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




       </>
    )
}
export default Page
