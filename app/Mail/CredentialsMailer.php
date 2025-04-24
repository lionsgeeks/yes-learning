<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CredentialsMailer extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $randomPassword;
    public $username;
    public $userEmail;
    public function __construct($randomPassword, $username, $userEmail)
    {
        $this->randomPassword = $randomPassword;
        $this->username = $username;
        $this->userEmail = $userEmail;

        Log::info('hiiii');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {

        return new Envelope(
            subject: 'Credentials Mailer',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        Log::info('salama');

        return new Content(
            view: 'maizzlMails.credentialsmail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
