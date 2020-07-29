export class EditCourseForm {
    constructor(
        public subjectName: string =null,
        public type: string =null,
        public grade: string =null,
        public facultyName: string =null,
        public startTime: string =null,
        public endTime: string =null,
        public day: string =null,
        public board: string =null,
        public cost: string =null,
        public subjectId: string =null,
        public batchId: string=null,
        public columns:any= [
            {name: 'subjectName', label: 'SUBJECT NAME', type: "text", value: ""},
            {name: 'type', label: 'TYPE', type: "dropdown", values: (new TypeOfCourse).type, filter: false},
            {name: 'day', label: 'DAY', type: "dropdown", values: (new DayOfWeek).day, filter: false},
            {name: 'startTime', label: 'START TIME', type: "dropdown", values: (new TimeSlots).slots, filter: true},
            {name: 'endTime', label: 'END TIME', type: "dropdown", values: (new TimeSlots).slots, filter: true},
            {name: 'grade', label: 'GRADE', type: "dropdown", values: (new Grade).grade, filter: false},
            {name: 'board', label: 'BOARD', type: "dropdown", values: (new Board).board, filter: false},
            {name: 'facultyName', label: 'FACULTY NAME', type: "dropdown", values: (new Faculty).faculty, filter: true},
            {name: 'cost', label: 'COST', type: "curr", value: ""}
        ]
        
    ){}    
}

class TypeOfCourse {
    constructor(
        public type: any[]=[
            {label: 'REGULAR', value: 'regular'},
            {label: 'PREMIUM', value: 'premium'}
        ]
    ){}
}

class Grade {
    constructor(
        public grade: any[]=[
            {label: 'GRADE VI', value: '6'},
            {label: 'GRADE VII', value: '7'},
            {label: 'GRADE VIII', value: '8'},
            {label: 'GRADE IX', value: '9'},
            {label: 'GRADE X', value: '10'},
            {label: 'GRADE XI', value: '11'},
            {label: 'GRADE XII', value: '12'},
        ]
    ){}
}

class TimeSlots {
    
    constructor(
        public slots: any[]=[]
    ){
        let i =0
        let hr=0
        let min=0
        while(i< 48){
            if(min == 0) {
                if(hr < 10) {
                    this.slots.push({label: `0${hr}:0${min} hrs`, value: `0${hr}:0${min}`})
                } else {
                    this.slots.push({label: `${hr}:0${min} hrs`, value: `${hr}:0${min}`})
                }
            } else {
                if(hr < 10) {
                    this.slots.push({label: `0${hr}:${min} hrs`, value: `0${hr}:${min}`})
                } else {
                    this.slots.push({label: `${hr}:${min} hrs`, value: `${hr}:${min}`})
                }
            }
                
            min=min+30
            if(min == 60){
                hr++
                min =0
            }
            i++
        }
    }
}

class Board {
    constructor(
        public board: any[]=[
            {label: 'WB', value: 'wb'},
            {label: 'CBSE', value: 'cbse'},
            {label: 'ICSE', value: 'icse'},
            {label: 'ISC', value: 'isc'}
        ]
    ){}
}


class DayOfWeek {
    constructor(
        public day: any[]=[
            {label: 'MONDAY', value: 'mon'},
            {label: 'TUESDAY', value: 'tue'},
            {label: 'WEDNESDAY', value: 'wed'},
            {label: 'THURSDAY', value: 'thur'},
            {label: 'FRIDAY', value: 'fri'},
            {label: 'SATURDAY', value: 'sat'},
            {label: 'SUNDAY', value: 'sun'}
        ]
    ){}
}

class Faculty {
    constructor(
        public faculty: any =[]
    ){}
}