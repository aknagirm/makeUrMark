export class FacultyProfileEditForm {
    constructor(
        public userRole: string =null,
        public firstName: string =null,
        public lastName: string =null,
        public password: string =null,
        public grade: string =null,
        public email: string =null,
        public contactNumber: string =null,
        public address1: string =null,
        public address2: string =null,
        public address3: string =null,
        public schoolName: string =null,
        public schoolCity: string =null,
        public schoolboard: string =null,
        public newPassword: string =null,
        
        public subjects: string[] =[],
        public language: string[] =[],
        public facultyGrade: string[] =[],
        public middleName: string =null,
       
        public educationalDet: [
               {standard: string, passingInstitute: string, 
               passingYear: string, passingMarks: string, course: string, studiedSub: string}],

        public teachingExp: [{till: string, from: string, institute: string}],
        public certification: string[] =[],
        public reference: [{refName: string, refNumber: string}],
        public homeSystem: string[] =[],
        public smartPhone: string =null,
        public makeAndModel: string =null,
        public broadBand: string =null,
        public bandWidth: string =null,
        public whiteBoardMarker: string =null){}
}