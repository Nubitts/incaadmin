<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$hash = $header1->hash_;

$Query = "select idpersonal,fullname from vaccusrapp where tkusr = '" . $hash . "'";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

    $Query1 = "select idpersonal,fullname from vaccusrapp where tkusr = '" . $hash . "'";
} else {

    $Query1 = "select '0' as idpersonal, '' as fullname ";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
