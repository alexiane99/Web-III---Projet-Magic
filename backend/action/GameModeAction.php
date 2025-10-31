<?php

    require_once("action/CommonAction.php");

    class GameModeAction extends CommonAction {

        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $data = [];
            $result = [];

            if(!empty($_SESSION["key"])) {

                if(isset($_POST["mode"])) {
              
                    $data["key"] = $_SESSION["key"];
                    $data["type"] = $_POST["mode"];

                    $result = parent::callAPI("games/auto-match", $data);
                }
            }

            return compact("result");

        }

    }