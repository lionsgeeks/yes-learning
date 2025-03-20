import AppLayout from '@/layouts/app-layout';

import QuizStudentScore from '../../components/quizComponents/studentTable';
import CreateQuizPage from '../../components/quizComponents/createQuiz';

export default function QuizIndex() {

    return (
        <AppLayout>
            {/* Quiz Creation Component */}
            <CreateQuizPage />


            {/* Student Score Table */}
            <QuizStudentScore />


        </AppLayout>
    )
}
