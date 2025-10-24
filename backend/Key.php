<?php  

    require_once("action/KeyAction.php"); 

    $action = new KeyAction();
    $data = $action->execute(); 

    echo json_encode($data["key"]); 