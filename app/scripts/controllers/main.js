'use strict';

angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngDraggable'])
	.controller('MainCtrl', function($rootScope, $scope, $sce, $filter) {

		$scope.draggableObjects = [{
			contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
			type: 'testo',
			allineamento: 'block'
		},{ 
			contenuto: 'Lorem',
			type: 'testo', 
			allineamento: 'inline'
		},{
			contenuto: '<div style="display:block !important; clear:both; width:100%;"><div style="height: 60px"><br /><br /></div></div>',
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
			contenuto: 'Cliccami',
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
		//TODO: refactoring
		Array.prototype.max = function (property, max_value) {
				
				if(this.length === 0)
					return 0;

				var max_value = max_value || 1;
			    for (var i = 0, len = this.length; i < len; i++) {
			        if (this[i][property] >= max_value)
			        	max_value = this[i][property]
			    }
			    return max_value;
    	};

		var clone = function  (data) {
				var el = {};
				angular.copy(data, el);
				el.id = $scope.droppedObjects.max('id') + 1;
				return el;
		}

		$scope.onDropCompleteReorder = function(index, obj, evt) {
			// TODO: refactoring! Come, non so! il controllo sul length serve per il remove dell'ultimo elemento
			if (obj.sorgente !== "panel" && $scope.droppedObjects.length > 1) {
				var otherObj = $scope.droppedObjects[index];
				var otherIndex = $scope.droppedObjects.indexOf(obj);
				$scope.droppedObjects[index] = obj;
				$scope.droppedObjects[otherIndex] = otherObj;
			}
		}
		$scope.onDropCompleteRemove = function (data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (index > -1) {
				$scope.droppedObjects.splice(index, 1);
			}
		}
 
		// TODO: capire perche' questo!
		$scope.setFormScope= function(scope){
		   this.formScope = scope;
		}

		$scope.addNewDraggable = function(formInvalid, newDraggable) {
			if(formInvalid)
				return;
			$scope.draggableObjects.push(angular.copy(newDraggable));
			this.formScope.formAddDraggable.$setPristine();
			this.formScope.newDraggable = {type: "testo", allineamento:"block"};
			this.formScope.addDraggableElement = false; 
		}

		$scope.removeDraggable = function(draggable) {
			console.log('click', draggable)
			var index = $scope.draggableObjects.indexOf(draggable);
			if(index > -1)
				$scope.draggableObjects.splice(index, 1);
		};
		$rootScope.$on('draggable:dblclick', function(dragEnabled, element, data) {
			console.log(dragEnabled, element, data);
		});
	});