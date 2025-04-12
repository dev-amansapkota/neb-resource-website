<?php
include('db_connect.php');
function getSubjects($category_id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notes_system WHERE parent_id = ? AND type = 'subject'");
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

$category_id = $_GET['category_id'];
$subjects = getSubjects($category_id);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $stmt = $conn->prepare("INSERT INTO notes_system (name, type, parent_id) VALUES (?, 'subject', ?)");
    $stmt->bind_param("si", $name, $category_id);
    $stmt->execute();
    header('Location: manage_subjects.php?category_id=' . $category_id);
    exit;  
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Subjects</title>
</head>
<body>
    <h1>Manage Subjects for Category ID: <?php echo $category_id; ?></h1>
    <form method="POST">
        <label for="name">Subject Name</label>
        <input type="text" name="name" id="name" required>
        <button type="submit">Add Subject</button>
    </form>

    <h2>Subjects</h2>
    <ul>
        <?php foreach ($subjects as $subject): ?>
            <li>
                <?php echo $subject['name']; ?>
            </li>
        <?php endforeach; ?>
    </ul>

    <a href="admin_dashboard.php">Back to Dashboard</a>
</body>
</html>
