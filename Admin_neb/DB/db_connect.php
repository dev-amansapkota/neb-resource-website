<?php

$host = 'localhost';     
$username = 'root';      
$password = '';         
$dbname = 'neb_resource_db';


$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");
?>
