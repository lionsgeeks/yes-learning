<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MeetingNotification extends Mailable
{
    use SerializesModels;

    public $email;
    public $meetLink;
    public $language;
    public $date;
    public $time;

    /**
     * Create a new message instance.
     *
     * @param string $email
     * @param string $meetLink
     * @param string $language
     */
    public function __construct($email, $meetLink, $language , $date , $time)
    {
        $this->email = $email;
        $this->meetLink = $meetLink;
        $this->language = $language;
        $this->date = $date;
        $this->time = $time;
    }

    /**
     * Build the message.
     *
     * @return \Illuminate\Mail\Mailable
     */
    public function build()
    {
        if ($this->language == 'en') {
            return $this->view('maizzlMails.meetlinken')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                    'date' => $this->date,
                    'time' => $this->time,
                ])
            ;
        } elseif ($this->language == 'fr') {
            return $this->view('maizzlMails.meetlinkfr')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                    'date' => $this->date,
                    'time' => $this->time,
                ])
            ;
        } elseif ($this->language == 'ar') {
            return $this->view('maizzlMails.meetlinkar')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                    'date' => $this->date,
                    'time' => $this->time,
                ])
            ;
        }
    }
}
