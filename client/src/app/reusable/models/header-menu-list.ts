export const HeaderMenuList = {'menuList': [
    {
        'menuName': "Tuition", 
        'menuList': []
    },
    {
        'menuName': "Study Material"
    },
    {
        'menuName': "Explore",
        'menuList':[
            {
                'menuName':"Explore as Student",
                'menuList':[
                    {'menuName':"View Recorded Sessions"},
                    {'menuName':"Question Bank"},
                    {'menuName':"Resister for Practice test"},
                    {'menuName':"Refer a Friend"},
                    {'menuName':"View Results"},
                    {'menuName':"Pay Fees"},
                    {'menuName':"View Branch Roaster"},
                    {'menuName':"View Holiday Calender"}
                ]},
            {
                'menuName':"Explore as Faculty",
                'menuList':[
                    {'menuName':"Materials/Question Upload", 'link': "explore/faculty", 'fragment':"upload-material"},
                    {'menuName':"Schedule Test", 'link': "explore/faculty", 'fragment':"schedule-test"},
                    {'menuName':"Record Students' Marks", 'link': "explore/faculty", 'fragment':"record-marks"},
                    {'menuName':"Refer Student", 'link': "explore/faculty", 'fragment':"refer-student"},
                    {'menuName':"Refer Faculty", 'link': "explore/faculty", 'fragment':"refer-faculty"}
                ]},
            {
                'menuName':"Explore as Admin",
                'menuList':[
                    {'menuName':"Structural Details", 'link': "explore/admin", 'fragment':"structural-view"},
                    {'menuName':"Fees Details", 'link': "explore/admin", 'fragment':"fees-view"},
                    {'menuName':"Discount Details", 'link': "explore/admin", 'fragment':"fixed-discount-view"}
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