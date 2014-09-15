app.controller('TemplateCtrl', ['$scope', function ($scope) {
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
}]);