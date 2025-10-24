<?php  

    require_once("action/Key.php"); 

    $action = new KeyAction();
    $data = $action->execute(); 

    echo json_encode($data["key"]); 