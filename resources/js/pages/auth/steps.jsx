import { useState } from "react"
import { Globe, Check, ChevronLeft, ChevronRight, Layers } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import AppLayout from "@/layouts/app-layout";
import { router } from "@inertiajs/react";


export default function MultiStepSelector() {
    const [step, setStep] = useState(1)
    const [selectedLanguage, setSelectedLanguage] = useState("en")
    const [selectedModules, setSelectedModules] = useState([])

    // TODO: store languages locally ??
    const languages = [
        { code: "en", name: "English", nativeName: "English" },
        { code: "fr", name: "French", nativeName: "Français" },
        { code: "ar", name: "Arabic", nativeName: "العربية" },
    ]

    // TODO: Change the IDs to numbers corresponding to Database
    const modules = [
        { id: "dashboard", name: "Dashboard", description: "Overview and analytics", icon: <Layers className="h-6 w-6" /> },
        { id: "users", name: "User Management", description: "Manage user accounts", icon: <Layers className="h-6 w-6" /> },
        {
            id: "content",
            name: "Content Library",
            description: "Manage your content",
            icon: <Layers className="h-6 w-6" />,
        },
        {
            id: "analytics",
            name: "Analytics",
            description: "Data insights and reports",
            icon: <Layers className="h-6 w-6" />,
        },
        { id: "settings", name: "Settings", description: "System configuration", icon: <Layers className="h-6 w-6" /> },
        { id: "messaging", name: "Messaging", description: "Communication tools", icon: <Layers className="h-6 w-6" /> },
        { id: "calendar", name: "Calendar", description: "Schedule and events", icon: <Layers className="h-6 w-6" /> },
        { id: "files", name: "File Storage", description: "Document management", icon: <Layers className="h-6 w-6" /> },
        {
            id: "integrations",
            name: "Integrations",
            description: "Connect with other services",
            icon: <Layers className="h-6 w-6" />,
        },
    ]

    const toggleModule = (moduleId) => {
        setSelectedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
    }

    const handleNext = () => {
        if (step === 1) {
            setStep(2)
        } else {
            console.log(`Selected language: ${selectedLanguage}, Selected modules: ${selectedModules.join(", ")}`)
            // TODO: Submit Form update the selected language and modules in the backend
            router.visit('dashboard');

        }
    }

    const handleBack = () => {
        setStep(1)
    }

    const breadcrumbs = {
        title: 'Steps',
        href: '/steps'
    }
    return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
                {/* Progress indicator */}
                <div className="mb-8 flex items-center gap-2">
                    <div
                        className={cn("h-2 w-2 rounded-full transition-all duration-300", step === 1 ? "bg-white" : "bg-white/30")}
                    />
                    <div
                        className={cn("h-2 w-2 rounded-full transition-all duration-300", step === 2 ? "bg-white" : "bg-white/30")}
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
                                className="mb-12"
                            >
                                <Globe className="h-16 w-16 text-white opacity-90" />
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
                                        onClick={() => setSelectedLanguage(language.code)}
                                        className={cn(
                                            "group relative flex gap-3  h-16 items-center justify-center rounded-lg border border-white/20 px-6 py-4 text-lg transition-all duration-300",
                                            "hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black",
                                            selectedLanguage === language.code && "border-white/60 bg-white/10",
                                        )}
                                        aria-pressed={selectedLanguage === language.code}
                                    >
                                        <span className="font-medium">{language.nativeName}</span>
                                        {selectedLanguage === language.code && (
                                            <div className=" right-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
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
                            key="modules-step"
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
                                Select your modules
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-8 text-center text-white/70"
                            >
                                Choose the modules you want to enable (select multiple)
                            </motion.p>

                            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {modules.map((module, index) => (
                                    <motion.button
                                        key={module.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                                        onClick={() => toggleModule(module.id)}
                                        className={cn(
                                            "group flex items-start gap-4 rounded-lg border border-white/20 p-4 text-left transition-all duration-200",
                                            "hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black",
                                            selectedModules.includes(module.id) && "border-white/60 bg-white/10",
                                        )}
                                        aria-pressed={selectedModules.includes(module.id)}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                                            {module.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">{module.name}</h3>
                                                {selectedModules.includes(module.id) && (
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                                        <Check className="h-3 w-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm text-white/70">{module.description}</p>
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
                            className="flex items-center gap-1 rounded-lg border border-white/30 px-5 py-2.5 text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black"
                            onClick={handleBack}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </button>
                    )}
                    <button
                        className="flex items-center gap-1 rounded-lg bg-white px-6 py-2.5 text-black transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black"
                        onClick={handleNext}
                    >
                        {step === 1 ? "Continue" : "Complete Setup"}
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </motion.div>

                {step === 2 && selectedModules.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 text-sm text-white/60"
                    >
                        {selectedModules.length} module{selectedModules.length !== 1 ? "s" : ""} selected
                    </motion.div>
                )}
            </div>
    )
}

