var table;
var table1;

angular.module("hr", [])
      .controller("hrController", ["$scope", "$http", function($scope, $http) {


        $scope.init = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId; 

          $http.post("./datusr.php", angular.toJson($scope.hr1))
            .then(function(respuesta) {

              $datos = respuesta.data;

              if ($datos[0]['idpersonal'] != "0")
              {

                  $scope.hr1.idusr = $datos[0]['idPersonal'];
                  $scope.hr1.user = $datos[0]['fullname'];

                    $http.post("./tablrfid.php", angular.toJson($scope.hr1))
                    .then(function(respuesta) {

                      $datoss = respuesta.data;
                      tabla($datoss);
                      tabla1();
                      

                    });

              }
              else
              {
                bootbox.alert("usuario invalido o password incorrecto...!");
              }
            });

        };
        
        $scope.export = function () {
                    
          table1.download("xlsx", "layout.xlsx",{
              documentProcessing:function(workbook){
                  //workbook - sheetJS workbook object

                  //set some properties on the workbook file
                  workbook.Props = {
                      Title: "Fleteros",
                      Subject: "INCA-IT",
                  };

                  return workbook;
              }
          }); //download a xlsx file using SheetJS properties

        };

        $scope.clearall = function () {
                    
          tabla1();

                    $http.post("./tablrfid.php", angular.toJson($scope.hr1))
                    .then(function(respuesta) {

                      $datoss = respuesta.data;
                      tabla($datoss);

                    });

        };        

        $scope.moveall = function () {

          var $arrData = table.rowManager.activeRows

          var $Arrival = []

          $arrData.forEach(item => $Arrival.push( item.data))

          tabla1a($Arrival)
                    
          table.clearData();

        };           

      }]);

//Define variables for input elements
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");

//Custom filter example
function customFilter(data){
    return data.car && data.rating < 3;
}

//Trigger setFilter function with correct parameters
function updateFilter(){
  var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
  var typeVal = typeEl.options[typeEl.selectedIndex].value;

  var filter = filterVal == "function" ? customFilter : filterVal;

  if(filterVal == "function" ){
    typeEl.disabled = true;
    valueEl.disabled = true;
  }else{
    typeEl.disabled = false;
    valueEl.disabled = false;
  }

  if(filterVal){
    table.setFilter(filter,typeVal, valueEl.value);
  }
}

//Update filters on value change
document.getElementById("filter-field").addEventListener("change", updateFilter);
document.getElementById("filter-type").addEventListener("change", updateFilter);
document.getElementById("filter-value").addEventListener("keyup", updateFilter);

//Clear filters on "Clear Filters" button click
document.getElementById("filter-clear").addEventListener("click", function(){
  fieldEl.value = "";
  typeEl.value = "=";
  valueEl.value = "";

  table.clearFilter();
});

function tabla(datos) {

  table = new Tabulator("#listdat1", {
    layout:"fitDataFill",
    movableRows:true,
    movableRowsConnectedTables:"#listdat2",
    movableRowsReceiver: "add",
    movableRowsSender: "delete",
            height: "400px",
                    data: datos,
                    columns: [                      
                    {title:"Id", field:"id", sorter:"number"},
                    {title:"Fletero", field:"fletero"},
                    {title:"RFID", field:"serial"},
                    ],
  });
  
};

function tabla1() {

  table1 = new Tabulator("#listdat2", {
    layout:"fitDataFill",
    movableRows:true,
    placeholder: "Colocar datos aqui",
    height: "400px",
    width: table.width,
                    data: [],
                    columns: [                      
                    {title:"Id", field:"id"},
                    {title:"Fletero", field:"fletero"},
                    {title:"RFID", field:"serial"},
                    ],
  });
 
};

function tabla1a(datos) {

  table1 = new Tabulator("#listdat2", {
    layout:"fitDataFill",
    movableRows:true,
    placeholder: "Colocar datos aqui",
    height: "400px",
    width: table.width,
                    data: datos,
                    columns: [                      
                    {title:"Id", field:"id"},
                    {title:"Fletero", field:"fletero"},
                    {title:"RFID", field:"serial"},
                    ],
  });
 
};