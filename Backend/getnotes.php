<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('db_connect.php');

function getCategories() {
    global $conn;
    $result = $conn->query("SELECT * FROM notes_system WHERE type = 'category'");
    return $result->fetch_all(MYSQLI_ASSOC);
}
function getSubjects($category_id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notes_system WHERE type = 'subject' AND parent_id = ?");
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

function getNotes($subject_id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notes_system WHERE type = 'note' AND parent_id = ?");
    $stmt->bind_param("i", $subject_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

function getSections($note_id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notes_system WHERE type = 'section' AND parent_id = ?");
    $stmt->bind_param("i", $note_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['category'])) {
        echo json_encode(getSubjects($_GET['category']));
    } elseif (isset($_GET['subject'])) {
        echo json_encode(getNotes($_GET['subject']));
    } elseif (isset($_GET['note'])) {
        echo json_encode(getSections($_GET['note']));
    } else {
        echo json_encode(getCategories());
    }
}
?>
