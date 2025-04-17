import { useState } from "react"
import { Globe, Check, ChevronLeft, ChevronRight, Layers } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import AppLayout from "@/layouts/app-layout";
import { router, useForm } from "@inertiajs/react";


export default function MultiStepSelector({courses}) {
    const [step, setStep] = useState(1)
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [selectedcourses, setSelectedcourses] = useState([])
const { data, setData, post, processing, errors, reset } = useForm({
   language: "",
    courses: [],
});





    // TODO: store languages locally ??
    const languages = [
        { code: "en", name: "English", nativeName: "English" },
        { code: "fr", name: "French", nativeName: "Français" },
        { code: "ar", name: "Arabic", nativeName: "العربية" },
    ]

    // TODO: Change the IDs to numbers corresponding to Database
    // const courses = [
    //     { id: "1", name: "Dashboard", description: "Overview and analytics", icon: <Layers className="h-6 w-6 text-beta" /> },
    //     { id: "2", name: "User Management", description: "Manage user accounts", icon: <Layers className="h-6 w-6 text-beta" /> },
    //     {
    //         id: "3",
    //         name: "Content Library",
    //         description: "Manage your content",
    //         icon: <Layers className="h-6 w-6 text-beta" />,
    //     },
    //     {
    //         id: "4",
    //         name: "Analytics",
    //         description: "Data insights and reports",
    //         icon: <Layers className="h-6 w-6 text-beta" />,
    //     },
    //     { id: "5", name: "Settings", description: "System configuration", icon: <Layers className="h-6 w-6 text-beta" /> },
    //     { id: "6", name: "Messaging", description: "Communication tools", icon: <Layers className="h-6 w-6 text-beta" /> },
    //     { id: "7", name: "Calendar", description: "Schedule and events", icon: <Layers className="h-6 w-6 text-beta" /> },
    //     { id: "8", name: "File Storage", description: "Document management", icon: <Layers className="h-6 w-6 text-beta" /> },
    //     {
    //         id: "9",
    //         name: "Integrations",
    //         description: "Connect with other services",
    //         icon: <Layers className="h-6 w-6 text-beta" />,
    //     },
    // ]

    const toggleModule = (moduleId) => {
        const updated = selectedcourses.includes(moduleId)
            ? selectedcourses.filter((id) => id !== moduleId)
            : [...selectedcourses, moduleId];

        setSelectedcourses(updated);
        setData("courses", updated);
    };


    const handleNext = () => {
        if (step === 1) {
            setStep(2)
        } else {
            // console.log(`Selected language: ${selectedLanguage}, Selected courses: ${selectedcourses.join(", ")}`)
            post(route('stepss'), {
                onSuccess: () => {
                    router.visit('dashboard')
                },
                onError: (errors) => {
                    console.error("Form submission error:", errors)
                },
            });

        }
    }

    const handleBack = () => {
        setStep(1)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            {/* Progress indicator */}
            <div className="mb-8 flex items-center gap-2">
                <div
                    className={cn("h-4 w-12 rounded-full transition-all duration-300", step === 1 ? "bg-alpha" : "bg-gray-500")}
                />
                <div
                    className={cn("h-4 w-12 rounded-full transition-all duration-300", step === 2 ? "bg-alpha" : "bg-gray-500")}
                />
            </div>

            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="language-step"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex w-full max-w-4xl flex-col items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-12 relative"
                        >
                            <Globe className="h-24 w-24 text-alpha opacity-90" />
                            <div className="bg-beta h-4 w-4 rounded-full absolute top-0 right-0"></div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-8 text-center text-2xl font-light tracking-wide md:text-3xl"
                        >
                            Select your preferred language
                        </motion.h1>

                        <div className="grid max-w-3xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
                            {languages.map((language) => (
                                <motion.button
                                    key={language.code}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.3 + languages.findIndex((l) => l.code === language.code) * 0.1,
                                        duration: 0.4,
                                    }}
                                    onClick={() => {setData("language", language.code);   setSelectedLanguage(language.code);}}
                                    className={cn(
                                        "group relative flex gap-3  h-16 items-center justify-center rounded-lg border border-gray-500 px-6 py-4 text-lg transition-all duration-300",
                                        "hover:border-alpha/40 hover:bg-alpha/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black",
                                        selectedLanguage === language.code && "border-white/60 bg-alpha/20",
                                    )}
                                    aria-pressed={selectedLanguage === language.code}
                                >
                                    <span className="font-medium">{language.nativeName}</span>
                                    {selectedLanguage === language.code && (
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-alpha/80">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                    <span className="sr-only">{language.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="courses-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex w-full max-w-5xl flex-col items-center px-4"
                    >
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-2 text-center text-2xl font-light tracking-wide md:text-3xl"
                        >
                            Select your courses
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-8 text-center text-white/70"
                        >
                            Choose the courses you want to enable (select multiple)
                        </motion.p>

                        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {courses.map((module, index) => (
                                <motion.button
                                    key={module.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                                    onClick={() => toggleModule(module.id)}
                                    className={cn(
                                        "group flex items-start gap-4 rounded-lg border border-alpha/20 p-6 text-left transition-all duration-200",
                                        "hover:border-alpha/40 hover:bg-alpha/5 focus:outline-none focus:ring-2 focus:ring-alpha/30 focus:ring-offset-2 focus:ring-offset-black",
                                        selectedcourses.includes(module.id) && "border-alpha/60 bg-alpha/10",
                                    )}
                                    aria-pressed={selectedcourses.includes(module.id)}
                                >
                                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-alpha/10", selectedcourses.includes(module.id) && "bg-alpha")}>
                                    <Layers className="h-6 w-6 text-beta" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">{module.name[data.language]}</h3>
                                            {selectedcourses.includes(module.id) && (
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-beta">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        {/* <p className="mt-1 text-sm ">{module.description[data.language]}</p> */}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-10 flex items-center gap-3"
            >
                {step === 2 && (
                    <button
                        className="flex items-center gap-1 rounded-lg border border-gray-500 px-5 py-2.5 transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
                        onClick={handleBack}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </button>
                )}
                <button
                    className={cn(
                        "flex items-center gap-1 rounded-lg px-6 py-2.5 text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer",
                        step === 1
                            ? "bg-alpha hover:bg-alpha/90 focus:ring-alpha/50"
                            : "bg-gradient-to-r from-alpha to-beta hover:opacity-90 focus:ring-beta/50",
                    )} onClick={handleNext }
                >
                    {step === 1 ? "Continue" : "Complete Setup"}
                    <ChevronRight className="h-4 w-4" />
                </button>
            </motion.div>

            {step === 2 && selectedcourses.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-4 text-sm text-beta"
                >
                    {selectedcourses.length} module{selectedcourses.length !== 1 ? "s" : ""} selected
                </motion.div>
            )}
        </div>
    )
}

