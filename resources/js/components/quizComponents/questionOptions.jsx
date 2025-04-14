import { CheckCircle, HelpCircle, XCircle } from "lucide-react"


const QuestionsOptions = ({ q, answers, option, lang }) => {

    const isSelected =
        q.type === "multiple-choice" && !q.allow_multiple ?
            answers[q.id] === option.text[lang]
            : q.type === "multiple-choice" && q.allow_multiple ?
                ((answers[q.id]) || []).includes(option.text[lang])
                : q.type === "short-answer" ?
                    q.correct_answer[lang] == answers[q.id] : q.correct_answer == answers[q.id]


    const isCorrect =
        q.type === "multiple-choice" && !q.allow_multiple ?
            q.options.find((answ) => answ.isCorrect).text[lang] === option.text[lang]
            : q.type === "multiple-choice" && q.allow_multiple ?
                (q.options.filter(answ => answ.isCorrect).map(item => item.text[lang])).includes(option.text[lang])
                : q.type === "short-answer" ?
                    q.correct_answer[lang] == answers[q.id] : q.correct_answer == answers[q.id]


    switch (q.type) {
        case "multiple-choice":
            return (
                <>
                    <div
                        key={option.text[lang]}
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
                            {option.text[lang]}
                        </span>
                    </div>
                </>
            )

        case 'true-false':
            return (
                <>
                    <div>
                        The Correct Answer is : <span>{q.correct_answer ? 'True' : 'False'}</span>
                    </div>

                </>
            )

        case 'short-answer':
            return (
                <>
                    {
                        isCorrect ?
                            <div className="bg-green-50 border border-green-200 rounded">
                                <p className="p-2 rounded text-green-700">{q.correct_answer[lang]}</p>
                            </div>
                            :
                            <div className="flex flex-col gap-2">
                                <p className="bg-blue-50 border border-blue-200 rounded text-blue-700 p-2">Correct Answer : {q.correct_answer[lang]}</p>
                                <p className="bg-red-50 border border-red-200 rounded text-red-700 p-2">Your Answer : {answers[q.id]}</p>
                            </div>
                    }
                </>
            )

        default:
            return (
                <>
                    <h1>You Should Not Be Seeing This Text. If You Do Please Contact Us.</h1>
                </>
            )
            break;
    }

}

export default QuestionsOptions
