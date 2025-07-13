import React from 'react'
import {CircleCheck, Clock5, CoinsIcon, Menu, SignalHigh} from "lucide-react";

const CourseDetails = () => {

    const course = {
        name: "Fundamentals of digital marketing",
        subtitle: "Learn the fundamentals of digital marketing to help your business or career.",

        about: "Master the basics of digital marketing with our free course accredited by Interactive " +
            "Advertising Bureau Europe and The Open University. There are 26 modules to explore, " +
            "all created by Google trainers, packed full of practical exercises and real-world examples" +
            " to help you turn knowledge into action.",

        CourseFeatures: ["Self-paced learning","Video tutorials","Unlimited access","Unlimited access"],
        CourseDetail: {
            modules:26,
            hours:40,
            level:"beginner",
            price:"Free"
        },

    };

    return (

        <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row w-full gap-4">
                {/* Div1 */}
                <div className="flex flex-col md:flex-1 gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* SubDiv1 */}
                        <div className="flex-1 bg-white p-4 start-0">
                            <span className="text-2xl text-black mb-4 block">Course Detail</span>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Menu  className="text-primary w-5 h-5" />
                                    <span>{course.CourseDetail.modules}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Clock5 className="text-primary w-5 h-5" />
                                    <span>{course.CourseDetail.hours}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <SignalHigh className="text-primary w-5 h-5" />
                                    <span>{course.CourseDetail.level}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CoinsIcon className="text-primary  w-5 h-5" />
                                    <span>{course.CourseDetail.price}</span>
                                </div>

                            </div>

                        </div>
                        {/* SubDiv2 */}
                        <div className="flex-1 bg-white p-4 start-0">
                            <span className="text-2xl text-black mb-4 block">Course Features</span>
                            <div className="mt-2 space-y-2">
                                {course.CourseFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700">
                                        <div className="bg-green-500  rounded-full">
                                            <CircleCheck className="text-white w-5 h-5" />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Div2 */}
                <div className="flex-1 bg-white p-4 start-0">
                    <span className="text-2xl text-black mb-4 block">About this course</span>
                    <div>
                        <p className="text-gray-600">
                            Master the basics of digital marketing with our free course accredited by Interactive Advertising Bureau Europe and The Open University.
                            There are 26 modules to explore, all created by Google trainers,
                            packed full of practical exercises and real-world examples to help you turn knowledge into action.
                        </p>
                    </div>
                </div>

            </div>


        </section>
    )
}
export default CourseDetails
