<?php
	session_start();
    
    abstract class CommonAction {
        protected static $VISIBILITY_PUBLIC = 0;
        protected static $VISIBILITY_MEMBER = 1;
        protected static $VISIBILITY_MODERATOR = 2;
        protected static $VISIBILITY_ADMINISTRATOR = 3;
        private $pageVisibility;

        public function __construct($pageVisibility) {
            $this->pageVisibility = $pageVisibility;
        }

        public function execute() {            
            if (!empty($_GET["logout"])) {
                session_destroy();
                session_start();
            }

			if (empty($_SESSION["visibility"])) { # s'il n'y a pas d'information de visibilité, on le met public par défaut 
                $_SESSION["visibility"] = self::$VISIBILITY_PUBLIC;
			}

            if ($_SESSION["visibility"] < $this->pageVisibility) { #si la visibilité de l'utilisateur est inférieure à celle requise pour la page, on redirige l'utilisateur sur la page de login
                header("location:login.php");
				exit;
            }

            $data = $this->executeAction();
            $data["isLoggedIn"] = $_SESSION["visibility"] > self::$VISIBILITY_PUBLIC; #si l'utilisateur détient les autorisations pour accéder au site, on met le $data[] = True
            $data["username"] = $_SESSION["username"] ?? "Invité"; #on enregistre également le nom de l'utilisateur s'il y a lieu, sinon on le nomme comme invité

            return $data;
        }

        // Template method
        protected abstract function executeAction();

        /** COPIE DU DOC DU PROF!!! 

        * data = ['key1' => 'value1', 'key2' => 'value2'];

        */

        protected function callAPI($service, $data) {

            $apiURL = "https://magix.apps-de-cours.com/api/" . $service;

            $result = null;


            if ($service == "games/action") {

            $milliseconds = microtime(true) * 1000;


            if (!empty($_SESSION["lastActionCall"]) &&

            $milliseconds - $_SESSION["lastActionCall"] < 250) {

            $result = json_encode("TOO_MANY_ACTIONS");

            }


            $_SESSION["lastActionCall"] = $milliseconds;

            }


            if (empty($result)) {

            $options = [

            'http' => [

            'header' => "Content-type: application/x-www-form-urlencoded\r\n",

            'method' => 'POST',

            'content' => http_build_query($data)

            ]

            ];


            $context = stream_context_create($options);


            $result = file_get_contents($apiURL, false, $context);

            if (strpos($result, "<br") !== false) {

            $result = json_encode($result);

            }

            }


            return json_decode($result);

        }

    
    }