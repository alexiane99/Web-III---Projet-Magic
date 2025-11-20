<?php

    require_once("action/CommonAction.php");

    class GamePlayAction extends CommonAction {

        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $data = [];
            $result = [];
            $invalide = False;

            if(!empty($_SESSION["key"])) {

                if(isset($_POST["type"])) {
              
                    $data["key"] = $_SESSION["key"];
                    $data["type"] = $_POST["type"];

                    if(isset($_POST["uid"])) {

                        $data["uid"] = $_POST["uid"];

                    }
                    if (isset($_POST["targetuid"])) {

                        $data["uid"] = $_POST["uid"];

                    }

                    $result = parent::callAPI("games/action", $data);

                    // if($result == "JOINED_PVP" || "JOINED_TRAINING") {

                    //     $invalide = True;
                    // }
                }
            }

            return compact("result", "invalide");

        }

    }