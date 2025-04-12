<?php

include('db_connect.php');


function getCategories() {
    global $conn;
    $result = $conn->query("SELECT * FROM notes_system WHERE type='category'");
    return $result->fetch_all(MYSQLI_ASSOC);
}

if (isset($_GET['delete_category_id'])) {
    $category_id = intval($_GET['delete_category_id']);
    $conn->query("DELETE FROM notes_system WHERE id = $category_id AND type = 'category'");
    header(header: "Location: manage_categories.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['category_name'])) {
    $category_name = trim($_POST['category_name']);
    if (!empty($category_name)) {
        $stmt = $conn->prepare("INSERT INTO notes_system (name, type) VALUES (?, 'category')");
        $stmt->bind_param("s", $category_name);
        $stmt->execute();
        header("Location: manage_categories.php");
        exit;
    }
}

$categories = getCategories();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Categories</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="sidebar">
        <div class="logo">Admin Panel</div>
        <ul class="nav">
            <li><a href="manage_categories.php">Categories</a></li>
            <li><a href="manage_subjects.php">Subjects</a></li>
            <li><a href="manage_notes.php">Notes</a></li>
        </ul>
    </div>

    <div class="main-content">
        <header>
        <h1>Manage Categories</h1>
        </header>
        <div class="container">
            <h2>Add New Category</h2>
            <form method="POST">
                <input type="text" name="category_name" id="category_name" required placeholder="Category Name">
                <button type="submit">Add Category</button>
            </form>

            <h2>Existing Categories</h2>
            <ul class="category-list">
                <?php foreach ($categories as $category): ?>
                    <li>
                        <div>
                            <span class="category-name"><?php echo htmlspecialchars($category['name']); ?></span>
                            <div class="actions">
                                <a href="manage_subjects.php?category_id=<?php echo $category['id']; ?>" class="action-btn">Manage Subjects</a>
                                <a href="manage_notes.php?category_id=<?php echo $category['id']; ?>" class="action-btn">Manage Notes</a>
                                <a href="?delete_category_id=<?php echo $category['id']; ?>" class="action-btn delete" onclick="return confirm('Are you sure you want to delete this category?')">Delete</a>
                            </div>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</body>
</html>
