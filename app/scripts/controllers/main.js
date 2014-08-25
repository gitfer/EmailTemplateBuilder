'use strict';

angular.module('emailTemplateBuilderApp', ['ngSanitize','ngDraggable'])
	.controller('MainCtrl', function($scope, $sce) {

		$scope.draggableObjects = [{
			contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
			type: 'testo'
		}, {
			contenuto: 'two',
			type: 'immagine'
		}, {
			contenuto: 'three',
			type: 'spacer'
		}, {
			contenuto: 'four',
			type: 'divider'
		}, {
			contenuto: 'five',
			type: 'button'
		}];
		$scope.droppedObjects = [];

		$scope.onDropComplete = function(data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (index == -1)
				$scope.droppedObjects.push(data);
		}
		$scope.onDragSuccess = function(data, evt) {
			// var index = $scope.droppedObjects.indexOf(data);
			// if (index > -1) {
			//     $scope.droppedObjects.splice(index, 1);
			// }
		}

		$scope.onDropCompleteReorder = function(index, obj, evt) {
			var otherObj = $scope.droppedObjects[index];
			var otherIndex = $scope.droppedObjects.indexOf(obj);
			$scope.droppedObjects[index] = obj;
			$scope.droppedObjects[otherIndex] = otherObj;
		}

		$scope.removeComponent = function(obj) {
			var index = $scope.droppedObjects.indexOf(obj);
			if (index > -1) {
				$scope.draggableObjects.splice(index, 1);
			}
		}
		var inArray = function(array, obj) {
			var index = array.indexOf(obj);
		}
	});