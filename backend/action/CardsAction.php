<?php

    require_once("action/CommonAction.php");

    class CardsAction extends CommonAction {
        
        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = [];
            $json = ""; 

            $json = file_get_contents("https://magix.apps-de-cours.com/api/cards"); 
            $result = json_decode($json);

            return compact("result", "json");

        }
    }

