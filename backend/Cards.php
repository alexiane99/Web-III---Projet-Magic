<?php  

    require_once("action/CardsAction.php"); 

    $action = new CardsAction();
    $data = $action->execute(); 

    echo json_encode($data["result"]); 