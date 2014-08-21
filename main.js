angular.module('quiz',['ngMaterial','ngLocale'])
.controller('QuizCtrl', function($scope) {

  $scope.testCompleted = false;
  $scope.answers = {
    q1 : '1',
    q2 : {
    	c1:'false',
    	c2:'false',
    	c3:'false',
    	c4:'false',
    },
    q3 :'1',
    q4 :{},
    q5 :{}
  };

  $scope.expectedAnswers = {
    q1 : '1',
    q2 : {
    	c1:true,
    	c2:true,
    	c3:'false',
    	c4:'false'
    }
  };

  $scope.endTest = function(){
 	$scope.testCompleted = true;
  }

});