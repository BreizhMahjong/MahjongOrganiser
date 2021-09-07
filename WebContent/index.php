<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Breizh Mahjong Voutch</title>
<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/modulestyle.css">

<link rel="icon" type="image/png" href="images/calendar.png">

</head>
<body>
<?php
require_once ("db_php/query_common.php");
require_once ("db_php/query_login_logout.php");

if(isset($_COOKIE[COOKIE_NAME_ID])) {
	decryptCookie($_COOKIE[COOKIE_NAME_ID]);
	$isLogin = isset($_SESSION[SESSION_LOG_IN_ID]);
	if($isLogin) {
		$loginId = $_SESSION[SESSION_LOG_IN_ID];
		$isAdmin = $_SESSION[SESSION_IS_ADMIN];
	} else {
		$loginId = 0;
		$isAdmin = false;
	}
} else {
	$isLogin = false;
	$loginId = 0;
	$isAdmin = false;
}

if(isset($_GET["menu"])) {
	$menu = $_GET["menu"];
	if(!$isLogin && !$isAdmin && $menu !== "meeting") {
		$menu = "meeting";
	} else if($isLogin && !$isAdmin && $menu !== "poll" && $menu !== "event" && $menu !== "meeting") {
		$menu = "meeting";
	} else if($isLogin && $isAdmin && $menu !== "create" && $menu !== "modify" && $menu !== "poll" && $menu !== "event" && $menu !== "meeting") {
		$menu = "meeting";
	}
} else {
	$menu = "meeting";
}
?>
	<div id="parent">
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/bmjo"> <img src="images/logo_render_small.png" />
					</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<?php
						if($isAdmin) {
							if($menu === "create") {
								echo "<li class=\"active\"><a href=\"?menu=create\">Créer</a></li>";
								echo "<li><a href=\"?menu=modify\">Modifier</a></li>";
								echo "<li><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li><a href=\"?menu=event\">Événement</a></li>";
								echo "<li><a href=\"?menu=meeting\">Séance</a></li>";
							} else if($menu === "modify") {
								echo "<li><a href=\"?menu=create\">Créer</a></li>";
								echo "<li class=\"active\"><a href=\"?menu=modify\">Modifier</a></li>";
								echo "<li><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li><a href=\"?menu=event\">Événement</a></li>";
								echo "<li><a href=\"?menu=meeting\">Séance</a></li>";
							} else if($menu === "poll") {
								echo "<li><a href=\"?menu=create\">Créer</a></li>";
								echo "<li><a href=\"?menu=modify\">Modifier</a></li>";
								echo "<li class=\"active\"><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li><a href=\"?menu=event\">Événement</a></li>";
								echo "<li><a href=\"?menu=meeting\">Séance</a></li>";
							} else if($menu === "event") {
								echo "<li><a href=\"?menu=create\">Créer</a></li>";
								echo "<li><a href=\"?menu=modify\">Modifier</a></li>";
								echo "<li><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li class=\"active\"><a href=\"?menu=event\">Événement</a></li>";
								echo "<li><a href=\"?menu=meeting\">Séance</a></li>";
							} else if($menu === "meeting") {
								echo "<li><a href=\"?menu=create\">Créer</a></li>";
								echo "<li><a href=\"?menu=modify\">Modifier</a></li>";
								echo "<li><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li><a href=\"?menu=event\">Événement</a></li>";
								echo "<li class=\"active\"><a href=\"?menu=meeting\">Séance</a></li>";
							}
						} else if($isLogin) {
							if($menu === "event") {
								echo "<li class=\"active\"><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li><a href=\"?menu=event\">Evenement</a></li>";
								echo "<li><a href=\"?menu=meeting\">Séance</a></li>";
							} else if($menu === "event") {
								echo "<li><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li class=\"active\"><a href=\"?menu=event\">Evenement</a></li>";
								echo "<li><a href=\"?menu=meeting\">Séance</a></li>";
							} else if($menu === "meeting") {
								echo "<li><a href=\"?menu=poll\">Sondage</a></li>";
								echo "<li><a href=\"?menu=event\">Événement</a></li>";
								echo "<li class=\"active\"><a href=\"?menu=meeting\">Séance</a></li>";
							}
						} else {
							if($menu === "meeting") {
								echo "<li class=\"active\"><a href=\"?menu=meeting\">Séance</a></li>";
							}
						}
						?>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<?php if($isLogin) { ?>
						<li>
						<?php
							$avatarPath1 = '../wp-content/uploads/ultimatemember/' . $loginId . '/profile_photo-40x40.jpg';
							$avatarPath2 = '../wp-content/uploads/ultimatemember/' . $loginId . '/profile_photo-40.jpg';
							$avatarPath3 = '../wp-content/uploads/ultimatemember/' . $loginId . '/profile_photo-40x40.png';
							$avatarPath4 = '../wp-content/uploads/ultimatemember/' . $loginId . '/profile_photo-40.png';
							if(file_exists($avatarPath1)) {
								echo "<img class=\"navbar-brand\" src=\"" . $avatarPath1 . "\"/>";
							} else if(file_exists($avatarPath2)) {
								echo "<img class=\"navbar-brand\" src=\"" . $avatarPath2 . "\"/>";
							} else if(file_exists($avatarPath3)) {
								echo "<img class=\"navbar-brand\" src=\"" . $avatarPath3 . "\"/>";
							} else if(file_exists($avatarPath4)) {
								echo "<img class=\"navbar-brand\" src=\"" . $avatarPath4 . "\"/>";
							} else {
								echo "<img class=\"navbar-brand\" src=\"../wp-content/uploads/2018/07/ouest-riichi.png\"/>";
							}
							?>
						</li>
						<li>
							<button id="logoutButton" type="button" class="btn btn-default navbar-btn" onclick="logoutEvent()">
								<span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Déconnexion
							</button>
						</li>
						<?php } else { ?>
						<li>
							<button id="loginButton" href="#modal" type="button" class="btn btn-success navbar-btn">
								<span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Connexion
							</button>
						</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</nav>
		<div id="content">
			<?php
			if($menu === "meeting" || $menu === "event" || $menu === "poll") {
				include ("page_php/display.php");
			} else {
				include ("page_php/" . $menu . ".php");
			}
			?>
		</div>
	</div>

	<footer>
		<p align="center">Authors : Pierric Willemet, Yulong Zhao @ <a href="https://breizhmahjong.fr/">Breizh Mahjong</a>
	</footer>

	<div id="modal" class="popupContainer">
		<header class="popupHeader">
			<span class="header_title">Authentification</span> <span class="modal_close"> <span class="glyphicon glyphicon-remove"> </span>
			</span>
		</header>
		<section class="popupBody">
			<form id="loginForm">
				<p id="loginError"></p>
				<label for="loginInput">Identifiant : </label>
				<div class="input-group">
					<input id="loginInput" type="text" class="form-control" aria-describedby="basic-addon2" />
				</div>
				<br /> <label for="passwordInput">Mot de passe : </label>
				<div class="input-group">
					<input id="passwordInput" type="password" class="form-control" aria-describedby="basic-addon2" />
				</div>
				<br />
				<button id="validateLoginButton" type="button" class="btn btn-primary" onclick="loginEvent()" aria-label="Left Align">Se connecter</button>
			</form>
		</section>
	</div>

	<script type="text/javascript" src="lib/jquery-1.12.3.min.js"></script>
	<script type="text/javascript" src="lib/jquery.leanModal.min.js"></script>
	<script type="text/javascript" src="lib/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="page_js/main.js"></script>
	<?php
	if($isAdmin) {
		echo "<script type=\"text/javascript\">var moduleOpenedOnlyConst=0</script>";
		echo "<script type=\"text/javascript\">var moduleLimitConst=0</script>";
		echo "<script type=\"text/javascript\">var moduleWithinDaysConst=0</script>";
		echo "<script type=\"text/javascript\">var displaySystemMessage=1</script>";
		if($menu === "meeting") {
			echo "<script type=\"text/javascript\">var moduleTypeConst=0</script>";
			echo "<script type=\"text/javascript\" src=\"page_js/display.js\"></script>";
		} else if($menu === "event") {
			echo "<script type=\"text/javascript\">var moduleTypeConst=1</script>";
			echo "<script type=\"text/javascript\" src=\"page_js/display.js\"></script>";
		} else if($menu === "poll") {
			echo "<script type=\"text/javascript\">var moduleTypeConst=2</script>";
			echo "<script type=\"text/javascript\" src=\"page_js/display.js\"></script>";
		} else {
			echo "<script type=\"text/javascript\" src=\"page_js/" . $menu . ".js\"></script>";
		}
	} else {
		echo "<script type=\"text/javascript\">var displaySystemMessage=0</script>";
		if($menu === "meeting") {
			echo "<script type=\"text/javascript\">var moduleOpenedOnlyConst=1</script>";
			echo "<script type=\"text/javascript\">var moduleLimitConst=5</script>";
			echo "<script type=\"text/javascript\">var moduleWithinDaysConst=30</script>";
			echo "<script type=\"text/javascript\">var moduleTypeConst=0</script>";
			echo "<script type=\"text/javascript\" src=\"page_js/display.js\"></script>";
		} else if($menu === "event") {
			echo "<script type=\"text/javascript\">var moduleOpenedOnlyConst=1</script>";
			echo "<script type=\"text/javascript\">var moduleLimitConst=0</script>";
			echo "<script type=\"text/javascript\">var moduleWithinDaysConst=0</script>";
			echo "<script type=\"text/javascript\">var moduleTypeConst=1</script>";
			echo "<script type=\"text/javascript\" src=\"page_js/display.js\"></script>";
		} else if($menu === "poll") {
			echo "<script type=\"text/javascript\">var moduleOpenedOnlyConst=0</script>";
			echo "<script type=\"text/javascript\">var moduleLimitConst=0</script>";
			echo "<script type=\"text/javascript\">var moduleWithinDaysConst=0</script>";
			echo "<script type=\"text/javascript\">var moduleTypeConst=2</script>";
			echo "<script type=\"text/javascript\" src=\"page_js/display.js\"></script>";
		} else {
			echo "<script type=\"text/javascript\" src=\"page_js/" . $menu . ".js\"></script>";
		}
	}
	?>
</body>
</html>