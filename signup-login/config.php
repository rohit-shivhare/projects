<?php
$servername = "localhost";
$username = "root"; // MySQL username
$password = ""; // MySQL password
$dbname = "php_login_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
