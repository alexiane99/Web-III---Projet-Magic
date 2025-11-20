<?php  

    require_once("action/DeckAction.php"); 

    $action = new DeckAction();
    $data = $action->execute(); 

    echo json_encode($data["result"]); 