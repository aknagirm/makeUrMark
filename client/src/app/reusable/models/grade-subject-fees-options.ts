export interface GradeBoardSubDetails {
    docType: string,
    createdDate: Date,
    createdBy: string,
    label: string,
    value: string
}

export interface TestTutionFeesDetails {
    docType: string,
    createdDate: Date,
    createdBy: string,
    grade?: string,
    subject?: string,
    batchType?: string,
    tutionFees?: string,
    testFees?: string,
    countForDiscount?: string,
    discount?: string
}

export const headerList= [
    {cols: [
        {field: 'createdDate', header: 'Created Date', width: 120, pipeChk: 'date'},
        {field: 'createdBy', header: 'Created By', width: 160},
        {field: 'label', header: 'Label', width: 90},
        {field: 'value', header: 'Value', width: 90}]
    },
    {cols: [
        {field: 'createdDate', header: 'Created Date', width: 120, pipeChk: 'date'},
        {field: 'createdBy', header: 'Created By', width: 160},
        {field: 'grade', header: 'Grade', width: 70},
        {field: 'subject', header: 'Subject', width: 70},
        {field: 'batchType', header: 'Batch Type', width: 90},
        {field: 'tutionFees', header: 'Tution Fees', width: 90}
        ]
    },
    {cols: [
        {field: 'createdDate', header: 'Created Date', width: 120, pipeChk: 'date'},
        {field: 'createdBy', header: 'Created By', width: 160},
        {field: 'grade', header: 'Grade', width: 90},
        {field: 'testFees', header: 'Test Fees', width: 70}
        ]
    },
    {cols: [
        {field: 'createdDate', header: 'Created Date', width: 120, pipeChk: 'date'},
        {field: 'createdBy', header: 'Created By', width: 160},
        {field: 'countForDiscount', header: 'Count', width: 90},
        {field: 'discount', header: 'discount', width: 90}
        ]
    }
]

export const FormViewOptions = [
    {name: 'structure', value: 'board', formOptions: [
        {value: 'grade', label: 'Grade'},
        {value: 'board', label: 'Board'},
        {value: 'subject', label: 'Subject'},
        {value: 'batchType', label: 'Batch Type'}
    ]},
    {name: 'fees', value: 'tution', formOptions: [
        {value: 'test', label: 'Test Fees'},
        {value: 'tution', label: 'Tution Fess'}
    ]},
    {name: 'fixedDiscount', value: 'subjectDiscount', formOptions: [
        {value: 'subjectDiscount', label: 'Subject Discount'},
        {value: 'monthDiscount', label: 'Months Discount'}
    ]},
    {name: 'roster', value: 'batchRoster', formOptions: [
        {value: 'batchRoster', label: 'Batch Roster'},
        {value: 'holidayRoster', label: 'Holiday Roster'}
    ]},
]
    