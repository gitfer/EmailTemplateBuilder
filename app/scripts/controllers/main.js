'use strict';

angular.module('emailTemplateBuilderApp', ['ngDraggable'])
	.controller('MainCtrl', function($scope) {
		$scope.draggableObjects = [{name: 'one'}, {name: 'two'}, {name: 'three'}, {name: 'four'}]; 
		$scope.droppedObjects = []; 

		$scope.onDropComplete = function(data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (index == -1)
				$scope.droppedObjects.push(data);
			
            var otherObj = $scope.draggableObjects[index];
            var otherIndex = $scope.draggableObjects.indexOf(obj);
            $scope.draggableObjects[index] = obj;
            $scope.draggableObjects[otherIndex] = otherObj;
		}
		$scope.onDragSuccess = function(data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (index > -1) {
				$scope.droppedObjects.splice(index, 1);
			}
		}
	});