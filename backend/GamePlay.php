<?php  

    require_once("action/GamePlayAction.php"); 

    $action = new GamePlayAction();
    $data = $action->execute(); 

    echo json_encode($data["result"]); 