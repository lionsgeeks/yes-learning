<?php

namespace App\Http\Controllers;

use App\Mail\NEwsletterMail;
use App\Models\Course;
use App\Models\NewsLetter;
use App\Models\NewsletterSubscriber;
use App\Models\ScheduledNewsletter;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    /**
     * Display the newsletter management page.
     */
    public function index()
    {
        $courses = Course::all();
        return Inertia::render('newsletter/index' ,[
            "courses" => $courses,
        ]);
    }

    /**
     * Store a new newsletter subscriber.
     */


    /**
     * Send a newsletter to subscribers.
     */

     public function history()
     {
         return Inertia::render('newsletter/history/index');
     }



    public function send(Request $request)
    {
        $validated =  $request->validate([
            'subject' => 'required|array|max:255',
            'subject.en' => 'required',
            'subject.fr' => 'required',
            'subject.ar' => 'required',
            'content' => 'required|array',
            'content.en' => 'required',
            'content.fr' => 'required',
            'content.ar' => 'required',
            'recipient_type' => 'required',
        ]);
        $new = NewsLetter::create([
            'content' => $validated['content'],
            'subject' => $validated['subject'],
        ]);
        // dd($request->all());




        // dd($content);

        $users = User::all();



        if ($request->recipient_type == "all") {

            foreach ($users as $recipient) {
                $subject = $new->subject[$recipient->language];
                $content = $new->content[$recipient->language];
                $courses = $request->courses;

                Mail::to($recipient['email'])->send(new NEwsletterMail($subject, $content , $courses));

            }
        }if ($request->recipient_type == "courses") {
            foreach ($courses as $course) {
                $userCourses = UserCourse::where("course_id", $course["id"])->get();

                foreach ($userCourses as $uc) {
                    $user = User::find($uc->user_id);
                    if ($user) {
                        // dd($user->email);
                        $subject = $new->subject[$uc->language];
                        $content = $new->content[$uc->language];
                        $courses = $request->courses;
                        Mail::to($user->email)->send(new NEwsletterMail($subject, $content, $courses));
                    }
                }
            }
        }

        return back()->with('success', 'Newsletter sent successfully!');
    }

    /**
     * Schedule a newsletter for later sending.
     */
    public function schedule(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
            'recipient_type' => 'required|in:all,active,inactive,courses',
            'schedule_date' => 'required|date|after_or_equal:now',
        ]);

        ScheduledNewsletter::create([
            'subject' => $request->subject,
            'content' => $request->content,
            'recipient_type' => $request->recipient_type,
            'courses' => $request->courses ?? [],
            'schedule_date' => $request->schedule_date,
        ]);

        return back()->with('success', 'Newsletter scheduled successfully!');
    }

    /**
     * Unsubscribe a user from the newsletter.
     */

}
