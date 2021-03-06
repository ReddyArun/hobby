'use strict';
exports.students = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('students', function () {
        req.app.db.models.Student.find(
                {
                    active: true
                },
                {
                    name: 1,
                    dob: 1,
                    rollnumber: 1,
                    class: 1,
                    gender: 1,
                    caste: 1,
                    puc1fee: 1,
                    puc2fee: 1,
                    mobile: 1,
                    combination: 1,
                    active: 1
                },
                function (err, students) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!students) {
                        workflow.outcome.errors.push('No data found in systmem, Please try again or Contact Arun Kumar(9980130541).');
                        return workflow.emit('response');
                    }
                    workflow.outcome.data = students;
                    workflow.emit('response');
                });
    });
    workflow.emit('students');
};
exports.addstudent = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {

        // TODO: Needs complete validation
        if (!req.body.name) {
            workflow.outcome.errfor.name = 'required';
        }
        if (!req.body.dob) {
            workflow.outcome.errfor.dob = 'required';
        }
        if (!req.body.rollnumber) {
            workflow.outcome.errfor.rollnumber = 'required';
        }
        if (!req.body.class) {
            workflow.outcome.errfor.class = 'required';
        }
        if (!req.body.combination) {
            workflow.outcome.errfor.combination = 'required';
        }
        if (!req.body.initialfee) {
            workflow.outcome.errfor.initialfee = 'required';
        }
        if (!req.body.caste) {
            workflow.outcome.errfor.caste = 'required';
        }
        if (!req.body.gender) {
            workflow.outcome.errfor.gender = 'required';
        }
        if (!req.body.mobile) {
            workflow.outcome.errfor.mobile = 'required';
        }
        if (!req.body.address) {
            workflow.outcome.errfor.address = 'required';
        }
        if (!req.body.sslcschooladdress) {
            workflow.outcome.errfor.sslcschooladdress = 'required';
        }
        if (!req.body.sslcpercentage) {
            workflow.outcome.errfor.sslcpercentage = 'required';
        }
        if (workflow.hasErrors()) {
            console.log('error');
            return workflow.emit('response');
        }
        workflow.emit('createStudent');
    });

    workflow.on('createStudent', function () {
        var puc1fee = 0;
        var puc2fee = 0;
        // Grab data from http request
        if (req.body.class === 'PUC1')
            puc1fee = req.body.initialfee;
        else
            puc2fee = req.body.initialfee;
        var data = {
            name: req.body.name,
            dob: new Date(req.body.dob),
            rollnumber: req.body.rollnumber,
            class: req.body.class,
            caste: req.body.caste,
            gender: req.body.gender,
            puc1fee: puc1fee,
            puc2fee: puc2fee,
            mobile: req.body.mobile,
            address: req.body.address,
            fee: [],
            combination: req.body.combination,
            sslcschooladdress: req.body.sslcschooladdress,
            sslcpercentage: req.body.sslcpercentage,
            createduser: req.user.username,
            updateduser: req.user.username,
            image: req.body.image,
            updateddate: Date.now(),
            search: [req.body.name, req.body.rollnumber, req.body.mobile]
        };
        console.log(data);
        req.app.db.models.Student.create(data, function (err, student) {
            if (err) {
                console.log(err);
                return workflow.emit('exception', err);
            }
            workflow.outcome.data.push(student._id);
            workflow.emit('response');
        });
    });

    workflow.emit('validate');
};

exports.studentdetails = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('viewStudentDetails', function () {
        var id = req.params.id;
        req.app.db.models.Student.findOne(
                {_id: id},
                {
                    name: 1,
                    dob: 1,
                    rollnumber: 1,
                    class: 1,
                    caste: 1,
                    gender: 1,
                    puc1fee: 1,
                    puc2fee: 1,
                    mobile: 1,
                    combination: 1,
                    fee: 1,
                    examfee: 1,
                    otherfee: 1,
                    image: 1,
                    address: 1,
                    sslcschooladdress: 1,
                    sslcpercentage: 1,
                    active: 1
                },
                function (err, student) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!student) {
                        workflow.outcome.errors.push('No data found in systmem, Please try again or Contact Arun Kumar(+919980130541).');
                        return workflow.emit('response');
                    }
                    workflow.outcome.data.push(student);
                    return workflow.emit('response');
                });
    });
    workflow.emit('viewStudentDetails');
};

// Admin features

