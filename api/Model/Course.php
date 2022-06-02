<?php

class Course {

  // Database connection and table name
  private $conn;

  private $db_table = "vak";

  // Variables matching the related table
  public $id;

  public $name;

  public $description;

  public $teacherFirstName;

  public $teacherlastName;

  public function __construct($db) {
    $this->conn = $db;
  }

  // READ courses
  public function readCourses() {
    // select all query
    $query = "SELECT vak_id, vak_naam, vak_omschr, lkt_naam, lkt_voornaam from " . $this->db_table . " inner join leerkracht l on vak.vak_lkt_id = l.lkt_id";
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute();
    return $stmt;
  }

  // READ single
  public function getSingleCourse() {
    $sqlQuery = "SELECT vak_id, vak_naam, vak_omschr, lkt_naam, lkt_voornaam FROM " . $this->db_table . " inner join leerkracht l on vak.vak_lkt_id = l.lkt_id WHERE  vak_naam like '" . $this->name . "' LIMIT 0,1";
    $stmt = $this->conn->prepare($sqlQuery);
    $stmt->execute();
    $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
    $this->id = $dataRow['vak_id'];
    $this->name = $dataRow['vak_naam'];
    $this->description = $dataRow['vak_omschr'];
    $this->teacherFirstName = $dataRow["lkt_naam"];
    $this->teacherlastName = $dataRow["lkt_voornaam"];
    $stmt = $this->getCourseStudents();
    $itemCount = $stmt->rowCount();
    $students = [];
    if ($itemCount > 0) {
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = [
          "llg_id" => $llg_id,
          "llg_studentnr" => $llg_studentnr,
          "llg_naam" => $llg_naam,
          "llg_voornaam" => $llg_voornaam,
          "llg_vak_score" => $llg_vak_score,
        ];
        array_push($students, $e);
      }
    }
    return $students;
  }

  // READ students for course
  public function getCourseStudents() {
    // select all query
    $query = "select l.llg_id,llg_studentnr, llg_naam,llg_voornaam,llg_vak_score  from vak
            inner join `leerling-vak` `l-v` on vak.vak_id = `l-v`.vak_id
            inner join leerling l on `l-v`.llg_id = l.llg_id
            where vak_naam like '" . $this->name . "'";
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute();
    return $stmt;
  }

}