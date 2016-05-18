'use strict';

myApp.factory('config', function () {
    
    return {
        statusThreshold: { unsatisfactory: 33, average: 66, good: 100 },
        codeQualityThreshold: { min: 80, max: 90 },
        unitTestingThreshold: { min: 99, max: 100 },
        codeCoverageThreshold: { min: 50, max: 70 },
        predictabilityScoreThreshold: { min: 10, max: 20 },
        overallThreshold: { min: 76, max: 86 },
        statusColor: { red: '#ED1C24', yellow: '#FFC90E', green: '#22B14C', gray: '#EAEAEA' },
        applicationName: 'CI Dashboard',
       
        dummy_to_protect_commas: 0,
        
        sefdashboard: 'http://arltfspoc2:8082/SEFDataService/api/Dashboard',
       
        devopsReportingDeveloperSummary: 'http://arltfspoc2:8082/SEFDataService/api/DeveloperSummary/GetSummaryDetails?groupName=',
        devopsComponentDetails: 'http://arltfspoc2:8082/SEFDataService/api/ComponetDetails/GetTrendMetrics?componentName=',
        devOpsGroupList: 'http://arltfspoc2:8082/SEFDataService/api/Groups/GetGroupList',
        sefBuildById: 'http://arltfspoc2:8082/SEFDataService/Dashboard?id=',
        sefdashboardgroups: 'http://arltfspoc2:8082/SEFDataService/api/Groups',
        sefgroupsandproducts: 'http://arltfspoc2:8082/SEFDataService/api/Groups?x=1',
        savegroupsandproducts: 'http://arltfspoc2:8082/SEFDataService/api/Groups',
        devopsReportingExecutiveDashboard: 'http://arltfspoc2:8082/SEFDataService/api/ExecutiveSummary/GetExecutiveSummary'
    }
});
