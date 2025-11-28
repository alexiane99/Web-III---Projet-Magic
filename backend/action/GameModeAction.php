<?php

    require_once("action/CommonAction.php");

    class GameModeAction extends CommonAction {

        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $data = [];
            $result = [];
            // $invalide = True;

            if(!empty($_SESSION["key"])) {

                if(isset($_POST["mode"])) {
              
                    $data["key"] = $_SESSION["key"];
                    $data["type"] = $_POST["mode"];

                    $result = parent::callAPI("games/auto-match", $data);

                    // if($result == "JOINED_PVP" || $result == "JOINED_TRAINING") {

                    //     $invalide = False;
                    // }
                }
            }

            return compact("result");

        }

    }