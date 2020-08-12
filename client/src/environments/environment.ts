// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_endpoint: {
    facultyDetails: '../assets/faculties',
    verification: {
      mailOtp: 'http://localhost:3010/verification/mailOtp',
      mobOtpSend: 'http://localhost:3010/verification/mobOtpSend',
      mobOtpVerify: 'http://localhost:3010/verification/mobOtpVerify',
      captchaVerify: 'http://localhost:3010/verification/captcha'
    },
    auth: {
      register: 'http://localhost:3010/auth/register',
      facultyCVUpload: 'http://localhost:3010/auth/uploadCV',
      facultyRegister: 'http://localhost:3010/auth/facultyRegister'
    },
    subjectDet: {
      subjectDetails: 'http://localhost:3010/subjectDet/subjectDetails',
      getFaculty: 'http://localhost:3010/auth/allFaculties',
      addSubject: 'http://localhost:3010/subjectDet/addSubject',
      allGradeSubs: 'http://localhost:3010/subjectDet/allGradesSubs'
    },
    facultyOptions: {
      materialUpload: 'http://localhost:3010/facultyExplore/materialUpload',
      scheduleTest: 'http://localhost:3010/facultyExplore/scheduleTest',
      referStudentFaculty: 'http://localhost:3010/refer/newReference',
      getTestIds: 'http://localhost:3010/facultyExplore/getTestIds',
      getTestDetailsWithId: 'http://localhost:3010/facultyExplore/getTestDetailsWithId',
      updateTestMarks: 'http://localhost:3010/facultyExplore/updateTestMarks'
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
