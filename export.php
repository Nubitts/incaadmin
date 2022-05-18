<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$field = $header1->field;
$type = $header1->type;
$value = $header1->value;

$Query = "";
$Condicion = "";

if (strlen(trim($filter)) > 0) {
    $Query = $Query . " and " . $filter;
}

if ($type == 'like') {
    $Condicion = $field . "like '%" . $value . "%'";
} else {
    $Condicion = $field . " " . $type . " '" . $value . "'";
}

$Query = "select id,fletero,serial from vlayoutforw where zafra = zafraday()";


$Query = $Query . " order by id";


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;


require('./xlsxwriter.class.php');

$fname = 'my_1st_php_excel_workbook.xlsx';
$header1 = [
    'ID' => 'numeric',
    'Fletero' => 'string',
    'Serial' => 'string'
];

$styles2 = array(['font-size' => 10], ['font-size' => 10], ['font-size' => 10]);

$writer = new XLSXWriter();
$writer->setAuthor('INCA');
$writer->writeSheet($movi, 'Layout', $header1);  // with headers

$writer->writeToFile($fname);   // creates XLSX file (in current folder) 
echo "Wrote $fname (" . filesize($fname) . " bytes)<br>";
