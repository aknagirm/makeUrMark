export const HeaderMenuList = {'menuList': [
    {
        'menuName': "Tution", 
        'menuList': []
    },
    {
        'menuName': "Study Material", 'link': "studyMaterial"
    },
    {
        'menuName': "Explore",
        'menuList':[
            {
                'menuName':"Explore as Student",
                'menuList':[
                    {'menuName':"View Branch Roaster", 'link': "explore/student/viewRoster"},
                    {'menuName':"Resister for Test", 'link': "explore/student/registerTest"},
                    {'menuName':"View Results", 'link': "explore/student/viewResult"},
                    {'menuName':"View Recorded Sessions"},
                    {'menuName':"Question Bank"},
                    {'menuName':"Refer a Friend", 'link': "referUser"},
                ]},
            {
                'menuName':"Explore as Faculty",
                'menuList':[
                    {'menuName':"Materials/Question Upload", 'link': "explore/faculty", 'fragment':"upload-material"},
                    {'menuName':"Schedule Test", 'link': "explore/faculty", 'fragment':"schedule-test"},
                    {'menuName':"Record Students' Marks", 'link': "explore/faculty", 'fragment':"record-marks"},
                    {'menuName':"Refer Student", 'link': "referUser", 'fragment':"refer-student"},
                    {'menuName':"Refer Faculty", 'link': "referUser", 'fragment':"refer-faculty"}
                ]},
            {
                'menuName':"Explore as Admin",
                'menuList':[
                    {'menuName':"View All User", 'link': "allUserView"},
                    {'menuName':"Structural Details", 'link': "explore/admin", 'fragment':"structural-view"},
                    {'menuName':"Fees Details", 'link': "explore/admin", 'fragment':"fees-view"},
                    {'menuName':"Discount Details", 'link': "explore/admin", 'fragment':"fixed-discount-view"},
                    {'menuName':"Roster Details", 'link': "explore/admin", 'fragment':"roster-holiday-view"},
                    {'menuName':"Transaction Analysis", 'link': "allTransactionDetails"},
                    {'menuName':"Payment Capture", 'link':"paymentCapture"}
                ]
            }
        ]
    },
    {
        'menuName': "More",
        'menuList': [
            {'menuName': "About MakeUrMark"},
            {'menuName': "Our Success Stories"},
            {'menuName': "Our Blog"},
            {'menuName': "FAQ"}
        ]
    },
    {
        'menuName': "Contact Us"
    }
]}