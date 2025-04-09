import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {  Plus, Save, Trash2,  Copy } from "lucide-react"
import { useForm } from "@inertiajs/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// TODO* : disabled the button if any inputs are empty

export default function CreateQuizPage({ course_id, courseQuiz }) {
    const { data, setData, post, delete: destroy } = useForm({
        quizTitle: {
            en: courseQuiz ? JSON.parse(courseQuiz.title)?.en || "" : "",
            fr: courseQuiz ? JSON.parse(courseQuiz.title)?.fr || "" : "",
            ar: courseQuiz ? JSON.parse(courseQuiz.title)?.ar || "" : "",
        },
        quizDescription: {
            en: courseQuiz ? JSON.parse(courseQuiz.description)?.en || "" : "",
            fr: courseQuiz ? JSON.parse(courseQuiz.description)?.fr || "" : "",
            ar: courseQuiz ? JSON.parse(courseQuiz.description)?.ar || "" : "",
        },
        quizTime: courseQuiz?.time || '',
        quizPublish: courseQuiz?.publish || 0,
        questions: courseQuiz?.questions || [],
        course_id: course_id,
    });;

    const addQuestion = (type) => {
        const newId = data.questions?.length > 0 ? Math.max(...data.questions?.map((q) => q.id)) + 1 : 1

        let newQuestion;

        switch (type) {
            case "multiple-choice":
                newQuestion = {
                    id: newId,
                    type: "multiple-choice",
                    text: {
                        en: '',
                        fr: '',
                        ar: '',
                    },
                    options: [{
                        id: 1, text: { en: '', fr: '', ar: '', }, isCorrect: true
                    },
                    {
                        id: 2, text: { en: '', fr: '', ar: '', }, isCorrect: false
                    },
                    {
                        id: 3, text: { en: '', fr: '', ar: '', }, isCorrect: false
                    },
                    {
                        id: 4, text: { en: '', fr: '', ar: '', }, isCorrect: false
                    },
                    ],
                    allow_multiple: false,
                }
                break
            case "true-false":
                newQuestion = {
                    id: newId,
                    type: "true-false",
                    text: {
                        en: '',
                        fr: '',
                        ar: '',
                    },
                    correct_answer: true,
                }
                break
            case "short-answer":
                newQuestion = {
                    id: newId,
                    type: "short-answer",
                    text: {
                        en: '',
                        fr: '',
                        ar: '',
                    },
                    correct_answer: {
                        en: '',
                        fr: '',
                        ar: '',
                    },
                }
                break
            default:
                newQuestion = {
                    id: newId,
                    type: "true-false",
                    text: {
                        en: '',
                        fr: '',
                        ar: '',
                    },
                    correct_answer: true,
                }
        }

        const newQuestions = [...data.questions, newQuestion];
        setData('questions', newQuestions);
    }

    const removeQuestion = (id) => {
        const im_so_confused_at_this_point = courseQuiz?.questions?.some((q) => q.id === id)
        if (im_so_confused_at_this_point) {
            destroy(route('question.destroy', { question: id }))
        }
        const newQuestions = data.questions.filter((q) => q.id !== id);
        setData('questions', newQuestions);


    }

    const duplicateQuestion = (id) => {
        const questionToDuplicate = data.questions.find((q) => q.id === id)
        if (!questionToDuplicate) return

        const newId = data.questions?.length > 0 ? Math.max(...data.questions?.map((q) => q.id)) + 1 : 1
        const duplicatedQuestion = JSON.parse(JSON.stringify(questionToDuplicate))
        duplicatedQuestion.id = newId

        const newQuestions = [...questions, duplicatedQuestion];
        setData('questions', newQuestions);
    }


    const updateQuestionText = (questionId, lang, text) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId) {
                    return {
                        ...q,
                        text: {
                            ...q.text,
                            [lang]: text,  // Update only the text for the specified language
                        },
                    };
                }
                return q;
            }),
        });
    };



    const setCorrectOption = (questionId, optionText, lang) => {

        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    const mcQuestion = q;

                    if (mcQuestion.allow_multiple) {
                        // Toggle the selected option
                        return {
                            ...mcQuestion,
                            options: mcQuestion.options.map((o) => ({
                                ...o,
                                isCorrect: o.text[lang] === optionText ? !o.isCorrect : o.isCorrect,
                            })),
                        };
                    } else {
                        // Single selection - only one can be correct
                        return {
                            ...mcQuestion,
                            options: mcQuestion.options.map((o) => ({
                                ...o,
                                isCorrect: o.text[lang] === optionText,
                            })),
                        };
                    }
                }
                return q;
            }),
        });
    };


    const updateOptionText = (questionId, index, lang, text) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    return {
                        ...q,
                        options: q.options.map((o, i) => {
                            if (i === index) {
                                return {
                                    ...o,
                                    text: {
                                        ...(typeof o.text === 'object' && o.text !== null ? o.text : {}),
                                        [lang]: text, // Update only the text for the specified language
                                    },
                                };
                            }
                            return o;
                        }),
                    };
                }
                return q;
            }),
        });
    };


    const toggleallow_multiple = (questionId) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    const mcQuestion = q;
                    return {
                        ...mcQuestion,
                        allow_multiple: !mcQuestion.allow_multiple,
                    }
                }
                return q
            }),
        })
    }

    // True/False specific functions
    const setTrueFalseAnswer = (questionId, value) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "true-false") {
                    return {
                        ...q,
                        correct_answer: value,
                    }
                }
                return q
            }),
        })
    }

    // Short answer specific functions
    const updateShortAnswer = (questionId, lang, answer) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "short-answer") {
                    return {
                        ...q,
                        correct_answer: {
                            ...q.correct_answer,
                            [lang]: answer, // Update only the answer for the specified language
                        },
                    }
                }
                return q
            }),
        })
    }


    const renderQuestionEditor = (question, index) => {

        return (
            <Card key={question.id} className="mb-6">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle className="text-base flex items-center gap-2">
                            Question {index + 1}
                        </CardTitle>
                        <CardDescription>{getQuestionTypeLabel(question.type)}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => duplicateQuestion(question.id)} className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(question.id)}
                            className="text-destructive h-8 w-8"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove question</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">

                    <Tabs defaultValue="en">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="en">English</TabsTrigger>
                            <TabsTrigger value="fr">French</TabsTrigger>
                            <TabsTrigger value="ar">Arabic</TabsTrigger>
                        </TabsList>

                        {["en", "fr", "ar"].map((lang) => (
                            <TabsContent key={lang} value={lang}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`question-${question.id}`}>Question</Label>
                                            <Textarea
                                                id={`question-${question.id}`}
                                                value={question.text[lang]}
                                                onChange={(e) => updateQuestionText(question.id, lang, e.target.value)}
                                                placeholder="Enter your question"
                                                disabled={courseQuiz?.questions?.some((q) => q.id === question.id)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {question.type === "multiple-choice" && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Answer Options</Label>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`allow-multiple-${question.id}`}
                                                    checked={question.allow_multiple}
                                                    onCheckedChange={() => toggleallow_multiple(question.id)}
                                                    disabled={courseQuiz?.questions?.some((q) => q.id === question.id)}
                                                />
                                                <Label htmlFor={`allow-multiple-${question.id}`} className="text-sm">
                                                    Allow multiple correct answers
                                                </Label>
                                            </div>
                                        </div>

                                        {question.allow_multiple ? (
                                            <div className="space-y-2">
                                                {question.options.map((option, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`q${question.id}-option-${index}`}
                                                            checked={option.isCorrect}
                                                            onCheckedChange={() => setCorrectOption(question.id, option.text[lang], lang)}
                                                            disabled={courseQuiz?.questions?.some((q) => q.id === question.id) || !data.questions.find((q) => q.id === question.id)?.options.every(
                                                                (opt) => opt.text?.[lang]?.trim()
                                                            )}

                                                        />
                                                        <Input
                                                            value={option.text[lang]}
                                                            onChange={(e) => updateOptionText(question.id, index, lang, e.target.value)}
                                                            placeholder={`Option ${option.text[lang]}`}
                                                            className="flex-1"
                                                            disabled={courseQuiz?.questions?.some((q) => q.id === question.id)}
                                                            required
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <RadioGroup>
                                                {question.options.map((option, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value={option.text[lang]}
                                                            id={`q${question.id}-option-${option.text[lang]}`}
                                                            checked={option.isCorrect}
                                                            onClick={() => setCorrectOption(question.id, option.text[lang], lang)}
                                                            disabled={courseQuiz?.questions?.some((q) => q.id === question.id) || !data.questions.find((q) => q.id === question.id)?.options.every(
                                                                (opt) => opt.text?.[lang]?.trim()
                                                            )}

                                                        />
                                                        <Input
                                                            value={option.text[lang]}
                                                            onChange={(e) => updateOptionText(question.id, index, lang, e.target.value)}
                                                            placeholder={`Option ${option.text[lang]}`}
                                                            className="flex-1"
                                                            disabled={courseQuiz?.questions?.some((q) => q.id === question.id)}
                                                            required
                                                        />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        )}
                                    </div>
                                )}

                                {question.type === "true-false" && (
                                    <div className="space-y-2">
                                        <Label>Correct Answer</Label>
                                        <RadioGroup
                                            value={question.correct_answer == "1" ? "true" : "false"}
                                            onValueChange={(value) => setTrueFalseAnswer(question.id, value == "true")}
                                            className="flex space-x-4"
                                            disabled={courseQuiz?.questions?.some((q) => q.id === question.id)}

                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="true" id={`q${question.id}-true`} />
                                                <Label htmlFor={`q${question.id}-true`}>True</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="false" id={`q${question.id}-false`} />
                                                <Label htmlFor={`q${question.id}-false`}>False</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                )}

                                {question.type === "short-answer" && (
                                    <div className="space-y-2">
                                        <Label htmlFor={`answer-${question.id}`}>Correct Answer</Label>
                                        <Input
                                            id={`answer-${question.id}`}
                                            value={question.correct_answer[lang]}
                                            onChange={(e) => updateShortAnswer(question.id, lang, e.target.value)}
                                            placeholder="Enter the correct answer"
                                            disabled={courseQuiz?.questions?.some((q) => q.id === question.id)}
                                            required
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Students must enter this exact answer to be marked correct.
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>


                </CardContent>
            </Card>
        )
    }

    const getQuestionTypeLabel = (type) => {
        switch (type) {
            case "multiple-choice":
                return "Multiple choice question"
            case "true-false":
                return "True/False question"
            case "short-answer":
                return "Short answer question"
            default:
                return "Question"
        }
    }

    const handleSubmit = () => {
        post(route('quiz.store'), {
            onFinish: () => {
                setData({
                    title: '',
                    description: '',
                    timelimit: '',
                    published: 0,
                    chapter_id: 1,
                    questions: [],
                })
            }
        });

    }
    return (
        <div>
            <div className="flex items-center mb-6 gap-3">
                <h1 className="text-3xl font-bold tracking-tight">Create Quiz</h1>
            </div>




            <div className="flex flex-col gap-2">


                <Card>
                    <CardHeader>
                        <CardTitle>Quiz Information</CardTitle>
                        <CardDescription>Enter the basic information about your quiz</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Tabs defaultValue="en">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="en">English</TabsTrigger>
                                <TabsTrigger value="fr">French</TabsTrigger>
                                <TabsTrigger value="ar">Arabic</TabsTrigger>
                            </TabsList>

                            {["en", "fr", "ar"].map((lang) => (
                                <TabsContent key={lang} value={lang}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`title-${lang}`}>Title ({lang.toUpperCase()})</Label>
                                            <Input
                                                id={`title-${lang}`}
                                                placeholder={`Title (${lang.toUpperCase()})`}
                                                value={data.quizTitle[`${lang}`]}
                                                onChange={(e) =>
                                                    setData("quizTitle", {
                                                        ...data.quizTitle,
                                                        [`${lang}`]: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`description-${lang}`}>Description ({lang.toUpperCase()})</Label>
                                            <Input
                                                id={`description-${lang}`}
                                                placeholder={`Description (${lang.toUpperCase()})`}
                                                value={data.quizDescription[`${lang}`]}
                                                onChange={(e) =>
                                                    setData("quizDescription", {
                                                        ...data.quizDescription,
                                                        [`${lang}`]: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>

                        <div className="grid gap-2">
                            <Label htmlFor="quizTime">Time Limit (minutes)</Label>
                            <Input
                                id="quizTime"
                                type="number"
                                min="1"
                                value={data.quizTime}
                                onChange={(e) => setData('quizTime', e.target.value)}
                                placeholder="Enter time limit"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="quizPublish"
                                checked={data.quizPublish}
                                onCheckedChange={(checked) => setData('quizPublish', checked)}
                            />
                            <Label htmlFor="publish">Publish immediately</Label>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit}>
                    {
                        data.questions?.length === 0 ?
                            <div className="text-center py-12 border rounded-lg">
                                <h3 className="text-lg font-medium mb-2">No Questions Added</h3>
                                <p className="text-muted-foreground mb-4">Add your first question to get started</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <Button type="button" onClick={() => addQuestion("multiple-choice")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Multiple Choice
                                    </Button>
                                    <Button type="button" onClick={() => addQuestion("true-false")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        True/False
                                    </Button>
                                    <Button type="button" onClick={() => addQuestion("short-answer")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Short Answer
                                    </Button>
                                </div>
                            </div>
                            :
                            <>
                                {data.questions?.map((question, index) => renderQuestionEditor(question, index))}

                                <div className="flex flex-wrap gap-2 mt-6">
                                    <Button type="button" onClick={() => addQuestion("multiple-choice")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Multiple Choice
                                    </Button>
                                    <Button type="button" onClick={() => addQuestion("true-false")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add True/False
                                    </Button>
                                    <Button type="button" onClick={() => addQuestion("short-answer")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Short Answer
                                    </Button>
                                </div>
                            </>
                    }
                    <div className="flex justify-end gap-2 mt-8">
                        <Button type="submit"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Quiz
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

