app.controller('templateCtrl', ['$scope', '_', 'serverTemplates', function ($scope, _, serverTemplates) {
	$scope.selectedTemplate='basic';
	$scope.templates = [
	{
		name: 'basic',
		img: 'basic.jpg',
		tmpl: 'basic.html'
	},
	{
		name: 'hero',
		img: 'hero.jpg',
		tmpl: 'hero.html'
	},
	{
		name: 'sidebar',
		img: 'sidebar.jpg',
		tmpl: 'sidebar.html'
	},
	{
		name: 'sidebar-hero',
		img: 'sidebar-hero.jpg',
		tmpl: 'sidebar-hero.html'
	},
	];
	var mergeTemplates = function () {
		$scope.templates.push(_.map(serverTemplates.data, function (template) {
			return { name: template.name, img: '', tmpl: template.tmpl};
		}));
		$scope.templates = _.flatten($scope.templates);
	};
	mergeTemplates();
}]);