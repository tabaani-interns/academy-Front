import React from "react";
import {ThumbsUp, ThumbsDown, Share, Share2, Check, CheckCheck, CheckIcon, CheckLine, CheckCircle} from "lucide-react";
import Image from "next/image";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";

const LessonCard = () => {
    return (
        <div className="bg-black text-white p-6 rounded-xl max-w-4xl mx-auto shadow-lg space-y-4">
            {/* Course Title */}
            <h2 className="text-2xl md:text-3xl font-semibold">Course – Introduction to Hosting</h2>

            {/* Video Section */}


            <CustomVideoPlayer
                sources={{
                    sd: "/videos/lesson1_sd.mp4",
                    hd: "/videos/lesson1_hd.mp4",
                }}
                poster="/assets/images/course/courseCover.png"
            />

            {/* Lesson Info */}
            <div className="flex items-start gap-4">
                <Image
                    src="/assets/images/course/iab-europe-logo.png" // Replace with actual avatar
                    alt="Instructor"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className=" justify-between items-start  gap-2">
                    <div className="flex items-center m">
                        <h3 className="text-lg md:text-xl font-medium">
                        Lesson 1 – <span className="font-semibold">Implement Story telling</span>
                    </h3>
                    </div>


                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div>
                        <span className="font-semibold">TUtor name</span> <CheckCircle/>
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                            <ThumbsUp size={16} />
                            <span>145</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <ThumbsDown size={16} />
                            <span>6</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <Share2 size={16} />
                            <span>6</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                This module would provide strategies for providing exceptional customer
                service and creating a welcoming and comfortable environment for visitors.
                It would cover topics such as communication skills, problem-solving,
                and attention to detail. Participants would learn how to anticipate and
                respond to the needs of visitors, and how to create a hospitable and
                inclusive environment for all.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <button className="px-6 py-2 border border-gray-400 rounded-lg text-sm hover:bg-gray-800 transition">
                    Skip To The Test
                </button>
                <button className="px-6 py-2 bg-white text-black font-medium rounded-lg text-sm hover:bg-gray-200 transition">
                    Test Your Knowledge
                </button>
            </div>
        </div>
    );
};

export default LessonCard;
