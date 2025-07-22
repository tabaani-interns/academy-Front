'use client';
import React, { useState } from 'react';

const Quiz = ({ questions = [] }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (questionIndex, option) => {
        setAnswers({ ...answers, [questionIndex]: option });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted answers:', answers);
        // You can handle submit logic here (API call, validation, etc.)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-sm text-dark mb-1">Final Assessment</h2>
            <h1 className="text-2xl text-dark font-semibold mb-6">
                You Are Ready To Take <br />
                The End Of Module Assessment.
            </h1>

            {questions.map((question, index) => (
                <div key={index} className="mb-8 border-b pb-6 text-dark">
                    <p className="font-bold uppercase mb-4">Question {index + 1}</p>
                    <p className="font-bold mb-4">{question.text}</p>

                    {question.options.map((option, optIndex) => (
                        <label key={optIndex} className="flex items-start mb-2 cursor-pointer">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={answers[index] === option}
                                onChange={() => handleChange(index, option)}
                                className="mr-2 mt-1"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            ))}

            <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
                Submit
            </button>
        </form>
    );
};

export default Quiz;
