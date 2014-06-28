var signupController = angular.module('signupController', [])


function loginCtrl($scope, $http) {
  $scope.formData = {};
    // $http.post('/api/signup', {
    //   'username' : username,
    //   'password' : password,
    //   'firstname' : firstname,
    //   'lastname' : lastname
    // });
  
  $scope.registerUser = function() {
    $http.post('/api/signup', formData).success(function(data, status, headers) {
      alert('user signed up');
    });
  }

  // $scope.registerUser = function() {
  //      $http.post('/api/signup', data)
  //           .success(function(data) {
  //             })
  //        .error(function(data) {
  //  console.log('Error: ' + data);
  //    });
  // };

}




