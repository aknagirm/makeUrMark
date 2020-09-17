// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_endpoint: {
    facultyDetails: '../assets/faculties',
    baseUrl: 'http://localhost:3010',
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
    auth: {
      login: 'http://localhost:3010/auth/login',
      studentRegister: 'http://localhost:3010/auth/studentRegister',
      facultyCVUpload: 'http://localhost:3010/auth/uploadCV',
      facultyRegister: 'http://localhost:3010/auth/facultyRegister',
      getUserDetail: 'http://localhost:3010/auth/getUserDetail',
      updateUserProfile: 'http://localhost:3010/auth/updateUserProfile',
      updateProfilePicture: 'http://localhost:3010/auth/updateProfilePicture',
      removeProfilePicture: 'http://localhost:3010/auth/removeProfilePicture'
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
      referStudentFaculty: 'http://localhost:3010/refer/newReference',
      getTestIds: 'http://localhost:3010/facultyExplore/getTestIds',
      getTestDetailsWithId: 'http://localhost:3010/facultyExplore/getTestDetailsWithId',
      updateTestMarks: 'http://localhost:3010/facultyExplore/updateTestMarks'
    },
    adminOptions: {
      getDetails: 'http://localhost:3010/adminExplore/getDetails',
      addGradeSubBoard: 'http://localhost:3010/adminExplore/addGradeSubBoard',
      updateTestFees: 'http://localhost:3010/adminExplore/updateTestFees',
      commonDelete: 'http://localhost:3010/adminExplore/commonDelete',
    },
    studentOptions: {
      getTestForGradeSub:'http://localhost:3010/studentExplore/getTestForGradeSub',
      registerForTest:'http://localhost:3010/studentExplore/registerForTest'
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