//Service will move all 2nd PUC students to inactive mode and move 1st PUC students to 2nd PUC.
exports.migratestudents = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('moveStudents', function () {
        //Move 2nd PUC students
        req.app.db.models.Student.update(
                {
                    active: true,
                    class: 'PUC2'
                },
                {
                    $set: {active: false}
                },
                {
                    multi: true
                },
                function (err, student) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    req.app.db.models.Student.update(
                            {
                                active: true,
                                class: 'PUC1'
                            },
                            {
                                $set: {class: 'PUC2'}
                            },
                            {
                                multi: true
                            },
                            function (err, student) {
                                if (err) {
                                    return workflow.emit('exception', err);
                                }
                            }
                    );
                }
        );
        return workflow.emit('response');
    });
    workflow.emit('moveStudents');
};

//Admin features
exports.search = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('searchStudentDetails', function () {
        req.body.query = req.body.query ? req.body.query : '';
        var regexQuery = new RegExp('^.*?' + req.body.query + '.*$', 'i');
        //console.log(regexQuery);
        req.app.db.models.Student.find(
                {search: regexQuery},
                {name: 1, dob: 1, rollnumber: 1, class: 1, caste: 1, gender: 1, mobile: 1, combination: 1, active: 1},
                function (err, students) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!students) {
                        workflow.outcome.errors.push('No data found in systmem, Please try again or Contact Arun Kumar(+919980130541).');
                        return workflow.emit('response');
                    }
                    workflow.outcome.data = students;
                    return workflow.emit('response');
                });
    });
    workflow.emit('searchStudentDetails');
};

exports.update = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('validate', function () {

        // TODO: Needs complete validation
        if (!req.body._id) {
            workflow.outcome.errfor.id = 'required';
        }
        if (!req.body.name) {
            workflow.outcome.errfor.name = 'required';
        }
        if (!req.body.dob) {
            workflow.outcome.errfor.dob = 'required';
        }
        if (!req.body.rollnumber) {
            workflow.outcome.errfor.rollnumber = 'required';
        }
        if (!req.body.class) {
            workflow.outcome.errfor.class = 'required';
        }
        if (!req.body.combination) {
            workflow.outcome.errfor.combination = 'required';
        }
        if (!req.body.initialfee) {
            workflow.outcome.errfor.initialfee = 'required';
        }
        if (!req.body.caste) {
            workflow.outcome.errfor.caste = 'required';
        }
        if (!req.body.gender) {
            workflow.outcome.errfor.gender = 'required';
        }
        if (!req.body.mobile) {
            workflow.outcome.errfor.mobile = 'required';
        }
        if (!req.body.address) {
            workflow.outcome.errfor.address = 'required';
        }
        if (!req.body.sslcschooladdress) {
            workflow.outcome.errfor.sslcschooladdress = 'required';
        }
        if (!req.body.sslcpercentage) {
            workflow.outcome.errfor.sslcpercentage = 'required';
        }
        if (workflow.hasErrors()) {
            console.log('error');
            return workflow.emit('response');
        }
        workflow.emit('createStudent');
    });

    workflow.on('createStudent', function () {
        var puc1fee = 0;
        var puc2fee = 0;
        // Grab data from http request
        if (req.body.class === 'PUC1')
            puc1fee = req.body.initialfee;
        else
            puc2fee = req.body.initialfee;
        var active = true;
        if(req.user.canPlayRoleOf('admin')){
            active= req.body.active;
        }
        var data = {
            active: active,
            address: req.body.address,
            caste: req.body.caste,
            class: req.body.class,
            combination: req.body.combination,
            dob: new Date(req.body.dob),
            gender: req.body.gender,
            image: req.body.image,
            mobile: req.body.mobile,
            name: req.body.name,
            puc1fee: puc1fee,
            puc2fee: puc2fee,
            rollnumber: req.body.rollnumber,
            sslcpercentage: req.body.sslcpercentage,
            sslcschooladdress: req.body.sslcschooladdress,
            updateduser: req.user.username,
            updateddate: Date.now(),
            search: [req.body.name, req.body.rollnumber, req.body.mobile]
        };

        console.log(data);
        req.app.db.models.Student.update(
                {
                    _id: req.params.id
                },
                {
                    $set: data
                },
                function (err, student) {
                    if (err) {
                        console.log(err);
                        return workflow.emit('exception', err);
                    }
                    console.log(student)
                    workflow.emit('response');
                });
    });

    workflow.emit('validate');
};