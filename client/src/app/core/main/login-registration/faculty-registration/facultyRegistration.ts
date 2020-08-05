class FacultyRegistrationForm1 {
    constructor(
        public role: string=null,
        public firstName: string=null,
        public lastName: string=null,
        public password: string=null,
        public passwordCheck: string=null,
        public grade: string=null,
        public email: string=null,
        public contactNumber: string=null,
        public mediumOfInstruction: string=null,
        public columns: any= [
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'lastName', label: 'LAST NAME', type: "text", value: "", placeHolder: 'Your Last Name'},
            {name: 'password', label: 'PASSWORD', type: "password", value: "", placeHolder: 'Type Password'},
            {name: 'passwordCheck', label: '', type: "password", value: "", placeHolder: 'Type Again'},
            {name: 'grade', label: 'GRADE YOU WANT TO TEACH', type: "text", value: "", placeHolder: 'Select From Dropdown'},
            {name: 'email', label: 'EMAIL ID', type: "text", value: "", placeHolder: 'abc123@test.com'},
            {name: 'contactNumber', label: 'CONTACT NUMNER', type: "text", value: "", placeHolder: '+919876543210'},
            {name: 'mediumOfInstruction', label: 'MEDIUM OF INSTRUCTION', type: "text", value: "", placeHolder: 'Your First Name'}
        ]){}
    }

class FacultyRegistrationForm2 {
    constructor(
        public passingInstitute1: string=null,
        public passingInstitute2: string=null,
        public passingInstitute3: string=null,
        public passingInstitute4: string=null,

        public passingYear1: string=null,
        public passingYear2: string=null,
        public passingYear3: string=null,
        public passingYear4: string=null,

        public passingMarks1: string=null,
        public passingMarks2: string=null,
        public passingMarks3: string=null,
        public passingMarks4: string=null,

        public passingRemarks1: string=null,
        public passingRemarks2: string=null,
        public passingRemarks3: string=null,
        public passingRemarks4: string=null,

        public teachingExp: string=null,
        public teachingExpInstitute: string=null,
        public teachingExpFrom: string=null,
        public teachingExpTo: string=null,
        public certification: string=null,
        public refName1: string=null,
        public refName2: string=null,
        public refNum1: string=null,
        public refNum2: string=null,
        public columns: any= [
            {name: 'passingInstitute1', label: '', type: "text", value: "", placeHolder: 'Institute Name'},
            {name: 'passingYear1', label: '', type: "text", value: "", placeHolder: 'Passing Year'},
            {name: 'passingMarks1', label: '', type: "text", value: "", placeHolder: 'Passing marks'},
            {name: 'passingInstitute2', label: '', type: "text", value: "", placeHolder: 'Institute Name'},
            {name: 'passingYear2', label: '', type: "text", value: "", placeHolder: 'Passing Year'},
            {name: 'passingMarks2', label: '', type: "text", value: "", placeHolder: 'Passing marks'},
            {name: 'passingInstitute3', label: '', type: "text", value: "", placeHolder: 'Institute Name'},
            {name: 'passingYear3', label: '', type: "text", value: "", placeHolder: 'Passing Year'},
            {name: 'passingMarks3', label: '', type: "text", value: "", placeHolder: 'Passing marks'},
            {name: 'passingInstitute4', label: '', type: "text", value: "", placeHolder: 'Institute Name'},
            {name: 'passingYear4', label: '', type: "text", value: "", placeHolder: 'Passing Year'},
            {name: 'passingMarks4', label: '', type: "text", value: "", placeHolder: 'Passing marks'},
            {name: 'certification', label: 'CERTIFICATION (if any)', type: "text", value: "", placeHolder: 'Details'},
            {name: 'refName1', label: '', type: "text", value: "", placeHolder: ''},
            {name: 'refNum1', label: '', type: "text", value: "", placeHolder: ''},
            {name: 'refName2', label: '', type: "text", value: "", placeHolder: ''},
            {name: 'refNum2', label: '', type: "text", value: "", placeHolder: ''}
        ]){}
    }
      /*   public homeSystem: string=null,
        public smartPhone: string=null,
        public smartPhoneModel: string=null,
        public broadBand: string=null,
        public whiteBoard: string=null,

        public teachingExpBrief: string=null,
        public difficultTopics: string=null,
        public assessStudent: string=null,

        
            
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
            {name: 'firstName', label: 'FIRST NAME', type: "text", value: "", placeHolder: 'Your First Name'},
        ]

    ){}
}  */

export class FacultyRegistrationForm {
    constructor(
        public form1: FacultyRegistrationForm1=new FacultyRegistrationForm1(),
        public form2: FacultyRegistrationForm2=new FacultyRegistrationForm2()
    ){}
}