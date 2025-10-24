<?php 

    require_once("action/CommonAction.php");
    
    class LogoutAction extends CommonAction {

     public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            
            $result = [];
            $invalide = true;


                if(!empty($_SESSION["key"])) {

                    $data = [];

                    $result = "ICI";

                    echo($_SESSION["key"]);

                    $data["key"] = $_SESSION["key"];

                    $result = parent::callAPI("signout", $data);

                    if($result == "INVALID_KEY") {

                        $invalide = false;

                    }

                    if($result == "SIGNED_OUT") {

                        session_unset(); // source : https://fr.eitca.org/web-development/eitc-wd-pmsf-php-and-mysql-fundamentals/expertise-in-php/sessions/examination-review-sessions/how-can-we-delete-a-session-variable-in-php/
                        session_destroy();
                        session_start();

                    }
                              
                }
            
           
            return compact("result");
        }
    }
