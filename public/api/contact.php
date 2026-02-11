<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

$name = isset($input['name']) ? htmlspecialchars(trim($input['name'])) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Email configuration - UPDATE THESE VALUES
$to = 'info@vadimcebanu.dev'; // Your email address
$subject = "New message from $name - Portfolio Contact";

$headers = [
    'From' => $to,
    'Reply-To' => $email,
    'Content-Type' => 'text/html; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion()
];

$htmlMessage = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #141D2F; color: #00FF9D; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { margin-top: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
    </div>
</body>
</html>
";

// Send email
$headerString = '';
foreach ($headers as $key => $value) {
    $headerString .= "$key: $value\r\n";
}

if (mail($to, $subject, $htmlMessage, $headerString)) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
