"use client";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
    const [courseTitle, setCourseTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [features, setFeatures] = useState<string[]>([]);
    const [price, setPrice] = useState("");
    const [hours, setHours] = useState("");
    const [modules, setModules] = useState("");
    const [lessons, setLessons] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const priceValue = parseFloat(price);
        const modulesValue = parseInt(modules);
        const lessonsValue = parseInt(lessons);

        if (!courseTitle || !subtitle || !description || !category || !hours || !image) {
            setError("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        if (description.length > 500) {
            setError("Description must not exceed 500 characters.");
            setIsSubmitting(false);
            return;
        }

        if (image && image.size > 5 * 1024 * 1024) {
            setError("Image size must not exceed 5MB.");
            setIsSubmitting(false);
            return;
        }

        if (price && (isNaN(priceValue) || priceValue < 0)) {
            setError("Price must be a positive number.");
            setIsSubmitting(false);
            return;
        }

        if (modules && (isNaN(modulesValue) || modulesValue < 0)) {
            setError("Modules must be a positive integer.");
            setIsSubmitting(false);
            return;
        }

        if (lessons && (isNaN(lessonsValue) || lessonsValue < 0)) {
            setError("Lessons must be a positive integer.");
            setIsSubmitting(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User not authenticated");

            const formData = new FormData();
            formData.append("courseTitle", courseTitle);
            formData.append("subtitle", subtitle);
            formData.append("description", description);
            formData.append("level", level);
            formData.append("price", price);
            formData.append("hours", hours);
            formData.append("category", category);
            formData.append("modules", modules);
            formData.append("lessons", lessons);
            if (image) formData.append("image", image);
            features.forEach((feature) => formData.append("features", feature));

            await axios.post("http://localhost:5500/api/courses", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Course creation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    🚀 Create Your <span className="text-orange-500">Tabaani</span> Course
                </h2>
                <p className="text-gray-600 text-lg">
                    Let’s build something amazing together! ✨
                </p>
            </div>

            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                {error && (
                    <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Input label="Course Title *" value={courseTitle} setValue={setCourseTitle} />
                            <Input label="Subtitle *" value={subtitle} setValue={setSubtitle} />
                            <Textarea label="Description * (max 500 characters)" value={description} setValue={setDescription} />
                            <Select label="Category *" value={category} setValue={setCategory} options={["Web Development", "Data Science", "Mobile Development", "Design", "Business"]} />
                            <FeaturesSelector value={features} setValue={setFeatures} />
                        </div>

                        <div className="space-y-4">
                            <Select label="Level *" value={level} setValue={setLevel} options={["Beginner", "Average", "Advanced"]} />
                            <Input label="Price ($)" value={price} setValue={setPrice} type="number" />
                            <Input label="Hours *" value={hours} setValue={setHours} />
                            <Input label="Modules" value={modules} setValue={setModules} type="number" />
                            <Input label="Lessons" value={lessons} setValue={setLessons} type="number" />
                            <ImageUploader image={image} setImage={setImage} />
                        </div>
                    </div>

                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-1/2 py-3 px-4 rounded-full font-semibold text-white transition duration-200 shadow-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
                        >
                            {isSubmitting ? "Creating..." : "🎓 Create Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const Input = ({ label, value, setValue, type = "text" }: any) => (
    <div>
        <label className="block text-gray-700 mb-1 font-medium">{label}</label>
        <input
            type={type}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
        />
    </div>
);

const Textarea = ({ label, value, setValue }: any) => (
    <div>
        <label className="block text-gray-700 mb-1 font-medium">{label}</label>
        <textarea
            rows={4}
            maxLength={500}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
        />
    </div>
);

const Select = ({ label, value, setValue, options }: any) => (
    <div>
        <label className="block text-gray-700 mb-1 font-medium">{label}</label>
        <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
        >
            <option value="">Select an option</option>
            {options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const FeaturesSelector = ({ value, setValue }: { value: string[]; setValue: (v: string[]) => void }) => {
    const options = ["Self-paced learning", "Video tutorials", "Unlimited access"];
    const toggleFeature = (feature: string) => {
        setValue(value.includes(feature) ? value.filter(f => f !== feature) : [...value, feature]);
    };
    return (
        <div>
            <label className="block text-gray-700 mb-1 font-medium">Course Features *</label>
            <div className="space-y-1">
                {options.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                        <input type="checkbox" checked={value.includes(option)} onChange={() => toggleFeature(option)} />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

const ImageUploader = ({ image, setImage }: any) => (
    <div>
        <label className="block text-gray-700 mb-1 font-medium">Course Image *</label>
        <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg hover:bg-orange-50 cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="pt-1 text-sm text-gray-500">{image ? image.name : "Upload thumbnail (max 5MB)"}</p>
                </div>
                <input
                    type="file"
                    className="opacity-0"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    required
                />
            </label>
        </div>
    </div>
);
