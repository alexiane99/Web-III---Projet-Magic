<?php

    require_once("action/CommonAction.php");

    class DeckAction extends CommonAction {

        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $data = [];
            $result = [];

            $data["key"] = $_SESSION["key"];

            if(!empty($_SESSION["key"])) {

                $result = parent::callAPI("users/deck", $data);

            }

            return compact("result"); # devrait retourner le json si la partie est en cours
        }

    }