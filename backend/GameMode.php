<?php  

    require_once("action/GameModeAction.php"); 

    $action = new GameModeAction();
    $data = $action->execute(); 

    echo json_encode($data["result"]); 