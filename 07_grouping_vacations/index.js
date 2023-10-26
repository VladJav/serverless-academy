const vacations = require('./data.json');
const groupVacations = (data) => {
    const usersMap = new Map();
    for(const obj of data){
        if(usersMap.has(obj.user._id)){
            usersMap.set(obj.user._id, {
                ...usersMap.get(obj.user._id),
                vacations: [
                    ...usersMap.get(obj.user._id).vacations, {
                    startDate: obj.startDate,
                    endDate: obj.endDate
                }]
            });
        }
        else{
            usersMap.set(obj.user._id, {
                userId: obj.user._id,
                userName: obj.user.name,
                vacations: [{
                    startDate: obj.startDate,
                    endDate: obj.endDate
                }]
            });
        }
    }
    return Array.from(usersMap).map(([, value]) => ({ ...value}));
};

const users = groupVacations(vacations);

console.log( users );