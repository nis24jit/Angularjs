/**
 * Created by Sudhina on 30/10/16.
 */
angular.module('mainApp.login.controllers',[]).controller('GreetingController'
,function($scope){
    $scope.now=new Date(); //set the model 'now' on scope
    $scope.greeting='Hello'; //set the name model on scope
});