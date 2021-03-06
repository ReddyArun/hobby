angular.module('TransactionViewCtrl', [])
        .controller('TransactionViewController',
                function ($scope, $state, $location, transaction, Flash, Upload) {
                    //console.log('In UserViewController');
                    $scope.transactionList = {};
                    $scope.transactionMember = {};
                    $scope.formData = {};
                    //console.log($scope.transactionMember)
                    transaction.getall(currentFinancialYear()).then(function (data) {
                        $scope.transactionList = data.data;
                    });
                    $scope.loadModel = function (row) {
                        //console.log(row)
                        $scope.transactionMember = row;
                        $("#myModal").modal();
                    };
                    // Get Transaction member details
                    $scope.viewDetails = function (id) {
                        transaction.getdetail(id).then(function (data) {
                            console.log(data);
                            $scope.transactionMember = data.data[0];
                            console.log($scope.transactionMember);
                            //$location.path('/admin/transaction/view');
                            //    $state.go('admin.transaction.view', {}, {reload: true});
                        });
                    };

                    // Add New Transaction
                    $scope.createTransaction = function () {
                        //console.log($scope.formData);
                        Upload.upload({
                            url: '/api/transaction/create',
                            data: $scope.formData
                        }).then(function (data) {
                            $scope.formData = {};
                            console.log(data);
                            if (data.data.success) {
                                $location.path('/transactions');
                                var res = $state.current.name.split(".");
                                $state.go(res[0] + '.' + res[1], {}, {reload: true});
                            } else {
                                //error due to server side validation
                                $scope.errfor = data.data.errfor;
                                $scope.errorMsg = data.data.errors[0];
                            }
                        }, function (e) {
                            var message = '<strong> Login Issue!...</strong> Please try Signup again.';
                            Flash.create('danger', message, 'custom-class');
                            $location.path('/login');
                            $state.go('login');
                        });
                    };
                    // delete Transaction
                    $scope.deleteTransaction = function (id) {
                        //console.log('Inside delete function ' + id);
                        transaction.inactive(id).then(function (data) {
                            //console.log(data);
                            if (data.success) {
                                $location.path('/transactions');
                                var res = $state.current.name.split(".");
                                $state.go(res[0] + '.' + res[1], {}, {reload: true});
                            } else {
                                //error due to server side validation
                                $scope.errfor = data.errfor;
                                $scope.errorMsg = data.errors[0].error;
                            }
                        }, function (e) {
                            var message = '<strong> Login Issue!...</strong> Please try Signup again.';
                            Flash.create('danger', message, 'custom-class');
                            $location.path('/login');
                            $state.go('login');
                        });
                    };
                }
        );

angular.module('OldTransactionViewCtrl', [])
        .controller('OldTransactionViewController',
                function ($scope, $state, $location, transaction, Flash, Upload) {
                    //console.log('In UserViewController');
                    $scope.anualreportData = getFinancialYears();
                    $scope.transactionList = {};
                    $scope.transactionMember = {};
                    $scope.selectedItem = '';

                    $scope.loadModel = function (row) {
                        //console.log(row)
                        $scope.transactionMember = row;
                        $("#myModal").modal();
                    };
                    // Get Transaction member details
                    $scope.viewDetails = function () {
                        //console.log($scope.selectedItem);
                        transaction.getall($scope.selectedItem.name).then(function (data) {
                            $scope.transactionList = data.data;
                            $location.path('/oldtransactions/view');
                            $state.go('admin.oldtransactions.view');
                        });
                    };
                }
        );
