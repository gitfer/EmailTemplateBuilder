'use strict';
app.controller('MainCtrl', function($rootScope, $scope, $sce, $filter, _) {
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
        contenuto: 'Lorem',
        type: 'testo',
        allineamento: 'inline'
    }, {
        contenuto: '<div style="display:block !important; clear:both; width:100%;"><div style="height: 60px"><br /><br /></div></div>',
        type: 'spacer',
        allineamento: 'block'
    }, {
        contenuto: '<div style="display:block !important; clear:both; width:100%; height: 30px;"><img src="/images/yeoman.png"></img></div>',
        type: 'immagine',
        allineamento: 'block'
    }, {
        contenuto: '<div style="display:block !important; clear:both; width:100%; height: 30px;padding: 40px !important;"><hr style="display:block; clear:both; height: inherit;" ></div>',
        type: 'divider',
        allineamento: 'block'
    }, {
        contenuto: 'Cliccami',
        allineamento: 'block',
        type: 'button'
    }];
    $scope.editvalue = '';

    $scope.droppedObjects = [];

    $scope.onDropComplete = function(data) {
        if (data.sorgente === 'panel') {
            $scope.droppedObjects.push(clone(data));
        }
    };
    //TODO: refactoring
    Array.prototype.max = function(property, maxValue) {

        if (this.length === 0) {
            return 0;
        }

        var max = maxValue || 1;
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
        el.id = $scope.droppedObjects.max('id') + 1;
        return el;
    };

    $scope.onDropCompleteReorder = function(index, obj) {
        // TODO: refactoring! Come, non so! il controllo sul length serve per il remove dell'ultimo elemento
        if (obj.sorgente !== 'panel' && $scope.droppedObjects.length > 1) {
            var otherObj = $scope.droppedObjects[index];
            var otherIndex = $scope.droppedObjects.indexOf(obj);
            $scope.droppedObjects[index] = obj;
            $scope.droppedObjects[otherIndex] = otherObj;
        }
    };
    $scope.onDropCompleteRemove = function(data) {
        var index = $scope.droppedObjects.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects.splice(index, 1);
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
        if (index > -1){
            $scope.draggableObjects.splice(index, 1);
        }
    };
    $scope.$on('setEdit:dblclick', function(data, contenuto) {
        // $scope.$apply(function() {
        console.log('data post', contenuto.contenuto);
        $scope.editvalue = contenuto.contenuto;
        // });
    });
    
    $scope.$on('finishEdit:dblclick', function(obj, data) {
        var el = _.where($scope.droppedObjects, {
            id: data.data.id
        });
        $scope.$apply(function() {
            el[0].contenuto = $scope.editvalue;
        });
    });
});
