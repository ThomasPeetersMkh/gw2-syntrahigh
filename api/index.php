<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");

include_once './Config/Database.php';
include_once './Model/Student.php';
include_once './Model/Course.php';
include_once './Model/Teacher.php';
include_once './Model/Score.php';
include_once './Controller/StudentController.php';
include_once './Controller/CourseController.php';
include_once './Controller/TeacherController.php';
include_once './Controller/ScoreController.php';

$database = new Database();
$conn = $database->getConnection();

$studentController = new StudentController($conn);
$courseController = new CourseController($conn);
$teacherController = new TeacherController($conn);
$scoreController = new ScoreController($conn);
error_reporting(0);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
if ($uri[count($uri) - 1] === "") {
  array_pop($uri);
}


if ((isset($uri[3]) && $uri[3] !== 'students' && $uri[3] !== 'courses' && $uri[3] !== 'teachers' && $uri[3] !== 'scores' && $uri[3] !== 'login')) {
  http_response_code(404);
  echo json_encode(
    ["message" => "Not a valid endpoint"]
  );
  exit;
}
if ($uri[3] === 'students') {
  //API calls that don't require a specific id
  if ((!isset($uri[4]))) {
    //get all students
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
      $studentController->getStudents();
    }
    //Post new student
    elseif (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
      $studentController->postStudents();
    }
    else {
      http_response_code(405);
      echo json_encode(
        ["message" => "Use a valid request method."]
      );
      exit;
    }
  }
  //API calls that require an id to work
  elseif (is_numeric($uri[4])) {
    //Get single student
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
      $studentController->getOneStudent($uri[4]);
    }
    //Update a student
    elseif (strtoupper($_SERVER['REQUEST_METHOD']) === 'PUT') {
      $studentController->updateStudent($uri[4]);
    }
    //Delete a student
    elseif (strtoupper($_SERVER['REQUEST_METHOD']) === 'DELETE') {
      $studentController->deleteStudent($uri[4]);
    }
    else {
      echo json_encode(
        ["message" => "Use a valid request method"]
      );
      exit;
    }
  }
  else {
    http_response_code(404);
    echo json_encode(
      ["message" => "Not a valid endpoint for students"]
    );
    exit;
  }
}
if ($uri[3] === 'courses') {
  if ((!isset($uri[4]))) {
    //get all courses
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
      $courseController->getCourses();
    }
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
      $courseController->getCourseStudents();
    }
  }
  elseif (($uri[4] === "details")) {
    $courseController->getSingleCourse();
  }
  else {
    http_response_code(404);
    echo json_encode(
      ["message" => "Not a valid endpoint for courses"]
    );
    exit;
  }
}
if ($uri[3] === 'teachers') {
  if ((!isset($uri[4]))) {
    //get all teachers
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
      $teacherController->getTeachers();
    }
    else {
      http_response_code(405);
      echo json_encode(
        ["message" => "Use a valid request method."]
      );
      exit;
    }
  }
  elseif (is_numeric($uri[4])) {
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
      $teacherController->getOneTeacher($uri[4]);
    }
    else {
      echo json_encode(
        ["message" => "Use a valid request method"]
      );
      exit;
    }
  }
  else {
    http_response_code(404);
    echo json_encode(
      ["message" => "Not a valid endpoint for teachers"]
    );
    exit;
  }
}
if ($uri[3] === 'scores') {
  if ((!isset($uri[4]))) {
    //get all teachers
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'PUT') {
      $scoreController->updateScore();
    }
    else {
      http_response_code(404);
      echo json_encode(
        ["message" => "Use a valid request method."]
      );
      exit;
    }
  }
}
if ($uri[3] === 'login') {
  if ((!isset($uri[4]))) {
    //get all teachers
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
      $teacherController->getTeacherLogin();
    }
    else {
      http_response_code(405);
      echo json_encode(
        ["message" => "Use a valid request method."]
      );
      exit;
    }
  }
}





