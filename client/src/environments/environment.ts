// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_endpoint: {
    facultyDetails: '../assets/faculties',
    baseUrl: 'http://192.168.0.105:3010',
    verification: {
      mailOtp: 'http://192.168.0.105:3010/verification/mailOtp',
      mobOtpSend: 'http://192.168.0.105:3010/verification/mobOtpSend',
      mobOtpVerify: 'http://192.168.0.105:3010/verification/mobOtpVerify',
      captchaVerify: 'http://192.168.0.105:3010/verification/captcha'
    },
    home: {
      getAllFaculties: 'http://192.168.0.105:3010/homeOptions/getAllFaculties'
    },
    auth: {
      login: 'http://192.168.0.105:3010/auth/login',
      register: 'http://192.168.0.105:3010/auth/register',
      facultyCVUpload: 'http://192.168.0.105:3010/auth/uploadCV',
      facultyRegister: 'http://192.168.0.105:3010/auth/facultyRegister',
      getUserDetail: 'http://192.168.0.105:3010/auth/getUserDetail',
      updateUserProfile: 'http://192.168.0.105:3010/auth/updateUserProfile',
      updateProfilePicture: 'http://192.168.0.105:3010/auth/updateProfilePicture',
      removeProfilePicture: 'http://192.168.0.105:3010/auth/removeProfilePicture'
    },
    subjectDet: {
      subjectDetails: 'http://192.168.0.105:3010/subjectDet/subjectDetails',
      getFaculty: 'http://192.168.0.105:3010/auth/getFaculties',
      addSubject: 'http://192.168.0.105:3010/subjectDet/addSubject',
      allGradeSubs: 'http://192.168.0.105:3010/subjectDet/allGradesSubs'
    },
    facultyOptions: {
      materialUpload: 'http://192.168.0.105:3010/facultyExplore/materialUpload',
      getAllMaterial: 'http://192.168.0.105:3010/facultyExplore/getAllMaterial',
      deleteMaterialById: 'http://192.168.0.105:3010/facultyExplore/deleteMaterialById',
      scheduleTest: 'http://192.168.0.105:3010/facultyExplore/scheduleTest',
      getAllScheduledTest: 'http://192.168.0.105:3010/facultyExplore/getAllScheduledTest',
      deleteTestById: 'http://192.168.0.105:3010/facultyExplore/deleteTestById',
      referStudentFaculty: 'http://192.168.0.105:3010/refer/newReference',
      getTestIds: 'http://192.168.0.105:3010/facultyExplore/getTestIds',
      getTestDetailsWithId: 'http://192.168.0.105:3010/facultyExplore/getTestDetailsWithId',
      updateTestMarks: 'http://192.168.0.105:3010/facultyExplore/updateTestMarks'
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
