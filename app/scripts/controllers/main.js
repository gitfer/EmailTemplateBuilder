'use strict';

angular.module('emailTemplateBuilderApp', ['ngDraggable'])
	.controller('MainCtrl', function($scope) {

        $scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index == -1)
            $scope.droppedObjects1.push(data);
        }
        $scope.onDragSuccess1=function(data,evt){
            // var index = $scope.droppedObjects1.indexOf(data);
            // if (index > -1) {
            //     $scope.droppedObjects1.splice(index, 1);
            // }
        }
        
        $scope.onDropComplete = function (index, obj, evt) {
            var otherObj = $scope.droppedObjects1[index];
            var otherIndex = $scope.droppedObjects1.indexOf(obj);
            $scope.droppedObjects1[index] = obj;
            $scope.droppedObjects1[otherIndex] = otherObj;
        }

        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }
	});