'use strict';

angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngDraggable'])
	.controller('MainCtrl', function($scope, $sce) {

		$scope.draggableObjects = [{
			contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
			type: 'testo',
			allineamento: 'block'
		}, {
			contenuto: '<div style="display:block !important; clear:both; width:100%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p style="height: 20px"></p></div>',
			type: 'spacer',
			allineamento: 'block'
		},
		 {
			contenuto: '<div style="display:block !important; clear:both; width:100%;"><img src="/images/yeoman.png"></img></div>',
			type: 'immagine',
			allineamento: 'inline'
		}, 
		{
			contenuto: '<div style="display:block !important; clear:both; width:100%;"><hr style="display:block; clear:both; width:100%; border-width: 1px" ></div>',
			type: 'divider',
			allineamento: 'block'
		}, {
			contenuto: '<input type="button" value="clic" />',
			allineamento: 'block',
			type: 'button'
		}];
		$scope.droppedObjects = [];

		$scope.onDropComplete = function(data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (data.sorgente === "panel") {
				$scope.droppedObjects.push(data);
				console.log('$scope.droppedObjects', $scope.droppedObjects)
			}
		}
		$scope.onDragSuccess = function(data, evt) {
			console.log('onDragSuccess', data, evt)
			// var index = $scope.droppedObjects.indexOf(data);
			// if (index > -1) {
			// 	$scope.droppedObjects.splice(index, 1);
			// }
		}

		$scope.onDropCompleteReorder = function(index, obj, evt) {
			if (obj.sorgente !== "panel") {
				var otherObj = $scope.droppedObjects[index];
				var otherIndex = $scope.droppedObjects.indexOf(obj);
				$scope.droppedObjects[index] = obj;
				$scope.droppedObjects[otherIndex] = otherObj;
			}
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