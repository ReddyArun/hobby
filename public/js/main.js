var routerApp = angular.module('sbpuc', [
    'ui.router',
    'ngRoute',
    'appRoutes',
    'flash',
    'ngFileUpload',
    'sbpuc.titleCaseFilter',
    'router.service',
    'security.authorization',
    'sbpuc.passwordcheck',
    'sbpuc.copyval',
    'sbpuc.confirmation',
    'services.utility',
    'security.service',
    'student.service',
    'report.service',
    'BaseCtrl',
    'LoginCtrl',
    'LogoutCtrl',
    'ForgetPasswordCtrl',
    'ResetPasswordCtrl',
    'ViewStudentsDetailCtrl',
    'AddStudentCtrl',
    'StudentsDetailCtrl',
    //Reports
    'ReportsCtrl',
    'AnualFeeCtrl',
    'CurrentYearFeeCtrl',
    'MonthlyFeeCtrl',
    'CurrentYearExamFeeCtrl',
    'CurrentYearMiscellaneousFeeCtrl',
    'StudentExtractCtrl',
    // Admin Controllers
    'adminuser.service',
    'UserViewCtrl',
    'adminstaff.service',
    'StaffViewCtrl',
    'admintransaction.service',
    'TransactionViewCtrl',
    'OldTransactionViewCtrl',
    'MoveStudentsViewCtrl',
    'SearchStudentCtrl'
]);