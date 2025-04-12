<?php
include('db_connect.php');


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $stmt = $conn->prepare("INSERT INTO notes_system (name, type, parent_id) VALUES (?, 'category', NULL)");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    header('Location: admin_dashboard.php');
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Category</title>
</head>
<body>
    <h1>Add Category</h1>

    <form method="POST">
        <label for="name">Category Name</label>
        <input type="text" name="name" id="name" required>
        <button type="submit">Add Category</button>
    </form>

    <a href="admin_dashboard.php">Back to Dashboard</a>
</body>
</html>
