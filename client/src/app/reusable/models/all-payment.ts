export const AllPaymentTable=[
    {field: 'transDate', header: 'Transaction Date', width: 100, pipeChk: 'date'},
    {field: 'orderId', header: 'Order Id', width: 100},
    {field: 'paymentId', header: 'Payment Id', width: 100, pipeChk: 'link'},
    {field: 'paymentFrom', header: 'Payment From', width: 100, pipeChk: 'link'},
    {field: 'paymentTo', header: 'Payment To', width: 100, pipeChk: 'link'},
    {field: 'paymentIndicator', header: 'Indicator', width: 100},
    {field: 'paymentReason', header: 'Reason', width: 100},
    {field: 'amount', header: 'Amount', width: 100}
]

export const AllDeletedPaymentTable=[
    {field: 'transDate', header: 'Transaction Date', width: 100, pipeChk: 'date'},
    {field: 'paymentId', header: 'Payment Id', width: 100, pipeChk: 'link'},
    {field: 'paymentFrom', header: 'Payment From', width: 100, pipeChk: 'link'},
    {field: 'paymentTo', header: 'Payment To', width: 100, pipeChk: 'link'},
    {field: 'paymentIndicator', header: 'Indicator', width: 100},
    {field: 'paymentReason', header: 'Reason', width: 100},
    {field: 'amount', header: 'Amount', width: 100},
    {field: 'delDate', header: 'Deleted Date', width: 100, pipeChk: 'date'},
    {field: 'delBy', header: 'Deleted By', width: 100}
]

export const AssociatePaymentCapture=[
    {field: 'paymentTo', header: 'User Name', width: 100},
    {field: 'userRole', header: 'User Role', width: 100},
    {field: 'lastPaymentAmt_Mon1', header: 'Prev Fees Mon1', width: 100},
    {field: 'lastPaymentDate_Mon1', header: 'Prev Pay Date Mon1', width: 100, pipeChk: 'date'},
    {field: 'lastPaymentAmt_Mon2', header: 'Prev Fees Mon2', width: 100},
    {field: 'lastPaymentDate_Mon2', header: 'Prev Pay Date Mon2', width: 100, pipeChk: 'date'},
    {field: 'currMonthFees', header: 'Current Fees', width: 100},
    {field: 'currPaymentDate', header: 'Payment Date', width: 100, pipeChk: 'date'},
    {field: 'paymentId', header: 'Payment/Bank Ref Id', width: 100}
]