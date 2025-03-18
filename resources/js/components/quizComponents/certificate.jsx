import { CalendarDays, Award, QrCode } from "lucide-react"
import { memo } from "react"


// Memoize the Certificate component to prevent unnecessary re-renders
export const Certificate = memo(function Certificate({
    userName,
    courseName,
    completionDate,
    score,
}) {
    return (
        // Component content remains the same
        <div className="relative w-full max-w-3xl mx-auto bg-white border-8 border-secondary/20 rounded-lg overflow-hidden">
            {/* Certificate background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
            </div>

            {/* Certificate content */}
            <div className="relative p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-alpha rounded-full flex items-center justify-center">
                            <Award className="h-10 w-10 text-white" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-bold text-alpha ">LearnHub</h2>
                            <p className="text-sm text-beta">Certificate of Completion</p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-20 h-20 bg-muted/20 rounded-lg flex items-center justify-center">
                            <QrCode className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="text-center my-12">
                    <h1 className="text-2xl md:text-3xl font-serif mb-2 text-alpha">Certificate of Achievement</h1>
                    <p className="text-muted-foreground mb-8">This certifies that</p>

                    <h2 className="text-2xl md:text-4xl font-bold text-black my-4 font-serif">{userName}</h2>

                    <p className="text-muted-foreground mb-4">has successfully completed</p>

                    <h3 className="text-xl md:text-2xl font-bold my-4 text-beta">{courseName}</h3>

                    <p className="text-muted-foreground mb-2">with a score of</p>
                    <div className="text-2xl md:text-3xl font-bold text-secondary my-2">{score}%</div>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-muted">
                    <div className="flex items-center mb-4 md:mb-0">
                        <CalendarDays className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Issued on {completionDate}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-20 h-0.5 bg-alpha"></div>
                        {/* <Image
                            src="/placeholder.svg?height=60&width=120&text=Signature"
                            alt="Signature"
                            width={120}
                            height={60}
                            className="opacity-80"
                        /> */}
                    </div>
                </div>

                {/* Certificate ID */}
                <div className="absolute bottom-2 right-4 text-xs text-muted-foreground/50">
                    Certificate ID: LH-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
            </div>
        </div>
    )
})

