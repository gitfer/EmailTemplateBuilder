'use strict';
app.controller('MainCtrl', function($route, $rootScope, $scope, $sce, $filter, _) {

    $scope.returnTemplate = function() {
        return 'views/templates/' + $route.current.params.template;
    };
    $scope.tinymceOptions = {
        directionality: 'ltr',
        plugins: 'code',
        toolbar: 'styleselect bold italic print forecolor backcolor',
        setup: function(ed) {
            ed.on('change', function() {
                $scope.$apply(function() {
                    $scope.editvalue = ed.getContent();
                });
            });
        }
    };

    $scope.draggableObjects = [{
        contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
        type: 'testo',
        allineamento: 'block'
    }, {
        contenuto: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
        type: 'testo',
        allineamento: 'block'
    }];
    $scope.editvalue = '';

    $scope.droppedObjects = {};

    $scope.onDropComplete = function(data, event) {
        if (data.sorgente === 'panel') {
            if (angular.isUndefined($scope.droppedObjects[data.ngDropIdCollection])) {
                $scope.droppedObjects[data.ngDropIdCollection] = [];
            }
            $scope.droppedObjects[data.ngDropIdCollection].push(clone(data));
        }
    };

    //TODO: refactoring
    Array.prototype.max = function(property, maxValue) {
        var max = maxValue || 0;
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][property] >= max) {
                max = this[i][property];
            }
        }
        return max;
    };

    var clone = function(data) {
        var el = {};
        angular.copy(data, el);
        el.id = $scope.droppedObjects[data.ngDropIdCollection].max('id') + 1;
        return el;
    };

    $scope.onDropCompleteReorder = function(index, data) {
        // TODO: refactoring! Come, non so! il controllo sul length serve per il remove dell'ultimo elemento
        if (data.sorgente !== 'panel' && $scope.droppedObjects[data.ngDropIdCollection].length > 1) {
            var otherObj = $scope.droppedObjects[data.ngDropIdCollection][index];
            var otherIndex = $scope.droppedObjects[data.ngDropIdCollection].indexOf(data);
            $scope.droppedObjects[data.ngDropIdCollection][index] = data;
            $scope.droppedObjects[data.ngDropIdCollection][otherIndex] = otherObj;
        }
    };
    $scope.onDropCompleteRemove = function(data) {
        var idCollezione = parseInt(data.idCollezione);
        var index = $scope.droppedObjects[idCollezione].indexOf(data);
        if (index > -1) {
            $scope.droppedObjects[idCollezione].splice(index, 1);
        }
    };

    // TODO: capire perche' questo!
    $scope.setFormScope = function(scope) {
        this.formScope = scope;
    };

    $scope.addNewDraggable = function(formInvalid, newDraggable) {
        if (formInvalid) {
            return;
        }
        $scope.draggableObjects.push(angular.copy(newDraggable));
        this.formScope.formAddDraggable.$setPristine();
        this.formScope.newDraggable = {
            type: 'testo',
            allineamento: 'block'
        };
        this.formScope.addDraggableElement = false;
    };

    $scope.removeDraggable = function(draggable) {
        var index = $scope.draggableObjects.indexOf(draggable);
        if (index > -1) {
            $scope.draggableObjects.splice(index, 1);
        }
    };
    $scope.$on('setEdit:dblclick', function(data, contenuto) {
        $scope.editvalue = contenuto.contenuto;
    });

    $scope.$on('finishEdit:dblclick', function(obj, data) {
        var idCollezione = parseInt(data.data.ngDropIdCollection);
        var el = _.where($scope.droppedObjects[idCollezione], {
            id: data.data.id
        });
        $scope.$apply(function() {
            if (el[0].type !== 'testo' && el[0].type !== 'immagine') {
                el[0].contenuto = String(data.data.contenuto).replace(/<[^>]+>/gm, '');
            } else {
                el[0].contenuto = data.data.contenuto;
            }
        });
    });

    $scope.$on('idEditor:changed', function(obj, data) {
        var idCollezione = parseInt(data.idCollection);
        var el = _.where($scope.droppedObjects[idCollezione], {
            id: data.id
        });
        $scope.$apply(function() {
            if (el[0] !== undefined)
                el[0].idEditor = data.idEditor;
        });
    });
    $scope.getHtml = function () {
        $rootScope.$broadcast('getHtml');
    }
});
