const express=require('express');
const User =require('../models/user')
const ScheduledBatch =require('../models/scheduled-batch-model')

var scheduler={}
scheduler.userCourseValidityCheck= async ()=>{
    try{
        const userList=await User.find({userRole:'student'}).exec()
        for(let user of userList){
            for(let course of user.courses){
                if(course.status=='allocated' && course.duration!=0){
                    course.duration=course.duration-1
                }
                if(course.status=='allocated' && course.duration==0){
                    const scheduledBatchList=await ScheduledBatch.find({}).exec()
                    for(let eachBatch of scheduledBatchList){
                        for(let batchUser of eachBatch.userList){
                            let idx=eachBatch.userList.indexOf(batchUser)
                            if(batchUser.courseObjId==course._id){
                                eachBatch.userList.splice(idx,1)
                            }
                        }
                        await eachBatch.save()
                    }
                    course.status="expired"
                    //await ScheduledBatch.update({},
                    //{$pull:{'userList.courseObjId':course._id}},{ multi: true },{useFindAndModify: false})
                }
            }
            user.facultyGrade=undefined
            user.certification=undefined
            user.educationalDet=undefined
            user.teachingExp=undefined
            user.reference=undefined
            user.subjects=undefined
            await user.save()
        }
    } catch(err){
        console.log(err)
    }
}

scheduler.batchUserExpire =async ()=>{
    try{
        const scheduledBatchList=await ScheduledBatch.find({}).exec()
        for(let eachBatch of scheduledBatchList){
            for(let batchUser of eachBatch.userList){
                let idx=eachBatch.userList.indexOf(batchUser)
                expDate=new Date(batchUser.endDate)
                expDate=new Date(expDate.setHours(0,0,0))
                currDate=new Date()
                currDate=new Date(currDate.setHours(0,0,0))
                if(currDate>expDate){
                    let uName=batchUser.userName
                    let courseId=batchUser.courseObjId
                    eachBatch.userList.splice(idx,1)
                    eachBatch.save()
                    const user=await User.findOne({userName:uName}).exec()
                    for(let course of user.courses){
                        let idx1=eachBatch.userList.indexOf(batchUser)
                        if(course._id==courseId){
                            course.status="expired"
                        }
                    }
                    userDoc.facultyGrade=undefined
                    userDoc.certification=undefined
                    userDoc.educationalDet=undefined
                    userDoc.teachingExp=undefined
                    userDoc.reference=undefined
                    userDoc.subjects=undefined
                    await user.save()
                }
            }

        }
    } catch(err){
        console.log(err)
    }
}

module.exports = scheduler