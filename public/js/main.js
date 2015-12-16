var routerApp = angular.module('sbpuc', [
    'ui.router',
    'ngRoute',
    'appRoutes',
    'flash',
    'ngFileUpload',
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
    'ReportsCtrl',
    'AnualFeeCtrl',
    'CurrentYearFeeCtrl',
    'CurrentYearExamFeeCtrl',
    'CurrentYearMiscellaneousFeeCtrl',
    'StudentExtractCtrl',
    // Admin Controllers
    'adminuser.service',
    'UserViewCtrl',
    'adminstaff.service',
    'StaffViewCtrl',
    'admintransaction.service',
    'TransactionViewCtrl'
]);