"use client"

import React from 'react'
import {FaqSectionWithCategories} from "@/components/faq-with-categories";
import HowItWorks from "@/components/HowItWorks";
import CourseDetails from "@/components/CourseDetails";

const DEMO_FAQS = [
    {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply sign up for an account and follow our quick setup guide. We'll walk you through each step of the process.",
        category: "Getting Started",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
        category: "Billing",
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
        category: "Pricing",
    },
    {
        question: "How can I contact support?",
        answer: "Our support team is available 24/7 through our help center, email support, or live chat. We typically respond within 2 hours.",
        category: "Support",
    },
];


const Page = () => {
    return (
        <>
            <CourseDetails />
            <HowItWorks/>
            <FaqSectionWithCategories
                title="FAQs"
                description=""
                items={DEMO_FAQS}
                contactInfo={{
                    title: "",
                    buttonText: "See All FAQs",
                    onContact: () => console.log("Contact support clicked"),
                }}
            />
        </>
    )
}
export default Page
