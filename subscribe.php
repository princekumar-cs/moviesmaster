<?php
header('Content-Type: application/json');

if(!isset($_POST['email'])){
    echo json_encode(['status'=>'error','message'=>'Email required']);
    exit;
}

$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if(!$email){
    echo json_encode(['status'=>'error','message'=>'Invalid email']);
    exit;
}

// File to store emails
$file = 'subscription.json';
$emails = [];

if(file_exists($file)){
    $content = file_get_contents($file);
    $emails = json_decode($content,true) ?? [];
}

// Prevent duplicate
if(in_array($email, $emails)){
    echo json_encode(['status'=>'error','message'=>'Already subscribed']);
    exit;
}

// Add new email
$emails[] = $email;

// Optional: simple encryption (base64)
$encodedEmails = array_map('base64_encode', $emails);

file_put_contents($file, json_encode($encodedEmails, JSON_PRETTY_PRINT));

echo json_encode(['status'=>'success','message'=>'Subscribed successfully!']);
?>
