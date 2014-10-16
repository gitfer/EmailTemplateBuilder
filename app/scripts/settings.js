angular.module('EmailTemplateBuilder.config', [])
.constant('emailTemplateBuilderConfig', {
		'expressjsPort': 5000,
		'expressjsConnectionString': 'http://localhost',
		'urlPostStaticTemplates': 'http://localhost:5000/staticHtml',
		'urlPostTemplates': 'http://localhost:5000/templates'
});
