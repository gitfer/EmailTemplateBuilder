angular.module('EmailTemplateBuilder.config', [])
.constant('emailTemplateBuilderConfig', {
		"expressjsPort": <%- expressjsPort %>,
		"expressjsConnectionString": "<%- expressjsConnectionString %>",
		"urlPostStaticTemplates": "<%- urlPostStaticTemplates %>",
		"urlPostTemplates": "<%- urlPostTemplates %>"
});
