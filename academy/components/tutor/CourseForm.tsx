"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Save, X, DollarSign, BookOpen, Award } from "lucide-react";

interface Course {
  id?: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  status: "Draft" | "Published" | "Archived";
  certificate: boolean;
  shortDescription?: string;
  learningObjectives?: string[];
  prerequisites?: string[];
  duration?: number;
  language?: string;
}

interface CourseFormProps {
  course?: Course | null;
  onSave: (course: Partial<Course>) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  course,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Course>>({
    title: course?.title || "",
    description: course?.description || "",
    shortDescription: course?.shortDescription || "",
    thumbnail: course?.thumbnail || "",
    price: course?.price || 0,
    level: course?.level || "Beginner",
    category: course?.category || "",
    status: course?.status || "Draft",
    certificate: course?.certificate || false,
    learningObjectives: course?.learningObjectives || [""],
    prerequisites: course?.prerequisites || [""],
    duration: course?.duration || 0,
    language: course?.language || "English",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    course?.thumbnail || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Other",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Portuguese",
    "Arabic",
    "Russian",
    "Hindi",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleArrayChange = (
    field: "learningObjectives" | "prerequisites",
    index: number,
    value: string
  ) => {
    const currentArray = formData[field] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (field: "learningObjectives" | "prerequisites") => {
    const currentArray = formData[field] || [];
    handleInputChange(field, [...currentArray, ""]);
  };

  const removeArrayItem = (
    field: "learningObjectives" | "prerequisites",
    index: number
  ) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    handleInputChange(field, newArray);
  };

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setThumbnailPreview(result);
        handleInputChange("thumbnail", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Course title is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Course description is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (formData.price === undefined || formData.price < 0) {
      newErrors.price = "Please enter a valid price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Filter out empty learning objectives and prerequisites
      const cleanedData = {
        ...formData,
        learningObjectives:
          formData.learningObjectives?.filter((obj) => obj.trim() !== "") || [],
        prerequisites:
          formData.prerequisites?.filter((req) => req.trim() !== "") || [],
      };

      onSave(cleanedData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            {course ? "Edit Course" : "Create New Course"}
          </CardTitle>
          <CardDescription>
            {course
              ? "Update your course information"
              : "Fill in the details to create a new course"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("title", e.target.value)
                }
                placeholder="Enter course title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Course Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("description", e.target.value)
              }
              placeholder="Provide a detailed description of your course"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("shortDescription", e.target.value)
              }
              placeholder="Brief summary for course cards (optional)"
              rows={2}
            />
          </div>

          {/* Course Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  handleInputChange(
                    "level",
                    value as "Beginner" | "Intermediate" | "Advanced"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("price", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                  className={`pl-10 ${errors.price ? "border-red-500" : ""}`}
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => handleInputChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and Certificate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                min="0"
                value={formData.duration}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("duration", parseInt(e.target.value) || 0)
                }
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <Switch
                id="certificate"
                checked={formData.certificate}
                onCheckedChange={(checked: boolean) =>
                  handleInputChange("certificate", checked)
                }
              />
              <Label htmlFor="certificate" className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Provide Certificate upon completion
              </Label>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <div className="flex items-center space-x-4">
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </div>
                </Label>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="space-y-2">
            <Label>Learning Objectives</Label>
            <p className="text-sm text-gray-500">
              What will students learn from this course?
            </p>
            {formData.learningObjectives?.map((objective, index) => (
              <div
                key={`objective-${index}`}
                className="flex items-center space-x-2"
              >
                <Input
                  value={objective}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleArrayChange(
                      "learningObjectives",
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Enter a learning objective"
                />
                {formData.learningObjectives!.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("learningObjectives", index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("learningObjectives")}
              className="w-full"
            >
              Add Learning Objective
            </Button>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <Label>Prerequisites</Label>
            <p className="text-sm text-gray-500">
              What should students know before taking this course?
            </p>
            {formData.prerequisites?.map((prerequisite, index) => (
              <div
                key={`prerequisite-${index}`}
                className="flex items-center space-x-2"
              >
                <Input
                  value={prerequisite}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleArrayChange("prerequisites", index, e.target.value)
                  }
                  placeholder="Enter a prerequisite"
                />
                {formData.prerequisites!.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("prerequisites", index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("prerequisites")}
              className="w-full"
            >
              Add Prerequisite
            </Button>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Course Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleInputChange(
                  "status",
                  value as "Draft" | "Published" | "Archived"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-black hover:bg-gray-800">
          <Save className="w-4 h-4 mr-2" />
          {course ? "Update Course" : "Create Course"}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
