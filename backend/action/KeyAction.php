<?php 

    require_once("action/CommonAction.php");

    class KeyAction extends CommonAction {

        public function __construct() {

            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }
        
        protected function executeAction() {

            // vérifier que la clé est toujours okay dans le serveur??

            $key = $_SESSION["key"] ?? null; 

            return compact("key"); 
        }
    }