import Quiz from '@/components/Quiz';

const questions = [
    {
        text: 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR. ELIT IACULIS EUISMOD SIT O?',
        options: [
            'Option A',
            'Option B',
            'Option C',
            'Option D'
        ]
    },
    {
        text: 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR. ELIT IACULIS EUISMOD SIT O?',
        options: [
            'Option A',
            'Option B',
            'Option C',
            'Option D'
        ]
    },
    {
        text: 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR. ELIT IACULIS EUISMOD SIT O?',
        options: [
            'Option A',
            'Option B',
            'Option C',
            'Option D'
        ]
    },
];

export default function QuizPage() {
    return <Quiz questions={questions} />;
}
