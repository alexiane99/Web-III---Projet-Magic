<?php

    require_once("action/CommonAction.php");

    class GameModeAction extends CommonAction {

        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $data = [];
            $result = [];
            $invalide = False;

            if(!empty($_SESSION["key"])) {

                if(isset($_POST["mode"])) {
              
                    $data["key"] = $_SESSION["key"];
                    $data["type"] = $_POST["type"];
                    $data["mode"] = $_POST["mode"];

                    $result = parent::callAPI("games/auto-match", $data);

                    if($result == "JOINED_PVP" || "JOINED_TRAINING") {

                        $invalide = True;
                    }
                }
            }

            return compact("result", "invalide");

        }

    }