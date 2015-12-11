angular.module('appRoutes', [])
        .config(
                ['$stateProvider', '$urlRouterProvider',
                    function ($stateProvider, $urlRouterProvider) {
                        //$urlRouterProvider.otherwise('home');
                        $stateProvider
                                .state('home', {
                                    url: '/home',
                                    templateUrl: 'welcome.html'
                                })
                                .state('default', {
                                    url: '/',
                                    templateUrl: 'welcome.html'
                                })
                                .state('login', {
                                    url: '/login',
                                    templateUrl: '/user/login.html',
                                    controller: 'LoginController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('forgetpassword', {
                                    url: '/forgetpassword',
                                    templateUrl: '/user/forget.html',
                                    controller: 'ForgetPasswordController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('resetpassword', {
                                    url: '/resetpassword/:username/:token',
                                    templateUrl: '/user/reset.html',
                                    controller: 'ResetPasswordController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('logout', {
                                    templateUrl: '/user/login.html',
                                    controller: 'LogoutController'
                                })
                                .state('settings', {
                                    url: '/settings',
                                    templateUrl: '/user/settings/settings.html'
                                })
                                .state('studentsdetails', {
                                    url: '/studentsdetails',
                                    templateUrl: '/student/viewstudentsdetail.html',
                                    controller: 'ViewStudentsDetailController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: false
                                    }
                                })
                                .state('addstudent', {
                                    url: '/addstudent',
                                    templateUrl: '/student/addstudent.html',
                                    controller: 'AddStudentController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('student', {
                                    url: '/student/:id',
                                    templateUrl: '/student/studentdetails.html',
                                    controller: 'StudentsDetailController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('reports', {
                                    url: '/reports',
                                    templateUrl: '/reports/index.html',
                                    controller: 'ReportsController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('selectedyearfee', {
                                    url: '/reports/anual/:years/fee',
                                    templateUrl: '/reports/anualfee.html',
                                    controller: 'AnualFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('academicyearfee', {
                                    url: '/reports/academicfee',
                                    templateUrl: '/reports/currentyearfee.html',
                                    controller: 'CurrentYearFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('examfee', {
                                    url: '/reports/examfee',
                                    templateUrl: '/reports/currentyearexamfee.html',
                                    controller: 'CurrentYearExamFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('miscellaneousfee', {
                                    url: '/reports/miscellaneousfee',
                                    templateUrl: '/reports/currentyearmiscellaneousfee.html',
                                    controller: 'CurrentYearMiscellaneousFeeController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('studentsextract', {
                                    url: '/reports/studentsextract',
                                    templateUrl: '/reports/studentsextract.html',
                                    controller: 'StudentExtractController',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                /** Admin controls*/
                                .state('admin', {
                                    url: '/admin',
                                    templateUrl: '/admin/index.html',
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.staff', {
                                    url: '/staff',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/staff/index.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.staff.view', {
                                    url: '/view',
                                    views: {
                                        'staffview': {
                                            templateUrl: '/admin/staff/view.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.staff.add', {
                                    url: '/add',
                                    views: {
                                        'staffview': {
                                            templateUrl: '/admin/staff/add.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.appusers', {
                                    url: '/appusers',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/appusers/index.html',
                                            controller: 'UserViewController',
                                            data: {
                                                requireLogin: true,
                                                adminPrev: true
                                            }
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.appusers.add', {
                                    url: '/add',
                                    views: {
                                        'usersadd': {
                                            templateUrl: '/admin/appusers/add.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.currentstudents', {
                                    url: '/currentstudents',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/student/current.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.currentstudents.edit', {
                                    url: '/edit',
                                    views: {
                                        'edit': {
                                            templateUrl: '/admin/student/edit.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.oldstudents', {
                                    url: '/oldstudents',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/student/old.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.oldstudents.edit', {
                                    url: '/edit',
                                    views: {
                                        'edit': {
                                            templateUrl: '/admin/student/edit.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.transcations', {
                                    url: '/transcations',
                                    views: {
                                        'adminview@admin': {
                                            templateUrl: '/admin/transcations/index.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                })
                                .state('admin.transcations.add', {
                                    url: '/transcations',
                                    views: {
                                        'add': {
                                            templateUrl: '/admin/transcations/add.html'
                                        }
                                    },
                                    data: {
                                        requireLogin: true,
                                        adminPrev: true
                                    }
                                });
                    }
                ]);