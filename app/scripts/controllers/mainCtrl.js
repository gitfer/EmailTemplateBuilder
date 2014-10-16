'use strict';
app.controller('mainCtrl', function($route, $rootScope, $scope, $filter, _, serverModels) {

    $scope.returnTemplate = function() {
        var template = $route.current.params.template === undefined ? 'views/selectTemplate.html' : 'views/templates/' + $route.current.params.template;
        return template;
    };

    $scope.draggableObjects = [{
        contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
        type: 'testo',
        allineamento: 'block'
    }, {
        contenuto: '<strong>uidu s.r.l</strong>',
        type: 'testo',
        allineamento: 'block'
    }, {
        contenuto: '<strong>uidu s.r.l</strong>',
        type: 'testo',
        allineamento: 'inline'
    },  {
        contenuto: ' · Via Aldo Moro, 17 - 24069 Trescore B.rio (Italy) · VAT/C.F./P.IVA: IT03823680164 · Bergamo Chamber of Commerce',
        type: 'testo',
        allineamento: 'inline'
    },{
        contenuto: 'Lorem',
        type: 'testo',
        allineamento: 'inline'
    }, {
        contenuto: '<div style="display:block !important; clear:both; width:100%;"><div style="height: 60px"><br /><br /></div></div>',
        type: 'spacer',
        allineamento: 'block'
    }, {
        contenuto: '<img alt="Uidu-mongolfiera" src="http://uidu.org/assets/xuidu-mongolfiera-8f320214c33d2b55777a3b5db56c65fb.png.pagespeed.ic.jlvVTSD-Vm.png" >',
        type: 'immagine',
        allineamento: 'block'
    }, {
        contenuto: '<div style="display:block !important; clear:both; width:100%; height: 2px"><hr style="display:block; clear:both; height: inherit;" ></div>',
        type: 'divider',
        allineamento: 'block'
    }, {
        contenuto: '<button>Cliccami</button>',
        allineamento: 'block',
        type: 'button'
    }];
    $scope.editvalue = '';

    $scope.droppedObjects = {};

    $scope.onDropComplete = function(data) {
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
            if (el[0] !== undefined){
                el[0].idEditor = data.idEditor;
            }
        });
    });
    $scope.getHtml = function() {
        $rootScope.$broadcast('getHtml', {modelDropped: $scope.droppedObjects, modelDraggable: $scope.draggableObjects});
    };

    var merge = function(existingModel, serverModel) {
        if (existingModel instanceof Array) {
            existingModel.push(serverModel);
            existingModel = _.flatten(existingModel);
        } else {
            existingModel = _.merge(existingModel, serverModel);
        }
    };

    var mergeDO = function(serverModel) {
        _.forEach(serverModel, function (objServer) {
            var found = false;
            for (var i = $scope.draggableObjects.length - 1; i >= 0; i--) {
                var obj = $scope.draggableObjects[i];
               if(obj.contenuto === objServer.contenuto && obj.type === objServer.type && obj.allineamento === objServer.allineamento){
                    found = true;
                    break;
               }
            }
            if(!found){
                $scope.draggableObjects.push(objServer);
            }
        });
    };

    var modelDraggable = serverModels.data[0] !== undefined ? serverModels.data[0].model.modelDraggable : [];
    var modelDropped = serverModels.data[0] !== undefined ? serverModels.data[0].model.modelDropped : {};
    mergeDO(modelDraggable);
    merge($scope.droppedObjects, modelDropped);

});
