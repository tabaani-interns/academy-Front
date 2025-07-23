// components/CourseCard.tsx
import Image from "next/image";
import {BookOpen, Star, Trophy, User} from "lucide-react";
import Link from "next/link";

type CourseProps = {
    id: string;
    image: string;
    courseTitle: string;
    lessons: number;
    students: number;
    level: string;
    rating: number;

};

const CourseCard =({
                                       id,
                                       image,
                                       courseTitle,
                                       lessons,
                                       students,
                                       level,
                                       rating,

                                   }: CourseProps)=> {
    return (
        <div className="rounded-xl shadow-md border p-4 max-w-sm bg-gray-50">
            <div className="rounded-lg overflow-hidden">

                <Image
                    src={image}
                    alt={courseTitle}
                    width={360}
                    height={413}
                    className="w-full h-52 object-cover"
                />
            </div>
            <div className="mt-4 space-y-2">
                <h2 className="text-lg text-black font-semibold">{courseTitle}</h2>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Lesson : {lessons}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Student : {students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{level}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link href={`/coursePage/${id}`}></Link>

                    <button className="mt-3 p-6 bg-black text-white py-2 rounded-lg hover:bg-yellow-500">
                        Start Course &nbsp; &gt;
                    </button>

                    <div className="flex items-center gap-1 text-orange-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                fill={i < rating ? "orange" : "none"}
                                stroke={i < rating ? "orange" : "gray"}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
export default CourseCard;