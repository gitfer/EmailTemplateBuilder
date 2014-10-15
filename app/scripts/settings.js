angular.module('EmailTemplateBuilder.config', [])
.constant('emailTemplateBuilderConfig', {
		"expressjsPort": 5000,
		"expressjsConnectionString": "http://localhost",
		"urlPostStaticTemplates": "staticHtml",
		"urlPostTemplates": "templates"
});
