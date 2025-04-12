<?php
include('db_connect.php');

function getCategories() {
    global $conn;
    $result = $conn->query("SELECT * FROM notes_system WHERE type='category'");
    return $result->fetch_all(MYSQLI_ASSOC);
}

function getSubjects($category_id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notes_system WHERE type='subject' AND parent_id=?");
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['name'], $_POST['subject_id'], $_POST['category_id'])) {
    $name = trim($_POST['name']);
    $subject_id = intval($_POST['subject_id']);
    $category_id = intval($_POST['category_id']);

    if (!empty($name) && $subject_id > 0) {
        $stmt = $conn->prepare("INSERT INTO notes_system (name, type, parent_id) VALUES (?, 'note', ?)");
        $stmt->bind_param("si", $name, $subject_id);

        if ($stmt->execute()) {
            header('Location: manage_notes.php?category_id=' . $category_id);
            exit;
        } else {
            die("Error inserting note: " . $stmt->error);
        }
    } else {
        echo "Error: Note name cannot be empty and a valid subject must be selected.";
    }
}

if (!isset($_GET['category_id']) || empty($_GET['category_id'])) {
    echo "Error: Category ID not provided. Please select a category to add notes.";
    exit;
}


$category_id = intval($_GET['category_id']);
$stmt = $conn->prepare("SELECT * FROM notes_system WHERE id=? AND type='category'");
$stmt->bind_param("i", $category_id);
$stmt->execute();
$category_result = $stmt->get_result();
$category = $category_result->fetch_assoc();

if (!$category) {
    echo "Error: Category not found.";
    exit;
}
$subjects = getSubjects($category_id);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Notes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Add Notes for Category: <?php echo htmlspecialchars($category['name']); ?></h1>
    </header>

    <div class="container">
        <form method="POST">
            <label for="name">Note Name</label>
            <input type="text" name="name" id="name" required>

            <label for="subject_id">Select Subject</label>
            <select name="subject_id" id="subject_id" required>
                <!-- Loop through subjects to populate the dropdown -->
                <?php foreach ($subjects as $subject): ?>
                    <option value="<?php echo $subject['id']; ?>"><?php echo htmlspecialchars($subject['name']); ?></option>
                <?php endforeach; ?>
            </select>

            <input type="hidden" name="category_id" value="<?php echo $category_id; ?>">

            <button type="submit">Add Note</button>
        </form>

        <h2>Subjects for Category: <?php echo htmlspecialchars($category['name']); ?></h2>
        <ul>
            <?php foreach ($subjects as $subject): ?>
                <li>
                    <?php echo htmlspecialchars($subject['name']); ?>
                </li>
            <?php endforeach; ?>
        </ul>

        <a href="manage_categories.php">Back to Categories</a>
    </div>
</body>
</html>
