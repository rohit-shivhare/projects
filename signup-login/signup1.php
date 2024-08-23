<?php
// Configuration
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'php_login_system';

// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Signup form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if username already exists
    $check_username = "SELECT * FROM signup WHERE username='$username'";
    $result = $conn->query($check_username);
    if ($result->num_rows > 0) {
        echo "Username already exists!";
    } else {
        // Insert into database
        $insert_query = "INSERT INTO signup (username, fname, lname, email, password) VALUES ('$username', '$fname', '$lname', '$email', '$password')";
        if ($conn->query($insert_query) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $insert_query . "<br>" . $conn->error;
        }
    }
}

// Close connection
$conn->close();
?>

<!-- Signup form -->
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username" required><br>
    <label for="fname">First Name:</label><br>
    <input type="text" id="fname" name="fname" required><br>
    <label for="lname">Last Name:</label><br>
    <input type="text" id="lname" name="lname" required><br>
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" required><br>
    <input type="submit" value="Signup">
</form>