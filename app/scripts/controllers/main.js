'use strict';

angular.module('emailTemplateBuilderApp', ['ngDraggable'])
  .controller('MainCtrl', function ($scope) {
   $scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}, {name:'four'}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index == -1)
            $scope.droppedObjects1.push(data);
        }
        $scope.onDragSuccess1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
  });
