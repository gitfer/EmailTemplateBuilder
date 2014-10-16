angular.module('EmailTemplateBuilder.config', [])
.constant('emailTemplateBuilderConfig', {
		'expressjsPort': <%- expressjsPort %>,
		'expressjsConnectionString': '<%- expressjsConnectionString %>',
		'urlPostStaticTemplates': '<%- expressjsConnectionString %>:<%- expressjsPort %>/<%- urlPostStaticTemplates %>',
		'urlPostTemplates': '<%- expressjsConnectionString %>:<%- expressjsPort %>/<%- urlPostTemplates %>'
});
