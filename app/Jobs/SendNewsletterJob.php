<?php

namespace App\Jobs;

use App\Mail\NEwsletterMail;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendNewsletterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $subject;
    public $content;
    public $recipientType;
    public $courses;

    public function __construct($subject, $content, $recipientType, $courses = [])
    {
        $this->subject = $subject;
        $this->content = $content;
        $this->recipientType = $recipientType;
        $this->courses = $courses;
    }

    public function handle()
    {
        $users = User::all();

        if ($this->recipientType === 'all') {
            foreach ($users as $user) {
                Mail::to($user->email)->send(new NEwsletterMail($this->subject, $this->content, $this->courses));
            }
        }

        if ($this->recipientType === 'courses') {
            foreach ($this->courses as $course) {
                $userCourses = UserCourse::where('course_id', $course['id'])->get();
                foreach ($userCourses as $uc) {
                    $user = User::find($uc->user_id);
                    if ($user) {
                        Mail::to($user->email)->send(new NEwsletterMail($this->subject, $this->content, $this->courses));
                    }
                }
            }
        }
    }
}
