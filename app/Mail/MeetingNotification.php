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

    /**
     * Create a new message instance.
     *
     * @param string $email
     * @param string $meetLink
     * @param string $language
     */
    public function __construct($email, $meetLink, $language)
    {
        $this->email = $email;
        $this->meetLink = $meetLink;
        $this->language = $language;
    }

    /**
     * Build the message.
     *
     * @return \Illuminate\Mail\Mailable
     */
    public function build()
    {
        if ($this->language == 'en') {
            return $this->view('emails.meeting_notification')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                ])
            ;
        } elseif ($this->language == 'fr') {
            return $this->view('emails.meeting_notification2')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                ])
            ;
        } elseif ($this->language == 'ar') {
            return $this->view('emails.meeting_notification3')
                ->with([
                    'meetLink' => $this->meetLink,
                    'language' => $this->language,
                ])
            ;
        }
    }
}
