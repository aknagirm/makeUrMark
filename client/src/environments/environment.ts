// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_endpoint: {
    facultyDetails: '../assets/faculties',
    baseUrl: 'http://localhost:3010',
    paymentURL: 'http://localhost:3010/payment/pay',
    orderPaymentAdd: 'http://localhost:3010/payment/orderPaymentAdd',
    specificUsersOrder: 'http://localhost:3010/payment/specificUsersOrder',
    associatesFeesCapture: 'http://localhost:3010/payment/associatesFeesCapture',
    deleteTrans: 'http://localhost:3010/payment/deleteTrans',
    allPayments: 'http://localhost:3010/payment/allPayments',
    verification: {
      mailOtp: 'http://localhost:3010/verification/mailOtp',
      mobOtpSend: 'http://localhost:3010/verification/mobOtpSend',
      mobOtpVerify: 'http://localhost:3010/verification/mobOtpVerify',
      captchaVerify: 'http://localhost:3010/verification/captcha'
    },
    home: {
      getAllFaculties: 'http://localhost:3010/homeOptions/getAllFaculties',
      getDetails: 'http://localhost:3010/homeOptions/getDetails',
    },
    refer: {
      referStudentFaculty: 'http://localhost:3010/refer/newReference',
      referalCodeCheck: 'http://localhost:3010/refer/referalCodeCheck'
    },
    auth: {
      login: 'http://localhost:3010/auth/login',
      studentRegister: 'http://localhost:3010/auth/studentRegister',
      facultyCVUpload: 'http://localhost:3010/auth/uploadCV',
      facultyRegister: 'http://localhost:3010/auth/facultyRegister',
      approveFaculty: 'http://localhost:3010/auth/approveFaculty',
      getUserDetails: 'http://localhost:3010/auth/getUserDetails',
      updateUserProfile: 'http://localhost:3010/auth/updateUserProfile',
      updateProfilePicture: 'http://localhost:3010/auth/updateProfilePicture',
      removeProfilePicture: 'http://localhost:3010/auth/removeProfilePicture',
      getAllStudents: 'http://localhost:3010/auth/getAllStudents',
      getAllFaculties: 'http://localhost:3010/auth/getAllFaculties',
      blockUnblockUser: 'http://localhost:3010/auth/blockUnblockUser'
    },
    subjectDet: {
      subjectDetails: 'http://localhost:3010/subjectDet/subjectDetails',
      getFaculty: 'http://localhost:3010/auth/getFaculties',
      addSubject: 'http://localhost:3010/subjectDet/addSubject',
      allGradeSubs: 'http://localhost:3010/subjectDet/allGradesSubs'
    },
    facultyOptions: {
      materialUpload: 'http://localhost:3010/facultyExplore/materialUpload',
      getAllMaterial: 'http://localhost:3010/facultyExplore/getAllMaterial',
      deleteMaterialById: 'http://localhost:3010/facultyExplore/deleteMaterialById',
      scheduleTest: 'http://localhost:3010/facultyExplore/scheduleTest',
      getAllScheduledTest: 'http://localhost:3010/facultyExplore/getAllScheduledTest',
      deleteTestById: 'http://localhost:3010/facultyExplore/deleteTestById',
      scheduleTestUpdate: 'http://localhost:3010/facultyExplore/scheduleTestUpdate',
      getTestIds: 'http://localhost:3010/facultyExplore/getTestIds',
      getTestDetailsWithId: 'http://localhost:3010/facultyExplore/getTestDetailsWithId',
      updateTestMarks: 'http://localhost:3010/facultyExplore/updateTestMarks'
    },
    adminOptions: {
      getDetails: 'http://localhost:3010/adminExplore/getDetails',
      getHolidayList: 'http://localhost:3010/adminExplore/getHolidayList',
      addGradeSubBoard: 'http://localhost:3010/adminExplore/addGradeSubBoard',
      addHoliday: 'http://localhost:3010/adminExplore/addHoliday',
      updateTestFees: 'http://localhost:3010/adminExplore/updateTestFees',
      holidayDelete: 'http://localhost:3010/adminExplore/holidayDelete',
      commonDelete: 'http://localhost:3010/adminExplore/commonDelete',
      scheduleBatch: 'http://localhost:3010/adminExplore/scheduleBatch',
      allScheduledBatch: 'http://localhost:3010/adminExplore/allScheduledBatch',
      addStudentToBatch: 'http://localhost:3010/adminExplore/addStudentToBatch',
      removeFromBatch: 'http://localhost:3010/adminExplore/removeFromBatch',
      deleteBatch: 'http://localhost:3010/adminExplore/deleteBatch'
    },
    studentOptions: {
      getTestForGradeSub:'http://localhost:3010/studentExplore/getTestForGradeSub',
      addCourses: 'http://localhost:3010/studentExplore/addCourses',
      registerForTest:'http://localhost:3010/studentExplore/registerForTest',
      getAllTestForStudent: 'http://localhost:3010/studentExplore/getAllTestForStudent',
      getAllScheduledBatch:'http://localhost:3010/studentExplore/getAllScheduledBatch',
      getAllMaterial: 'http://localhost:3010/studentExplore/getAllMaterial',
      getUnallocatedCourses: 'http://localhost:3010/studentExplore/getUnallocatedCourses'
    }
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 import 'zone.js/dist/zone-error';  // Included with Angular CLI.
