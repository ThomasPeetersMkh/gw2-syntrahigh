<?php

class StudentController {

  private $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  // Returns all the students
  public function getStudents() {
    $items = new Student($this->conn);
    $stmt = $items->readStudents();
    $itemCount = $stmt->rowCount();
    // Checks if there are records for the statement
    if ($itemCount > 0) {
      $studentArr = [];
      $studentArr["body"] = [];
      $studentArr["itemCount"] = $itemCount;
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $studentVak = [];
        // Extra student class, so we can get the scores for their courses
        $oneStudent = new Student($this->conn);
        $oneStudent->id = $llg_id;
        $courseArr = $oneStudent->getStudentCourses();
        foreach ($courseArr as $course) {
          $studentVak[$course["vak_naam"]] = $course["llg_vak_score"];
        }
        $studentVak = (object) $studentVak;
        $e = [
          "llg_id" => $llg_id,
          "llg_studentnr" => $llg_studentnr,
          "llg_naam" => $llg_naam,
          "llg_voornaam" => $llg_voornaam,
          "llg_email" => $llg_email,
          "llg_image_url" => $llg_image_url,
          "vakken" => $studentVak,
        ];
        array_push($studentArr["body"], $e);
      }
      http_response_code(200);
      echo json_encode($studentArr);
    }
    else {
      http_response_code(404);
      echo json_encode(
        ["message" => "No courses found."]
      );
    }
  }

  //creates a new student in the database
  public function postStudents() {
    $item = new Student($this->conn);
    $data = json_decode(file_get_contents("php://input"));
    if (!($data->llg_studentnr) || !($data->llg_voornaam) || !($data->llg_naam) || !($data->llg_image_url)) {
      http_response_code(400);
      echo json_encode(
        ["message" => "Body contains wrong keys."]
      );
      exit;
    }
    $item->studentId = $data->llg_studentnr;
    $item->firstName = $data->llg_voornaam;
    $item->lastName = $data->llg_naam;
    // Makes a standard email, making sure to remove any special characters
    $item->email = strtolower(preg_replace('/[^A-Za-z0-9\-]/', '', $data->llg_voornaam) . "." . preg_replace('/[^A-Za-z0-9\-]/', '', $data->llg_naam) . "@syntra-high.be");
    $item->imgUrl = $data->llg_image_url;
    $item->courses = $data->vakken;
    if ($item->createStudent()) {
      http_response_code(201);
      echo json_encode(
        [
          "message" => "Student created successfully",
          "llg_id" => $item->id,
        ]
      );
    }
    else {
      http_response_code(400);
      echo json_encode(
        ["message" => "Student could not be created."]
      );
    }
  }

  //returns one specific student based on the id in the url
  public function getOneStudent($id) {
    $item = new Student($this->conn);
    $item->id = $id;
    $item->getSingleStudent();
    $studentVak = [];
    $courseArr = $item->getStudentCourses();
    foreach ($courseArr as $course) {
      $studentVak[$course["vak_naam"]] = $course["llg_vak_score"];
    }
    $studentVak = (object) $studentVak;
    if ($item->firstName != NULL) {
      // create array
      $emp_arr = [
        "llg_id" => $item->id,
        "llg_studentnr" => $item->studentId,
        "llg_naam" => $item->lastName,
        "llg_voornaam" => $item->firstName,
        "llg_email" => $item->email,
        "llg_image_url" => $item->imgUrl,
        "vakken" => $studentVak,
      ];
      http_response_code(200);
      echo json_encode($emp_arr);
    }

    else {
      http_response_code(404);
      echo json_encode(["message" => "Student not found."]);
    }
  }

  //Update the records of one specific student based on the id in the url, all fields are needed
  public function updateStudent($id) {
    $item = new Student($this->conn);
    $data = json_decode(file_get_contents("php://input"));
    $item->id = $id;

    // student values
    if (!($data->body->llg_studentnr) || !($data->body->llg_naam) || !($data->body->llg_voornaam)) {
      http_response_code(400);
      echo json_encode(
        ["message" => "Body contains wrong keys."]
      );
      exit;
    }
    $item->studentId = $data->body->llg_studentnr;
    $item->firstName = $data->body->llg_voornaam;
    $item->lastName = $data->body->llg_naam;
    // Makes a standard email, making sure to remove any special characters
    $item->email = strtolower(preg_replace('/[^A-Za-z0-9\-]/', '', $data->body->llg_voornaam) . "." . preg_replace('/[^A-Za-z0-9\-]/', '', $data->body->llg_naam) . "@syntra-high.be");
    $item->imgUrl = $data->body->llg_image_url;

    if ($item->updateStudent()) {
      http_response_code(201);
      echo json_encode(
        ["message" => "Student's data updated."]
      );
    }
    else {
      http_response_code(400);
      echo json_encode(
        ["message" => "Data could not be updated"]
      );
    }
  }

  //deletes a specific student based on the id in the url
  public function deleteStudent($id) {
    $item = new Student($this->conn);
    $item->id = $id;
    if ($item->deleteStudent()) {
      http_response_code(200);
      echo json_encode(["message" => "Student deleted"]);
    }
    else {
      http_response_code(400);
      echo json_encode(["message" => "Student could not be deleted"]);
    }
  }

}