<?php 

    require_once("action/LoginAction.php"); 

        // généré par AI, car "Access to fetch at 'http://localhost:8000/programs.php
    // ' from origin 'http://localhost:5175
    // ' has been blocked by CORS policy"
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
  


    $action = new LoginAction();
    $data = $action->execute(); 

    echo json_encode($data["result"]);