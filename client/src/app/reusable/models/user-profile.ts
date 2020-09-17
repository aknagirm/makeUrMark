export interface UserProfileForm {
        userRole: string,
        firstName: string,
        lastName: string,
        password: string,
        grade: string,
        email: string,
        contactNumber: string,
        fathersFirstName: string,
        fathersMiddleName: string,
        fathersLastName: string,
        fathersEmail: string,
        fathersContactNumber: string,
        mothersFirstName: string,
        mothersMiddleName: string,
        mothersLastName: string,
        mothersEmail: string,
        mothersContactNumber: string,
        subjects: string[],
        language: string[],
        facultyGrade: string[],
        middleName: string,
       
        educationalDet: [
               {standard: string, passingInstitute: string, 
               passingYear: string, passingMarks: string, course: string, studiedSub: string}],

        teachingExp: [{till: string, from: string, institute: string}],
        certification: string[],
        reference: [{refName: string, refNumber: string}],
        homeSystem: string[],
        smartPhone: string,
        makeAndModel: string,
        broadBand: string,
        bandWidth: string,
        whiteBoardMarker: string
}