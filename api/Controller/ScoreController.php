<?php

class ScoreController {

  private $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  //Update the records of one specific student based on the id in the url, all fields are needed
  public function updateScore() {
    $item = new Score($this->conn);
    $data = json_decode(file_get_contents("php://input"));
    // Check if any key is missing
    if (!($data->body->llg_id) || !($data->body->vak_id) || !($data->body->llg_vak_score)) {
      http_response_code(400);
      echo json_encode(
        ["message" => "Body contains wrong keys."]
      );
      exit;
    }
    $item->studentId = $data->body->llg_id;
    $item->courseId = $data->body->vak_id;
    $item->score = $data->body->llg_vak_score;

    if ($item->updateScore()) {
      http_response_code(200);
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

}