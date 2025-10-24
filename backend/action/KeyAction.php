<?php 

    require_once("action/CommonAction.php");

    session_start();

    class KeyAction extends CommonAction {

        protected function executeAction() {

            // vérifier que la clé est toujours okay dans le serveur??

            $key = $_SESSION["key"] ?? null; 

            return compact("key"); 
        }
    }