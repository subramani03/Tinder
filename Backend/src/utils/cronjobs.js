const cron = require("node-cron");
const { subDays, startOfDay, endOfDay }= require("date-fns");
const connectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");


cron.schedule("2 14 * * *",async ()=>{
    try{
        const yesterday = subDays(new Date(),1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const yesterdayInterestedRequests= await connectionRequestModel.find({
            status:"interested",
            createdAt:{
                $gte: yesterdayStart,
                $lt:yesterdayEnd,
            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(yesterdayInterestedRequests.map((req)=>req.toUserId.email)),]

        console.log(listOfEmails);

        for(const email of listOfEmails){
            try {

                const res = await sendEmail.run("new friend requests pending for "+ email,"There are so many friend requests pending, please login to the tinder-dating.rest and accept or reject the request")
                
            } catch (error) {
                console.log("error "+error)
                
            }
        }
    }catch(err){
        console.log("error "+err);
    }
})

/*

! this is synchorous way of sending email using for loop one by one. this is ok for 100 or 200 user.
! for large user(lakhs of users, etc) this is not recommended


! we use "bee-queue" to manage the large users and send in queue by batch and batch like each batch conatins 100 users



  for(const email of listOfEmails){
            try {

                const res = await sendEmail.run("new friend requests pending for "+ email,"There are so many friend requests pending, please login to the tinder-dating.rest and accept or reject the request")
                
            } catch (error) {
                console.log("error "+error)
                
            }
        }

*/ 
