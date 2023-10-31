export const searchIsDone = (json) => {
    if(json.hasOwnProperty('isDone')) return [json.isDone];
    const keys = json instanceof Object ? Object.keys(json) : [];
    for (const key of keys) {
        const obj = json[key];
        const isMatch = searchIsDone(obj);
        if (isMatch) {
            return isMatch;
        }
    }
};