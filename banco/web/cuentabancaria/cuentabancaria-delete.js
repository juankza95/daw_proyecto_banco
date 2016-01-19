CuentaBancariaDeleteController.$inject = ['cuentaBancariaService', '$scope', '$routeParams', '$location'];
function CuentaBancariaDeleteController(cuentaBancariaService, $scope, $routeParams, $location) {
    var response = cuentaBancariaService.detail($routeParams.idCuentaBancaria).success(function (data, status, headers, config) {
        $scope.cuentaBancaria = data;
        var fechaCreacion = new Date(data.fechaCreacion);
        $scope.cuentaBancaria.fechaCreacion = fechaCreacion.getFullYear() + "-" + (fechaCreacion.getMonth() + 1) + "-" + fechaCreacion.getDate();
        $scope.ccc = $scope.cuentaBancaria.sucursalBancaria.entidadBancaria.codigoEntidadBancaria + " " + $scope.cuentaBancaria.sucursalBancaria.codigoSucursalBancaria + " " + $scope.cuentaBancaria.digitoControl + " " + $scope.cuentaBancaria.numeroCuenta;
        $scope.sucursal = $scope.cuentaBancaria.sucursalBancaria.codigoSucursalBancaria + "  " + $scope.cuentaBancaria.sucursalBancaria.direccion;
        $scope.usuario = $scope.cuentaBancaria.usuario.nombre + " " + $scope.cuentaBancaria.usuario.apellidos;
    }).error(function (data, status, headers, config) {
        alert("HTTP request failed. Status: " + status);
    });



    $scope.delete = function () {
        var response = cuentaBancariaService.delete($routeParams.idCuentaBancaria).success(function (data, status, headers, config) {
        alert("Borrado correctamente.");
        $location.path("/cuentabancaria/list");
    }).error(function (data, status, headers, config) {
        alert("Ha fallado la petición HTTP. Estado: " + status);
    });
    };
}
app.controller("CuentaBancariaDeleteController", CuentaBancariaDeleteController);