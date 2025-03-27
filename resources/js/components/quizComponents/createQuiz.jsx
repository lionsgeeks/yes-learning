import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Save, Trash2, MoveDown, MoveUp, Copy } from "lucide-react"
import { Link, useForm } from "@inertiajs/react"

export default function CreateQuizPage({data, setData}) {

    const addQuestion = (type) => {
        console.log(data)
        const newId = data.questions?.length > 0 ? Math.max(...data.questions?.map((q) => q.id)) + 1 : 1

        let newQuestion;

        switch (type) {
            case "multiple-choice":
                newQuestion = {
                    id: newId,
                    type: "multiple-choice",
                    text: "",
                    options: [
                        { id: 1, text: "", isCorrect: true },
                        { id: 2, text: "", isCorrect: false },
                        { id: 3, text: "", isCorrect: false },
                        { id: 4, text: "", isCorrect: false },
                    ],
                    allowMultiple: false,
                }
                break
            case "true-false":
                newQuestion = {
                    id: newId,
                    type: "true-false",
                    text: "",
                    correctAnswer: true,
                }
                break
            case "short-answer":
                newQuestion = {
                    id: newId,
                    type: "short-answer",
                    text: "",
                    correctAnswer: "",
                }
                break
            default:
                newQuestion = {
                    id: newId,
                    type: "multiple-choice",
                    text: "",
                    options: [
                        { id: 1, text: "", isCorrect: true },
                        { id: 2, text: "", isCorrect: false },
                        { id: 1, text: "", isCorrect: false },
                        { id: 2, text: "", isCorrect: false },
                    ],
                    allowMultiple: false,
                }
        }

        const newQuestions = [...data.questions, newQuestion];
        setData('questions', newQuestions);
    }

    const removeQuestion = (id) => {
        const newQuestions = data.questions.filter((q) => q.id !== id);
        setData('questions', newQuestions);
    }

    const duplicateQuestion = (id) => {
        const questionToDuplicate = data.questions.find((q) => q.id === id)
        if (!questionToDuplicate) return

        const newId = Math.max(...data.questions.map((q) => q.id)) + 1
        const duplicatedQuestion = JSON.parse(JSON.stringify(questionToDuplicate))
        duplicatedQuestion.id = newId

        const newQuestions = [...questions, duplicatedQuestion];
        setData('questions', newQuestions);
    }

    const moveQuestionUp = (index) => {
        if (index === 0) return
        const newQuestions = [...questions]
            ;[newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]]
        setQuestions(newQuestions)
    }

    const moveQuestionDown = (index) => {
        if (index === questions.length - 1) return
        const newQuestions = [...questions]
            ;[newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]]
        setQuestions(newQuestions)
    }

    const changeQuestionType = (questionId, newType) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const baseQuestion = {
                        id: q.id,
                        text: q.text,
                    }

                    switch (newType) {
                        case "multiple-choice":
                            return {
                                ...baseQuestion,
                                type: "multiple-choice",
                                options:
                                    q.type === "multiple-choice"
                                        ? q.options
                                        : [
                                            { id: 1, text: "", isCorrect: false },
                                            { id: 2, text: "", isCorrect: false },
                                        ],
                                allowMultiple: false,
                            }
                        case "true-false":
                            return {
                                ...baseQuestion,
                                type: "true-false",
                                correctAnswer: true,
                            }
                        case "short-answer":
                            return {
                                ...baseQuestion,
                                type: "short-answer",
                                correctAnswer: "",
                            }
                        default:
                            return q
                    }
                }
                return q
            }),
        )
    }

    const updateQuestionText = (questionId, text) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId) {
                    return {
                        ...q,
                        text,  // Update question text
                    };
                }
                return q;
            }),
        });
    };

    // Multiple choice specific functions
    const addOption = (questionId) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    const mcQuestion = q;
                    const newOptionId = mcQuestion.options.length > 0 ? Math.max(...mcQuestion.options.map((o) => o.id)) + 1 : 1

                    return {
                        ...mcQuestion,
                        options: [...mcQuestion.options, { id: newOptionId, text: "", isCorrect: false }],
                    }
                }
                return q
            }),
        )
    }

    const removeOption = (questionId, optionId) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    const mcQuestion = q;
                    return {
                        ...mcQuestion,
                        options: mcQuestion.options.filter((o) => o.id !== optionId),
                    }
                }
                return q
            }),
        )
    }

    const setCorrectOption = (questionId, optionId) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    const mcQuestion = q;

                    if (mcQuestion.allowMultiple) {
                        // Toggle the selected option
                        return {
                            ...mcQuestion,
                            options: mcQuestion.options.map((o) => ({
                                ...o,
                                isCorrect: o.id === optionId ? !o.isCorrect : o.isCorrect,
                            })),
                        };
                    } else {
                        // Single selection - only one can be correct
                        return {
                            ...mcQuestion,
                            options: mcQuestion.options.map((o) => ({
                                ...o,
                                isCorrect: o.id === optionId,
                            })),
                        };
                    }
                }
                return q;
            }),
        });
    };


    const updateOptionText = (questionId, optionId, text) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    return {
                        ...q,
                        options: q.options.map((o) => {
                            if (o.id === optionId) {
                                return {
                                    ...o,
                                    text,  // Update option text
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

    const toggleAllowMultiple = (questionId) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "multiple-choice") {
                    const mcQuestion = q;
                    return {
                        ...mcQuestion,
                        allowMultiple: !mcQuestion.allowMultiple,
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
                        correctAnswer: value,
                    }
                }
                return q
            }),
        })
    }

    // Short answer specific functions
    const updateShortAnswer = (questionId, answer) => {
        setData({
            ...data,
            questions: data.questions.map((q) => {
                if (q.id === questionId && q.type === "short-answer") {
                    return {
                        ...q,
                        correctAnswer: answer,
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
                            {/* <Select value={question.type} onValueChange={(value) => changeQuestionType(question.id, value)}>
                                <SelectTrigger className="w-[180px] h-8">
                                    <SelectValue placeholder="Question Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                    <SelectItem value="true-false">True/False</SelectItem>
                                    <SelectItem value="short-answer">Short Answer</SelectItem>
                                </SelectContent>
                            </Select> */}
                        </CardTitle>
                        <CardDescription>{getQuestionTypeLabel(question.type)}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveQuestionUp(index)}
                            disabled={index === 0}
                            className="h-8 w-8"
                        >
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move up</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveQuestionDown(index)}
                            disabled={index === questions.length - 1}
                            className="h-8 w-8"
                        >
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move down</span>
                        </Button> */}
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
                    <div className="grid gap-2">
                        <Label htmlFor={`question-${question.id}`}>Question</Label>
                        <Textarea
                            id={`question-${question.id}`}
                            value={question.text}
                            onChange={(e) => updateQuestionText(question.id, e.target.value)}
                            placeholder="Enter your question"
                        />
                    </div>

                    {question.type === "multiple-choice" && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Answer Options</Label>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`allow-multiple-${question.id}`}
                                        checked={question.allowMultiple}
                                        onCheckedChange={() => toggleAllowMultiple(question.id)}
                                    />
                                    <Label htmlFor={`allow-multiple-${question.id}`} className="text-sm">
                                        Allow multiple correct answers
                                    </Label>
                                </div>
                            </div>

                            {question.allowMultiple ? (
                                <div className="space-y-2">
                                    {question.options.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`q${question.id}-option-${option.id}`}
                                                checked={option.isCorrect}
                                                onCheckedChange={() => setCorrectOption(question.id, option.id)}
                                            />
                                            <Input
                                                value={option.text}
                                                onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                                                placeholder={`Option ${option.id}`}
                                                className="flex-1"
                                            />
                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeOption(question.id, option.id)}
                                                disabled={question.options.length <= 2}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Remove option</span>
                                            </Button> */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <RadioGroup>
                                    {question.options.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={option.id.toString()}
                                                id={`q${question.id}-option-${option.id}`}
                                                checked={option.isCorrect}
                                                onClick={() => setCorrectOption(question.id, option.id)}
                                            />
                                            <Input
                                                value={option.text}
                                                onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                                                placeholder={`Option ${option.id}`}
                                                className="flex-1"
                                            />
                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeOption(question.id, option.id)}
                                                disabled={question.options.length <= 2}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Remove option</span>
                                            </Button> */}
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}

                            {/* <Button variant="outline" size="sm" onClick={() => addOption(question.id)} className="mt-2">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Option
                            </Button> */}
                        </div>
                    )}

                    {question.type === "true-false" && (
                        <div className="space-y-2">
                            <Label>Correct Answer</Label>
                            <RadioGroup
                                value={question.correctAnswer ? "true" : "false"}
                                onValueChange={(value) => setTrueFalseAnswer(question.id, value === "true")}
                                className="flex space-x-4"
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
                                value={question.correctAnswer}
                                onChange={(e) => updateShortAnswer(question.id, e.target.value)}
                                placeholder="Enter the correct answer"
                            />
                            <p className="text-sm text-muted-foreground">
                                Students must enter this exact answer to be marked correct.
                            </p>
                        </div>
                    )}

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
                        <div className="grid gap-2">
                            <Label htmlFor="quizTitle">Quiz Title</Label>
                            <Input
                                id="quizTitle"
                                value={data.quizTitle}
                                onChange={(e) => setData('quizTitle', e.target.value)}
                                placeholder="Enter quiz title"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quizDescription">Quiz Description</Label>
                            <Textarea
                                id="quizDescription"
                                value={data.quizDescription}
                                onChange={(e) => setData('quizDescription', e.target.value)}
                                placeholder="Enter quiz description"
                            />
                        </div>
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

                {data.questions?.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg">
                        <h3 className="text-lg font-medium mb-2">No Questions Added</h3>
                        <p className="text-muted-foreground mb-4">Add your first question to get started</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button onClick={() => addQuestion("multiple-choice")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Multiple Choice
                            </Button>
                            <Button onClick={() => addQuestion("true-false")}>
                                <Plus className="mr-2 h-4 w-4" />
                                True/False
                            </Button>
                            <Button onClick={() => addQuestion("short-answer")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Short Answer
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        {data.questions?.map((question, index) => renderQuestionEditor(question, index))}

                        <div className="flex flex-wrap gap-2 mt-6">
                            <Button onClick={() => addQuestion("multiple-choice")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Multiple Choice
                            </Button>
                            <Button onClick={() => addQuestion("true-false")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add True/False
                            </Button>
                            <Button onClick={() => addQuestion("short-answer")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Short Answer
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {/* <div className="flex justify-end gap-2 mt-8">
                <Button variant="outline" asChild>
                    <Link href="/quizzes">Cancel</Link>
                </Button>
                <Button onClick={handleSubmit}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Quiz
                </Button>
            </div> */}
        </div>
    )
}

