import React from 'react'
import Image from "next/image";

const CourseCover = () => {
    return (
        <section >

            <div className="w-full relative">
                <Image
                    src="/assets/images/course/courseCover.png"
                    alt="Course cover"
                    className="w-full max-h-[700px] object-cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                />
                {/* Dégradé blanc vers transparent en haut */}
                <div className="absolute bottom-0 left-0 right-0 h-63 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />

            </div>


            <div className="bg-white py-10 px-6 md:px-20">
                <div className="inline-flex items-center mb-4">
                    <div className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="text-orange-600">🏅</span> INCLUDES CERTIFICATE
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                    Fundamentals of digital marketing
                </h1>
                <p className="text-gray-500 text-lg mb-6">
                    Learn the fundamentals of digital marketing to help your business or career.
                </p>


                <div className="flex items-center gap-6 mb-8">
                    <Image
                        src="/assets/images/course/open-university-logo.png"
                        alt="Open University"
                        width={40}
                        height={40}
                    />
                    <Image
                        src="/assets/images/course/iab-europe-logo.png"
                        alt="IAB Europe"
                        width={40}
                        height={40}
                    />
                </div>


                <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary transition">
                    Start Course
                </button>
            </div>
        </section>

    )
}
export default CourseCover
