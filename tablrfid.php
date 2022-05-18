<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$filter = $header1->filter;

$Query = "";

$Query = "select id,fletero,serial from vlayoutforw where zafra = zafraday() ";

if(strlen(trim($filter)) > 0)
{
    $Query = $Query . " and " .$filter;
}

$Query = $Query . " order by id";


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
