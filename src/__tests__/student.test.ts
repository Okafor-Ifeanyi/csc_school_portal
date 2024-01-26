// register student
// given wrong schema return 422
// given regnumber exists return 400 `User with email ${username} already exists`
// given class id doesn't exist throw 422 "Class does not exist"
// given registered return 201

// upload students
// given user is not HOD return 403 "Unauthorized! Please Login as HOD"
// given schema is wrong return 422

// test get all students
// Given the user is not HOD return 403 "Unauthorized! Please Login as HOD"
// Given requests are satisfied return 201

// test get single student
// given the :id isn't valid return 404
// given successful 201

// test updating an student
// Given the user isn't logged in return 403 "Unauthorized! Please Login"
// Given the user is not HOD return 403 "Unauthorized! Please Login as HOD"
// Given wrong schema return 422
// given user not found 404
// Successful 201

// test delete an student
// Given the user is not HOD return 403 "Unauthorized! Please Login as HOD"
// given student id is wrong throw error 404 student not found
// Given successful return 201 { message: "Student has been deleted"}
