<?php

$x = isset($_POST['x']) ? intval($_POST['x']) : null;
$y = isset($_POST['y']) ? floatval($_POST['y']) : null;
$r = isset($_POST['r']) ? floatval($_POST['r']) : null;

session_start();

date_default_timezone_set('Europe/Moscow');
$current_time = date("H:i:s:ms");

if (!check_values($x, $y, $r)) {
    http_response_code(400); // code?
    return;
}

$result = check_area($x, $y, $r) ? "Попадание" : "Мимо"; // цвет?

$exec_time = microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'];

array_push($_SESSION['results'], [$x, $y, $r, $current_time, $exec_time, $result]);

function check_area($x, $y, $r)
{
    if ($x < 0 and $x >= -$r) {
        return ($y >= 0 and $y <= $r) // квадрат
            or ((pow($x, 2) + pow($y, 2) <= pow($r, 2))); // круг
    } elseif ($x < $r / 2 and $y >= 0) {
        return $y < -2 * $x + $r; // треугольник (прямая y = -2x + R)
    } else return false;
}

function check_values($x, $y, $r)
{
    return in_array($x, [-4, -3, -2, -1, 0, 1, 2, 3, 4])
        and (is_numeric($y) and $y > -5 and $y < 3) // is numeric check necessary?
        and in_array($r, [1, 1.5, 2, 2.5, 3]);
}