<?php
    
    require_once("action/CommonAction.php");

    session_start();

    class LoginAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $result = [];
            $invalide = false;


            if(isset($_POST["username"]) && isset($_POST["password"])) {
               
                $data = [];

                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];

                $result = parent::callAPI("signin", $data);

                // my key : 2Lff0pJOvsitrzPG4q3cUE2lwur4M70nPK0yZDHgG5BFLR4UNt
               

                if ($result == "INVALID_USERNAME_PASSWORD") {

                    $invalide = True;
                    
                }

                else {

                // Pour voir les informations retournées : var_dump($result);exit;

                    $key = $result->key;

                    $_SESSION["key"] = $key;

                }

            }

            return compact("result", "invalide");
 
        }
    }