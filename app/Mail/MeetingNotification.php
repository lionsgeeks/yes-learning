<?php

namespace App\Mail;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;
class MeetingNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $email;
    public $meetLink;
    public $language;
    public $date;
    public $time;
    public $name;
    public $subworkshoptitle;
    /**
     * Create a new message instance.
     *
     * @param string $email
     * @param string $meetLink
     * @param string $language
     */
    public function __construct($email, $meetLink, $language , $date , $time , $name ,$subworkshoptitle )
    {
        $this->email = $email;
        $this->meetLink = $meetLink;
        $this->language = $language;
        $this->date = $date;
        $this->time = $time;
        $this->name = $name;
        $this->subworkshoptitle = $subworkshoptitle->name;
    }

    /**
     * Build the message.
     *
     * @return \Illuminate\Mail\Mailable
     */
    public function build()
    {

        // dd( $this->meetLink);
        if ($this->language == 'en') {
            return $this->view('maizzlMails.meetlinken')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                    'date' => $this->date,
                    'time' => $this->time,
                    'name' => $this->name,
                    'subworkshoptitle' => $this->subworkshoptitle,
                ])

            ;


        } elseif ($this->language == 'fr') {
            return $this->view('maizzlMails.meetlinkfr')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                    'date' => $this->date,
                    'time' => $this->time,
                    'name' => $this->name,
                    'subworkshoptitle' => $this->subworkshoptitle,
                ])
            ;
        } elseif ($this->language == 'ar') {
            return $this->view('maizzlMails.meetlinkar')
            ->with([
                // dd($this->subworkshoptitle["ar"] ,
                // $this->meetLink,
                // $this->language,
                // $this->date,
                // $this->time,
                // $this->name,
                // ),
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                    'date' => $this->date,
                    'time' => $this->time,
                    'name' => $this->name,
                    'subworkshoptitle' => $this->subworkshoptitle["ar"],
                ])
            ;
        }
    }
}
