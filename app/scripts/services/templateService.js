
app.service('templateService', ['$http', 'emailTemplateBuilderConfig', function($http, emailTemplateBuilderConfig) {
    return {
        loadTemplates: function() {
            return $http.get(emailTemplateBuilderConfig.urlPostTemplates).success(function(data) {
                return data;
            });
        },
        loadModel: function(filename) {
            return $http.get(emailTemplateBuilderConfig.urlPostTemplates, {
                params: {
                    filename: filename
                }
            }).success(function(data) {
                return data;
            });
        }
    };
}]);