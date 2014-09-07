angular.module('quiz',['ngMaterial','ngLocale'])
.controller('QuizCtrl', function($scope,$materialDialog, $materialToast) {

  $scope.testCompleted = false;
  $scope.answers = {
    q1 : '4',
    q2 : {
    	c1:false,
    	c2:false,
    	c3:false,
    	c4:false
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

  $scope.q1Correct = function(){
     if($scope.answers.q1 == 2)
     	return true;
     return false;
  }


  $scope.q2Correct = function(){
  	var answers = $scope.answers;
     if(answers.q2.c1 && answers.q2.c5 && answers.q2.c7 && answers.q2.c8 &&
     	!answers.q2.c2 && !answers.q2.c3 && !answers.q2.c4 && !answers.q2.c6)
     	return true;
     return false;
  }

  $scope.q3Correct = function(){
  	var answers = $scope.answers;
     if(answers.q3 == 2)
     	return true;
     return false;
  }


  $scope.q4Correct = function(){
  	var answers = $scope.answers;
     if(answers.q4.c1 && answers.q4.c2 && answers.q4.c4 && answers.q4.c5 && answers.q4.c7 && answers.q4.c8
     	&& !answers.q4.c3 && !answers.q4.c6)
     	return true;
     return false;
  }

  $scope.q5Correct = function(){
  	var answers = $scope.answers;
     if(answers.q5.c1 && answers.q5.c3 && answers.q5.c5 && answers.q5.c7
     	&& !answers.q5.c2&& !answers.q5.c4 && !answers.q5.c6)
     	return true;
     return false;
  }
  
///////////////////////////////////////////////////////
// watch for correct answers and scroll to next question
///////////////////////////////////////////////////////

$scope.smoothScroll = function (id){
	setTimeout(function(){
		smoothScroll.animateScroll( null, id )
	},1000);
}

$scope.$watch( $scope.q1Correct, function(newVal,oldVal){
	if(newVal)	$scope.smoothScroll('#q2' );	
})
	
$scope.$watch( $scope.q2Correct, function(newVal,oldVal){
	if(newVal)	$scope.smoothScroll('#q3' );	
})

$scope.$watch( $scope.q3Correct, function(newVal,oldVal){
	if(newVal)	$scope.smoothScroll('#q4' );	
})

$scope.$watch( $scope.q4Correct, function(newVal,oldVal){
	if(newVal)	$scope.smoothScroll('#q5' );	
})

$scope.$watch( $scope.q5Correct, function(newVal,oldVal){
	if(newVal){

		$scope.openDialog(null);
	}	
})

$scope.openDialog = function ($event){
		setTimeout(function(){
			$materialDialog({
			  clickOutsideToClose:false,
		      templateUrl: 'youWon.tpl.html',
		      targetEvent: $event,
		      controller: ['$scope', '$hideDialog', function($scope, $hideDialog) {
		        $scope.reloadPage = function() {
		          //$hideDialog();
		          location.href ='/';
		        };
		      }]
		    });

		},500)
}


  $scope.wronngChoices = 1;

  $scope.toastWrongChoice = function($event,modelVal) {
  	if(modelVal){
		var hideToast = $materialToast({
		      template: '<material-toast>Nope: &nbsp;&nbsp; <b>'+$scope.wronngChoices+'</b></material-toast>',
		      duration: 1000,
		      position:'top right'//,
		      //locals: {count: $scope.wronngChoices}
		    });
		    $scope.wronngChoices++;  		
  	}
    
  };









$scope.endTest = function($event){
 	$scope.testCompleted = true;
}



$scope.reloadPage = function (){
	location.reload();
}

})
.directive('qzWronganswerBar', function() {
	// usage
	// <qz-wronganswer-bar wrong-when='myExpr'></qz-wronganswer-bar>
    return {
      transclude: true,
      replace:true,
      restrict: 'E',
      scope:{
      	expr:'&if',
      },
      templateUrl: 'qzWronganswerBar.html',
      link: function (scope, element, attrs) {

      	//scope.$watch('expr',)
      }
    };
  })
.directive('qzCorrectanswerBar', function() {
	// usage
	// <qz-correctanswer-bar when='myExpr'></qz-correctanswer-bar>
    return {
      transclude: true,
      replace:true,
      restrict: 'E',
      scope:{
      	expr:'&if',
      },
      templateUrl: 'qzCorrectanswerBar.html',
      link: function (scope, element, attrs) {

      	//scope.$watch('expr',)
      }
    };
  })