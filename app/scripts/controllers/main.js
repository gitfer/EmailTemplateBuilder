'use strict';

angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngDraggable'])
	.controller('MainCtrl', function($scope, $sce) {

		$scope.draggableObjects = [{
			contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
			type: 'testo',
			allineamento: 'block'
		},{
			contenuto: 'Lorem',
			type: 'testo',
			allineamento: 'inline'
		},{
			contenuto: '<div style="display:block !important; clear:both; width:100%;"><p style="height: 60px"></p></div>',
			type: 'spacer',
			allineamento: 'block'
		},
		 {
			contenuto: '<div style="display:block !important; clear:both; width:100%; height: 30px;"><img src="/images/yeoman.png"></img></div>',
			type: 'immagine',
			allineamento: 'block'
		}, 
		{
			contenuto: '<div style="display:block !important; clear:both; width:100%; height: 30px;padding: 40px !important;"><hr style="display:block; clear:both; height: inherit;" ></div>',
			type: 'divider',
			allineamento: 'block'
		}, {
			contenuto: '<button>ciao</button>',
			allineamento: 'block',
			type: 'button'
		}];
		$scope.droppedObjects = [];

		$scope.onDropComplete = function(data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (data.sorgente === "panel") {
				$scope.droppedObjects.push(clone(data));
			}
		}
		var clone = function  (data) {
				var el = {};
				for(var proprieta in data){
					el[proprieta] = data[proprieta]; 
				}
				el.id = $scope.droppedObjects.length + 1;
				return el;
		}
		$scope.onDragSuccess = function(data, evt) {
			// console.log('onDragSuccess', data, evt)
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