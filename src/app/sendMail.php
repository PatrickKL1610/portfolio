<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        
        // Payload is not sent to $_POST Variable,
        // it is sent to php://input as a text
        $json = file_get_contents('php://input');
        // Parse the payload from text format to an object
        $params = json_decode($json);
        
        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        // Email to site owner
        $recipient = 'patrick@klein-patrick.ch';  
        $subject = "Contact From <$email>";
        $body = "From: " . $name . "<br>" . $message;

        $headers = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: <$email>";

        mail($recipient, $subject, $body, implode("\r\n", $headers));

        // Confirmation email to the user
        $confirmationSubject = "Confirmation: We received your message";
        $confirmationBody = "Hi " . $name . ",<br><br>Thank you for reaching out. We have received your message and will get back to you shortly.<br><br>"
                          . "Here is a copy of your message:<br><br>"
                          . $body . "<br><br>Best regards,<br>Patrick Klein";

        $confirmationHeaders = array();
        $confirmationHeaders[] = 'MIME-Version: 1.0';
        $confirmationHeaders[] = 'Content-type: text/html; charset=utf-8';
        $confirmationHeaders[] = "From: patrick@klein-patrick.ch";

        mail($email, $confirmationSubject, $confirmationBody, implode("\r\n", $confirmationHeaders));
        
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
