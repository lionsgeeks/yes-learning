<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ScheduledNewsletter;
use App\Models\User;
use App\Models\UserCourse;
use App\Mail\NEwsletterMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendScheduledNewsletters extends Command
{
    protected $signature = 'newsletter:send-scheduled';
    protected $description = 'Send scheduled newsletters at the right time';

    public function handle()
    {
        $now = Carbon::now();
        $scheduled = ScheduledNewsletter::where('schedule_date', '<=', $now)->get();

        foreach ($scheduled as $newsletter) {
            $subject = $newsletter->subject;
            $content = $newsletter->content;
            $courses = json_decode($newsletter->courses, true);
            $recipientType = $newsletter->recipient_type;

            $users = User::all();

            if ($recipientType === 'all') {
                foreach ($users as $user) {
                    Mail::to($user->email)->send(new NEwsletterMail($subject, $content, $courses));
                }
            }

            if ($recipientType === 'courses' && $courses) {
                foreach ($courses as $course) {
                    $userCourses = UserCourse::where('course_id', $course['id'])->get();
                    foreach ($userCourses as $uc) {
                        $user = User::find($uc->user_id);
                        if ($user) {
                            Mail::to($user->email)->send(new NEwsletterMail($subject, $content, $courses));
                        }
                    }
                }
            }

            // Delete or mark as sent
            $newsletter->delete();
        }

        $this->info("Scheduled newsletters sent.");
    }
}
