export const environment = {
  production: true,
  server_endpoint: {
    facultyDetails: '../assets/faculties',
    baseUrl: 'http://localhost:3010',
    paymentURL: 'https://enigmatic-mesa-22312.herokuapp.com/payment/pay',
    verification: {
      mailOtp: 'https://enigmatic-mesa-22312.herokuapp.com/verification/mailOtp',
      mobOtpSend: 'https://enigmatic-mesa-22312.herokuapp.com/verification/mobOtpSend',
      mobOtpVerify: 'https://enigmatic-mesa-22312.herokuapp.com/verification/mobOtpVerify',
      captchaVerify: 'https://enigmatic-mesa-22312.herokuapp.com/verification/captcha'
    },
    home: {
      getAllFaculties: 'https://enigmatic-mesa-22312.herokuapp.com/homeOptions/getAllFaculties',
      getDetails: 'https://enigmatic-mesa-22312.herokuapp.com/homeOptions/getDetails',
    },
    refer: {
      referStudentFaculty: 'https://enigmatic-mesa-22312.herokuapp.com/refer/newReference',
      referalCodeCheck: 'https://enigmatic-mesa-22312.herokuapp.com/refer/referalCodeCheck'
    },
    auth: {
      login: 'https://enigmatic-mesa-22312.herokuapp.com/auth/login',
      studentRegister: 'https://enigmatic-mesa-22312.herokuapp.com/auth/studentRegister',
      facultyCVUpload: 'https://enigmatic-mesa-22312.herokuapp.com/auth/uploadCV',
      facultyRegister: 'https://enigmatic-mesa-22312.herokuapp.com/auth/facultyRegister',
      approveFaculty: 'https://enigmatic-mesa-22312.herokuapp.com/auth/approveFaculty',
      getUserDetails: 'https://enigmatic-mesa-22312.herokuapp.com/auth/getUserDetails',
      updateUserProfile: 'https://enigmatic-mesa-22312.herokuapp.com/auth/updateUserProfile',
      updateProfilePicture: 'https://enigmatic-mesa-22312.herokuapp.com/auth/updateProfilePicture',
      removeProfilePicture: 'https://enigmatic-mesa-22312.herokuapp.com/auth/removeProfilePicture',
      getAllStudents: 'https://enigmatic-mesa-22312.herokuapp.com/auth/getAllStudents',
      getAllFaculties: 'https://enigmatic-mesa-22312.herokuapp.com/auth/getAllFaculties',
      blockUnblockUser: 'https://enigmatic-mesa-22312.herokuapp.com/auth/blockUnblockUser'
    },
    subjectDet: {
      subjectDetails: 'https://enigmatic-mesa-22312.herokuapp.com/subjectDet/subjectDetails',
      getFaculty: 'https://enigmatic-mesa-22312.herokuapp.com/auth/getFaculties',
      addSubject: 'https://enigmatic-mesa-22312.herokuapp.com/subjectDet/addSubject',
      allGradeSubs: 'https://enigmatic-mesa-22312.herokuapp.com/subjectDet/allGradesSubs'
    },
    facultyOptions: {
      materialUpload: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/materialUpload',
      getAllMaterial: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/getAllMaterial',
      deleteMaterialById: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/deleteMaterialById',
      scheduleTest: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/scheduleTest',
      getAllScheduledTest: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/getAllScheduledTest',
      deleteTestById: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/deleteTestById',
      scheduleTestUpdate: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/scheduleTestUpdate',
      getTestIds: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/getTestIds',
      getTestDetailsWithId: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/getTestDetailsWithId',
      updateTestMarks: 'https://enigmatic-mesa-22312.herokuapp.com/facultyExplore/updateTestMarks'
    },
    adminOptions: {
      getDetails: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/getDetails',
      getHolidayList: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/getHolidayList',
      addGradeSubBoard: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/addGradeSubBoard',
      addHoliday: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/addHoliday',
      updateTestFees: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/updateTestFees',
      holidayDelete: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/holidayDelete',
      commonDelete: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/commonDelete',
      scheduleBatch: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/scheduleBatch',
      allScheduledBatch: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/allScheduledBatch',
      addStudentToBatch: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/addStudentToBatch',
      removeFromBatch: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/removeFromBatch',
      deleteBatch: 'https://enigmatic-mesa-22312.herokuapp.com/adminExplore/deleteBatch'
    },
    studentOptions: {
      getTestForGradeSub:'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/getTestForGradeSub',
      addCourses: 'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/addCourses',
      registerForTest:'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/registerForTest',
      getAllTestForStudent: 'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/getAllTestForStudent',
      getAllScheduledBatch:'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/getAllScheduledBatch',
      getAllMaterial: 'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/getAllMaterial',
      getUnallocatedCourses: 'https://enigmatic-mesa-22312.herokuapp.com/studentExplore/getUnallocatedCourses'
    }
  }
};
