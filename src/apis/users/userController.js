const userModel = require("./userModel").userModel

exports.registerValidator = async (req,res) => {
    try{
        let body = req.body
        if(!body.email){
            res.send({"err":"Email is mandatory!"})
        }
        else{
            let isUserPresent = await userModel.findOne({email:body.email})
            if(!isUserPresent){
                let createUser = await userModel.create(body)
                res.send({"msg":"Validator created successfully."})
            }
            else{
                res.send({"err":"Validator already exists."})
            }
        }
    }
    catch{
        res.send({"err":"Error"})
    }
}

exports.generateStake = async (req,res) => {
    try{
        let sumOfStake = await userModel.aggregate([{$group: {_id:'',"totalFee":{$sum: '$fee'}}},{$project: {_id:0}}])

        console.log(sumOfStake[0].totalFee);
        sumOfStake = sumOfStake[0].totalFee
        let forOneDegree = 360/sumOfStake
        console.log(forOneDegree);
        let result = {}
        let users = await userModel.aggregate([{$project: {_id:0, name:1, fee:1}}])
        // console.log(users);
        users.forEach((user) => {
            let userName = user.name
            let userFee = user.fee
            let stake = userFee*forOneDegree
            result[userName] = stake
        })
        // let result = 0
        res.send(result)
    }
    catch(err){
        res.send({"err":err})
    }
}

exports.chooseValidator = async (req,res) => {
    try{
        let sumOfStake = await userModel.aggregate([{$group: {_id:'',"totalFee":{$sum: '$fee'}}},{$project: {_id:0}}])

        console.log(sumOfStake[0].totalFee);
        sumOfStake = sumOfStake[0].totalFee
        let forOneDegree = 360/sumOfStake
        console.log(forOneDegree);
        let result = {}
        let users = await userModel.aggregate([{$project: {_id:0, name:1, fee:1}}])
        // console.log(users);
        let probabilityList = []

        users.forEach((user) => {
            let userName = user.name
            let userFee = user.fee
            let stake = userFee*forOneDegree
            result[userName] = stake
            let i;
            for(i = 0; i<stake; i++){
                probabilityList.push(userName)
            }
        })
        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }
        // let result = 0
        probabilityList = shuffle(probabilityList)
        // console.log(probabilityList);
        // const counts = {};

        // for (const num of probabilityList) {
        //     counts[num] = counts[num] ? counts[num] + 1 : 1;
        // }
        // console.log(counts["Harsha"]);
        const randomElement = probabilityList[Math.floor(Math.random() * probabilityList.length)];

        res.send({"validator":randomElement})
    }
    catch(err){
        res.send({"err":err})
    }
}

exports.getUsers = async (req,res) => {
    try {
        let allUsers = await userModel.find()
        res.status(200).send({"data":allUsers})
    } catch (error) {
        res.status(400).send({"err":error})
    }
}