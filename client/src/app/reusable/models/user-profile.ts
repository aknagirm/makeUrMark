export interface UserProfileForm {
        userRole?: string,
        firstName?: string,
        middleName?: string,
        lastName?: string,
        gender?: string,
        password?: string,
        grade?: string,
        email?: string,
        contactNumber?: string,
        fathersFirstName?: string,
        fathersMiddleName?: string,
        fathersLastName?: string,
        fathersEmail?: string,
        fathersContactNumber?: string,
        mothersFirstName?: string,
        mothersMiddleName?: string,
        mothersLastName?: string,
        mothersEmail?: string,
        mothersContactNumber?: string,
        subjects?: string[],
        language?: string[],
        facultyGrade?: string[],
       
        educationalDet?: [
               {standard: string, passingInstitute: string, 
               passingYear: string, passingMarks: string, course: string, studiedSub: string}],

        teachingExp?: [{till: string, from: string, institute: string}],
        certification?: string[],
        reference?: [{refName: string, refNumber: string}],
        homeSystem?: string[],
        smartPhone?: string,
        makeAndModel?: string,
        broadBand?: string,
        bandWidth?: string,
        whiteBoardMarker?: string,
        othersReferCode?: string
}


export const FacultyProfileDetails=[
        {field: 'email', header:'Email Id'},
        {field: 'contactNumber', header:'Contact Number'},
        {field: 'creationDate', header:'Joining Date',  pipeChk: 'date'},
        {field: 'gender', header:'Gender'},
        {field: 'facultyGrade', header:'Grade'},
        {field: 'subjects', header:'Subjects'},
        {field: 'language', header:'Language Known'},
        {field: 'homeSystem', header:'Home System'},
        {field: 'smartPhone', header:'Smart Phone'},
        {field: 'makeAndModel', header:'Smart Phone Make Model'},
        {field: 'broadBand', header:'Broad Band'},
        {field: 'bandWidth', header:'Band Width'},
        {field: 'whiteBoardMarker', header:'Whiteboard & Marker'}
]


export const StudentProfileDetails=[
        {field: 'email', header:'Email Id'},
        {field: 'contactNumber', header:'Contact Number'},
        {field: 'creationDate', header:'Joining Date',  pipeChk: 'date'},
        {field: 'gender', header:'Gender'},
        {field: 'language', header:'Language Known'},
        {field: 'homeSystem', header:'Home System'},
        {field: 'smartPhone', header:'Smart Phone'},
        {field: 'makeAndModel', header:'Smart Phone Make Model'},
        {field: 'broadBand', header:'Broad Band'},
        {field: 'bandWidth', header:'Band Width'}
]