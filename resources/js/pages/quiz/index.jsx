import AppLayout from '@/layouts/app-layout';

import QuizStudentScore from '../../components/quizComponents/studentTable';
import CreateQuizPage from '../../components/quizComponents/createQuiz';
import { Head } from '@inertiajs/react';

export default function QuizIndex() {

    return (
        <AppLayout>
        <Head title='Quiz Components' />
            <div className='grid lg:grid-cols-4 gap-3 p-6'>

                {/* Quiz Creation Component */}
                <div className='col-span-3'>
                    <CreateQuizPage />
                </div>


                {/* Student Score Table */}
                <div className='cols-span-1'>
                    <h1 className='text-xl font-semibold'>Students' Scores : </h1>
                    <QuizStudentScore />
                </div>

            </div>

        </AppLayout>
    )
}
