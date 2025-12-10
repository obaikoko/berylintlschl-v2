import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function showZodErrors(error: unknown) {
  if (error instanceof ZodError) {
    error.errors.forEach((e) => toast.error(e.message));
  } else if (typeof error === "object" && error !== null && "data" in error) {
    const err = error as {
      data?: { message?: string; errors?: Record<string, string> };
    };

    if (err.data?.errors) {
      // show each field-specific message
      Object.values(err.data.errors).forEach((msg) => toast.error(msg));
    } else if (err.data?.message) {
      toast.error(err.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } else {
    toast.error("An unknown error occurred");
    console.log(error);
  }
}

export const levels: string[] = [
  "All",
  "Creche",
  "Day Care",
  "Reception",
  "Pre School",
  "Pre KG",
  "KG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SSS 1",
  "SSS 2",
  "SSS 3",
  "Graduated",
  "Withdrawn",
];

export const subLevels: string[] = ["A", "B", "C", "D", "E"];
export const grade: string[] = ["A", "B", "C", "D", "E", "F"];
export const categories: string[] = [
  "Attendance",
  "Carefulness",
  "Honesty",
  "Neatness",
  "Obedience",
  "Politeness",
  "Punctuality",
  "Responsibility",
];
export const psychomotorCategories = [
  "Handwriting",
  "Drawing",
  "Sport",
  "Speaking",
  "Music",
  "Craft",
  "ComputerPractice",
];

export const sessions: string[] = [
  "2024/2025",
  "2025/2026",
  "2026/2027",
  "2027/2028",
  "2028/2029",
  "2029/2030",
];
export const terms: string[] = ["First", "Second", "Third"];
export const subjects: string[] = [
  "Agricultural Science",
  "Basic Science",
  "Basic Technology",
  "Basic Science/Technology",
  "Biology",
  "Civic Education",
  "Christian Religious Studies",
  "Commerce",
  "Computer Studies",
  "Control Of Movement",
  "Creative Composition",
  "Cultural and Creative Arts",
  "Drawing And Colouring",
  "Economics",
  "English Language",
  "Financial Accounting",
  "Food And Nutrition",
  "French",
  "Further Mathematics",
  "Games",
  "Geography",
  "Government",
  "Hand Writing",
  "Health Habit",
  "History",
  "Home Economics",
  "Independence",
  "Integrated Science",
  "Islamic Religious Studies",
  "Language Practices",
  "Literature in English",
  "Mathematics",
  "Moral Intruction",
  "Music",
  "Nigerian Language",
  "Number Work",
  "Nursery Rhymes/Poems",
  "Object Identification",
  "Oral Number Work",
  "Phonics",
  "Phonics/Spellings",
  "Physical and Health Education",
  "Physics",
  "Prevocational Studies",
  "Quantitative Reasoning",
  "Responsibility",
  "Rhymes",
  "Science Skill",
  "Scribbling",
  "Singing",
  "Sociability",
  "Social Studies",
  "Social Habit",
  "Spelling Bee",
  "Tourism",
  "Verbal Reasoning",
  "Vocational Aptitude",
];

export const roles: string[] = [
  "Admin",
  "Principal",
  "HM",
  "Head Of Department",
  "Teacher",
];

export const statuses: string[] = ["active", "suspended"];
export const relationships: string[] = [
  "Father",
  "Mother",
  "Uncle",
  "Aunty",
  "Guardian",
];
export const days: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const genders: string[] = ["Male", "Female"];
export const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-100 text-blue-800",
  English: "bg-green-100 text-green-800",
  "English Language": "bg-green-100 text-green-800",
  Biology: "bg-pink-100 text-pink-800",
  Chemistry: "bg-yellow-100 text-yellow-800",
  Physics: "bg-purple-100 text-purple-800",
  "Civic Education": "bg-orange-100 text-orange-800",
  "Free Period": "bg-muted text-muted-foreground",
};

export const invoiceItems: string[] = [
  "Registration",
  "Tuition",
  "Report Card",
  "Text Books",
  "Exam Fee",
  "Social Fee",
  "Lesson",
  "First  AID",
  "Laboratory",
  "Sport",
  "Uniform",
  "Computer",
  "P.T.A",
  "Development",
  "Library",
  "Caution",
  "Continuous Assesment",
];
