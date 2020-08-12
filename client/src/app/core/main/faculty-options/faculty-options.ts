export class ReferenceForm {
    constructor(
        public referedRole: string =null,
        public firstName: string =null,
        public lastName: string =null,
        public contactNumber: string =null,
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
        public selectedMaterial: string =null
    ){}
}

export class ScheduleTestForm {
    constructor(
        public grade: string =null,
        public subject: string =null,
        public syllabus: string =null,
        public testDateTime: Date =null,
        public duration: string =null,
        public fullMarks: string =null
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