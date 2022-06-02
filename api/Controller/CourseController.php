<?php

class CourseController {

  private $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  // Returns all courses
  public function getCourses() {
    $items = new Course($this->conn);
    $stmt = $items->readCourses();
    $itemCount = $stmt->rowCount();

    if ($itemCount > 0) {
      $courseArr = [];
      $courseArr["body"] = [];
      $courseArr["itemCount"] = $itemCount;
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = [
          "vak_id" => $vak_id,
          "vak_naam" => $vak_naam,
          "vak_omschr" => $vak_omschr,
          "lkt_naam" => $lkt_naam,
          "lkt_voornaam" => $lkt_voornaam,
        ];
        array_push($courseArr["body"], $e);
      }
      http_response_code(200);
      echo json_encode($courseArr);
    }
    else {
      http_response_code(404);
      echo json_encode(
        ["message" => "No students found."]
      );
    }
  }

  // Returns single course based on the name in the body
  public function getSingleCourse() {
    $item = new Course($this->conn);
    $data = json_decode(file_get_contents("php://input"));
    $item->name = $data->vak_naam;
    $students = $item->getSingleCourse();
    if ($item->name != NULL) {
      // create array
      $emp_arr = [
        "vak_id" => $item->id,
        "vak_naam" => $item->name,
        "vak_omschr" => $item->description,
        "lkt_naam" => $item->teacherFirstName,
        "lkt_voornaam" => $item->teacherlastName,
        "students" => $students,
      ];
      http_response_code(200);
      echo json_encode($emp_arr);
    }

    else {
      http_response_code(404);
      echo json_encode(["message" => "Course not found."]);
    }
  }

  // Returns the students related
  public function getCourseStudents() {
    $items = new Course($this->conn);
    $data = json_decode(file_get_contents("php://input"));
    $items->name = $data->vak_naam;
    $stmt = $items->getCourseStudents();
    $itemCount = $stmt->rowCount();
    if ($itemCount > 0) {
      $courseArr = [];
      $courseArr["body"] = [];
      $courseArr["itemCount"] = $itemCount;
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = [
          "llg_studentnr" => $llg_studentnr,
          "llg_naam" => $llg_naam,
          "llg_voornaam" => $llg_voornaam,
          "llg_vak_score" => $llg_vak_score,
        ];
        array_push($courseArr["body"], $e);
      }
      http_response_code(200);
      echo json_encode($courseArr);
    }
    else {
      http_response_code(404);
      echo json_encode(
        ["message" => "No students found for this course."]
      );
    }
  }

}