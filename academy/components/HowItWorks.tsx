import React from 'react';

const HowItWorks = () => {
    return (
        <section className="container mx-auto px-4 py-8">
            <h3 className="text-3xl text-center text-gray-900 font-roboto">How it works</h3>

            <div className="flex flex-col md:flex-row justify-center gap-8 py-12">

                <div className="flex flex-col items-center  text-center  max-w-[395px]">
                    <div className="w-16 h-16 rounded-full bg-cyan-950 text-white flex items-center justify-center text-2xl font-bold shadow-md mb-4">
                        1
                    </div>
                    <p className="font-roboto text-gray-700">
                        Learn new skills with our bite-sized video tutorials, then test your knowledge with a quick quiz.
                    </p>
                </div>


                <div className="flex flex-col items-center  text-center  max-w-[395px]">
                    <div className="w-16 h-16 rounded-full bg-cyan-950 text-white flex items-center justify-center text-2xl font-bold shadow-md mb-4">
                        2
                    </div>
                    <p className="font-roboto text-gray-700">
                        Pass the final 40-question exam and get certified.
                    </p>
                </div>


                <div className="flex flex-col items-center  text-center  max-w-[395px]">
                    <div className="w-16 h-16 rounded-full bg-cyan-950 text-white flex items-center justify-center text-2xl font-bold shadow-md mb-4">
                        3
                    </div>
                    <p className="font-roboto text-gray-700">
                        Download and showcase your new qualification on LinkedIn and your CV.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
