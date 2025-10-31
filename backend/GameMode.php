<?php  

    require_once("action/GameAction.php"); 

    $action = new GameModeAction();
    $data = $action->execute(); 

    echo json_encode($data["result"]); 