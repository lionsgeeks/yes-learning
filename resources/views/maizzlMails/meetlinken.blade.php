<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" media="screen">
</head>
<body style="margin: 0; width: 100%; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div role="article" aria-roledescription="email" aria-label lang="en">
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p style="font-size: 18px; font-weight: bold;">Hello,</p>
      <p style="font-size: 16px;">This is a friendly reminder about your upcoming meeting. Here are the details:</p>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Date:</strong> {{ $date }}</p>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Time:</strong> {{ $time }}</p>
      <p style="font-size: 16px;">You can join the meeting using the link below:</p>
      <p style="text-align: center; margin: 20px 0;"></p>
      <a href="{{ $meetLink }}" target="_blank" style="background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Join Meeting</a>
      <p></p>
      <p style="font-size: 14px; color: #555;">Thank you!</p>
    </div>
  </div>
</body>
</html>