UsuarioInsertController.$inject = ['usuarioService', '$location', '$scope'];
function UsuarioInsertController(usuarioService, $location, $scope) {
    $scope.usuario = {};

    $scope.insert = function () {
        
        var response = usuarioService.insert($scope.usuario);
        response.success(function (data, status, headers, config) {
            alert("Insertado correctamente.");
            $location.path('/usuario/list');
        }).error(function (data, status, headers, config) {
            if (status === 400) {
                $scope.errors = data;
            } else {
                alert("Ha fallado la petición HTTP. Estado HTTP: " + status);
            }
        });
    };
}
app.controller("UsuarioInsertController", UsuarioInsertController);