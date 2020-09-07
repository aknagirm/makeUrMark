export class ReferenceForm {
    constructor(
        public referedRole: string =null,
        public firstName: string =null,
        public lastName: string =null,
        public contactNumber: string =null,
        public emailId: string =null,
        public currentlyStudying: string =null,
        public subjectsForFaculty: string =null
    ){}
}

export class MaterialUploadForm {
    constructor(
        public grade: string =null,
        public subject: string =null,
        public chapters: string =null,
        public materialType: string =null,
        public selectedMaterial: string =null,
        public materialViewTable: any ={
            moveableCols: [
                { field: 'del', header: 'Del', width: 40 },
                { field: 'newFileName', header: 'Filename', width: 100 },
                { field: 'grade', header: 'Grade', width: 60 },
                { field: 'subject', header: 'Subject', width: 120, pipeChk: 'title' },
                { field: 'materialType', header: 'Type', width: 100, pipeChk: 'title' },
                { field: 'chapters', header: 'Chapters', width: 250 }
            ]
        }
    ){}
}

export class ScheduleTestForm {
    constructor(
        public grade: string =null,
        public subject: string =null,
        public syllabus: string =null,
        public testDateTime: Date =null,
        public duration: string =null,
        public fullMarks: string =null,
        public testViewTable: any ={
            moveableCols: [
                
                { field: 'del', header: 'Del', width: 40},
                { field: 'testId', header: 'Test Id', width: 90 },
                { field: 'grade', header: 'Grade', width: 60},
                { field: 'subject', header: 'Subject', width: 90, pipeChk: 'title'},
                { field: 'syllabus', header: 'Syllabus', width: 250},
                { field: 'testDateTime', header: 'Date-Time', width: 100, pipeChk: 'date'},
                { field: 'fullMarks', header: 'F.M', width: 70},
                { field: 'duration', header: 'Duration', width: 80}
            ]
        }
    ){}
}

export class RecordMarksForm {
    constructor(
        public grade: string =null,
        public subject: string =null,
        public testDate: Date =null,
        public testId: string =null,
        public result: Object =[{
            studentId: null, studentName: null, marks: null
        }]
    ){}
}

export class resultObj {
    constructor(
       public studentId: string =null, 
       public studentName: string =null, 
       public marks: number =null
    ){}
}