<?php

require 'vendor/autoload.php';

use Doctrine\DBAL\DriverManager;


$connectionParams = array(
    'dbname' => 'ingenioel_applications',
    'user' => 'ingenioel_applications',
    'password' => 'ADV12345',
    'host' => 'localhost',
    'driver' => 'pdo_mysql',
);

$con = Doctrine\DBAL\DriverManager::getConnection($connectionParams);
