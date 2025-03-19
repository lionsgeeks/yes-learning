"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Clock, HelpCircle, XCircle, Award } from "lucide-react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout";
import { Certificate } from "../../components/quizComponents/certificate"

export default function QuizPage() {

    // Mock quiz data
    const quizData = {
        title: "Web Development Basics Quiz",
        description: "Test your knowledge of web development fundamentals",
        timeLimit: 15, // minutes
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "Which of the following is NOT a front-end technology?",
                type: "single",
                options: [
                    { id: "a", text: "HTML" },
                    { id: "b", text: "CSS" },
                    { id: "c", text: "JavaScript" },
                    { id: "d", text: "PHP" },
                ],
                correctAnswer: "d",
            },
            {
                id: 2,
                question: "What does HTML stand for?",
                type: "single",
                options: [
                    { id: "a", text: "Hyper Text Markup Language" },
                    { id: "b", text: "High Tech Modern Language" },
                    { id: "c", text: "Hyper Transfer Markup Language" },
                    { id: "d", text: "Home Tool Markup Language" },
                ],
                correctAnswer: "a",
            },
            {
                id: 3,
                question: "Which of the following are valid CSS selectors? (Select all that apply)",
                type: "multiple",
                options: [
                    { id: "a", text: ".class-name" },
                    { id: "b", text: "#id-name" },
                    { id: "c", text: "*element" },
                    { id: "d", text: "element > child" },
                ],
                correctAnswer: ["a", "b", "d"],
            },
            {
                id: 4,
                question: "Which HTML tag is used to create a hyperlink?",
                type: "single",
                options: [
                    { id: "a", text: "<link>" },
                    { id: "b", text: "<a>" },
                    { id: "c", text: "<href>" },
                    { id: "d", text: "<url>" },
                ],
                correctAnswer: "b",
            },
            {
                id: 5,
                question: "What is the correct CSS syntax for making all text elements bold?",
                type: "single",
                options: [
                    { id: "a", text: "text {font-weight: bold;}" },
                    { id: "b", text: "text-all {font-weight: bold;}" },
                    { id: "c", text: "all {text-weight: bold;}" },
                    { id: "d", text: "body {font: bold;}" },
                ],
                correctAnswer: "a",
            },
        ],
    }

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState({})
    const [quizSubmitted, setQuizSubmitted] = useState(false)
    const timeRemainingRef = useRef(quizData.timeLimit * 60) // seconds
    const [timeDisplay, setTimeDisplay] = useState(quizData.timeLimit * 60)

    useEffect(() => {
        if (quizSubmitted) return

        const timer = setInterval(() => {
            if (timeRemainingRef.current > 0) {
                timeRemainingRef.current -= 1
                setTimeDisplay(timeRemainingRef.current)
            } else {
                clearInterval(timer)
                handleSubmitQuiz()
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [quizSubmitted])

    const question = quizData.questions[currentQuestion]

    const handleSingleAnswer = (value) => {
        setAnswers({
            ...answers,
            [question.id]: value,
        })
    }

    const handleMultipleAnswer = (value) => {
        const currentAnswers = (answers[question.id]) || []

        if (currentAnswers.includes(value)) {
            setAnswers({
                ...answers,
                [question.id]: currentAnswers.filter((item) => item !== value),
            })
        } else {
            setAnswers({
                ...answers,
                [question.id]: [...currentAnswers, value],
            })
        }
    }

    const isAnswered = (questionId) => {
        return !!answers[questionId]
    }

    const calculateScore = () => {
        let correctCount = 0

        quizData.questions.forEach((question) => {
            const userAnswer = answers[question.id]

            if (question.type === "single" && userAnswer === question.correctAnswer) {
                correctCount++
            } else if (question.type === "multiple") {
                const userAnswerArray = (userAnswer) || []
                const correctAnswerArray = question.correctAnswer

                if (
                    userAnswerArray.length === correctAnswerArray.length &&
                    userAnswerArray.every((item) => correctAnswerArray.includes(item))
                ) {
                    correctCount++
                }
            }
        })

        return (correctCount / quizData.questions.length) * 100
    }

    const handleSubmitQuiz = () => {
        setQuizSubmitted(true)
    }

    const isCorrectAnswer = (questionId) => {
        const question = quizData.questions.find((q) => q.id === questionId)
        if (!question) return false

        const userAnswer = answers[questionId]

        if (question.type === "single") {
            return userAnswer === question.correctAnswer
        } else {
            const userAnswerArray = (userAnswer) || []
            const correctAnswerArray = question.correctAnswer

            return (
                userAnswerArray.length === correctAnswerArray.length &&
                userAnswerArray.every((item) => correctAnswerArray.includes(item))
            )
        }
    }

    const score = quizSubmitted ? calculateScore() : 0
    const passed = score >= quizData.passingScore

    const { quiz } = usePage().props;

    const breadcrumbs = [

        {
            title: 'Quiz Title',
            href: `/quiz/${quiz.id}`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mb-6 p-6">
                <Link
                    href={"/course/" + quiz.id}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Course
                </Link>
                <h1 className="text-2xl font-bold mt-2">{quizData.title}</h1>
                <p className="text-muted-foreground">{quizData.description}</p>
            </div>

            {!quizSubmitted ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Question {currentQuestion + 1} of {quizData.questions.length}
                                        </CardTitle>
                                        <CardDescription>
                                            {question.type === "single" ? "Select one answer" : "Select all that apply"}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-medium mb-6">{question.question}</div>

                                {question.type === "single" ? (
                                    <RadioGroup value={(answers[question.id]) || ""} onValueChange={handleSingleAnswer}>
                                        <div className="space-y-3">
                                            {question.options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                                                >
                                                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                                                    <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                                                        {option.text}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                ) : (
                                    <div className="space-y-3">
                                        {question.options.map((option) => (
                                            <div
                                                key={option.id}
                                                className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                                            >
                                                <Checkbox
                                                    id={`option-${option.id}`}
                                                    checked={((answers[question.id]) || []).includes(option.id)}
                                                    onCheckedChange={() => handleMultipleAnswer(option.id)}
                                                />
                                                <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                                                    {option.text}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                                    disabled={currentQuestion === 0}
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Previous
                                </Button>

                                {currentQuestion < quizData.questions.length - 1 ? (
                                    <Button
                                        onClick={() => setCurrentQuestion((prev) => Math.min(quizData.questions.length - 1, prev + 1))}
                                        disabled={!isAnswered(question.id)}
                                    >
                                        Next
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button onClick={handleSubmitQuiz} disabled={Object.keys(answers).length < quizData.questions.length}>
                                        Submit Quiz
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-5 gap-2">
                                    {quizData.questions.map((q, index) => (
                                        <Button
                                            key={q.id}
                                            variant={currentQuestion === index ? "default" : isAnswered(q.id) ? "outline" : "ghost"}
                                            className="h-10 w-10 p-0"
                                            onClick={() => setCurrentQuestion(index)}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Completion</span>
                                        <span>
                                            {Object.keys(answers).length} of {quizData.questions.length}
                                        </span>
                                    </div>
                                    <Progress value={(Object.keys(answers).length / quizData.questions.length) * 100} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz Results</CardTitle>
                                <CardDescription>
                                    You scored {score.toFixed(0)}% ({Math.round((score * quizData.questions.length) / 100)} of{" "}
                                    {quizData.questions.length} correct)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {passed && score >= 70 ? (
                                    <div className="space-y-6">
                                        <Alert className="bg-green-50 border-green-200">
                                            <div className="flex items-center">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                <AlertTitle className="text-green-700">
                                                    Congratulations! You've earned a certificate.
                                                </AlertTitle>
                                            </div>
                                            <AlertDescription className="mt-2">
                                                You've demonstrated excellent understanding of the material. Your certificate is ready below.
                                            </AlertDescription>
                                        </Alert>

                                        <div className="my-8 overflow-hidden rounded-lg shadow-lg">
                                            <Certificate
                                                userName="Alex Johnson"
                                                courseName="Web Development Basics"
                                                completionDate={new Date().toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                                score={Math.round(score)}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Alert className={passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                                        <div className="flex items-center">
                                            {passed ? (
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                            )}
                                            <AlertTitle className={passed ? "text-green-700" : "text-red-700"}>
                                                {passed ? "Congratulations! You passed the quiz." : "You did not pass the quiz."}
                                            </AlertTitle>
                                        </div>
                                        <AlertDescription className="mt-2">
                                            {passed
                                                ? "You've demonstrated a good understanding of the material. You can now proceed to the next module."
                                                : `The passing score is ${quizData.passingScore}%. Review the material and try again.`}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Separator className="my-6" />

                                <div className="space-y-6">
                                    {quizData.questions.map((q, index) => (
                                        <div key={q.id} className="border rounded-lg p-4">
                                            <div className="flex items-start gap-2">
                                                <div
                                                    className={`mt-0.5 flex-shrink-0 ${isCorrectAnswer(q.id) ? "text-green-500" : "text-red-500"
                                                        }`}
                                                >
                                                    {isCorrectAnswer(q.id) ? (
                                                        <CheckCircle className="h-5 w-5" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        Question {index + 1}: {q.question}
                                                    </div>

                                                    <div className="mt-3 space-y-2">
                                                        {q.options.map((option) => {
                                                            const isSelected =
                                                                q.type === "single"
                                                                    ? answers[q.id] === option.id
                                                                    : ((answers[q.id]) || []).includes(option.id)

                                                            const isCorrect =
                                                                q.type === "single"
                                                                    ? q.correctAnswer === option.id
                                                                    : (q.correctAnswer).includes(option.id)

                                                            return (
                                                                <div
                                                                    key={option.id}
                                                                    className={`flex items-center p-2 rounded ${isSelected && isCorrect
                                                                        ? "bg-green-50 border border-green-200"
                                                                        : isSelected && !isCorrect
                                                                            ? "bg-red-50 border border-red-200"
                                                                            : !isSelected && isCorrect
                                                                                ? "bg-blue-50 border border-blue-200"
                                                                                : "bg-muted/30 border"
                                                                        }`}
                                                                >
                                                                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                                                                        {isSelected && isCorrect && <CheckCircle className="h-4 w-4 text-green-500" />}
                                                                        {isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                                                                        {!isSelected && isCorrect && <HelpCircle className="h-4 w-4 text-blue-500" />}
                                                                    </div>
                                                                    <span
                                                                        className={`text-sm ${isSelected && isCorrect
                                                                            ? "text-green-700"
                                                                            : isSelected && !isCorrect
                                                                                ? "text-red-700"
                                                                                : !isSelected && isCorrect
                                                                                    ? "text-blue-700"
                                                                                    : ""
                                                                            }`}
                                                                    >
                                                                        {option.text}
                                                                    </span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" asChild>
                                    <Link href="/course/1">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Return to Course
                                    </Link>
                                </Button>

                                {passed ? (
                                    <Button asChild>
                                        <Link href="/module/104">
                                            Next Module
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            setQuizSubmitted(false)
                                            setAnswers({})
                                            setCurrentQuestion(0)
                                        }}
                                    >
                                        Retry Quiz
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1 text-sm">
                                            <span>Score</span>
                                            <span>{score.toFixed(0)}%</span>
                                        </div>
                                        <Progress
                                            value={score}
                                            className={`h-2 ${passed ? "bg-green-100" : "bg-red-100"}`}
                                            indicatorclassname={passed ? "bg-green-500" : "bg-red-500"}
                                        />
                                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                            <span>0%</span>
                                            <span className={passed ? "text-green-600" : "text-red-600"}>
                                                Passing: {quizData.passingScore}%
                                            </span>
                                            <span>100%</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Correct Answers</span>
                                            <span className="font-medium">{Math.round((score * quizData.questions.length) / 100)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Incorrect Answers</span>
                                            <span className="font-medium">
                                                {quizData.questions.length - Math.round((score * quizData.questions.length) / 100)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Time Taken</span>
                                            <span className="font-medium">
                                                {Math.floor((quizData.timeLimit * 60 - timeDisplay) / 60)}m{" "}
                                                {(quizData.timeLimit * 60 - timeDisplay) % 60}s
                                            </span>
                                        </div>
                                    </div>

                                    {passed && (
                                        <>
                                            <Separator />
                                            <div className="bg-green-50 border border-green-200 rounded-md p-3 text-center">
                                                <div className="flex justify-center mb-2">
                                                    <Award className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div className="text-sm font-medium text-green-800">Achievement Unlocked</div>
                                                <div className="text-xs text-green-600 mt-1">Quiz Master</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </AppLayout>
    )
}

