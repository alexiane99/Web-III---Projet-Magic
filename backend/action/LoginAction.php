<?php
    
    require_once("action/CommonAction.php");


    class LoginAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $result = [];
            $invalide = false;

            if(isset($_POST["username"]) && isset($_POST["pwd"])) {
               
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["pwd"];

                $result = parent::callAPI("signin", $data);
                var_dump($result);

                if ($result == "INVALID_USERNAME_PASSWORD") {

                    $invalide = True;
                }

                else {

                // Pour voir les informations retournées : var_dump($result);exit;

                    $key = $result->key;

                }

            }

            return compact("result", "invalide");
 
        }
    }