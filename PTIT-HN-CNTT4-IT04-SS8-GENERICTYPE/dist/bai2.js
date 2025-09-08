function checkCondition(condition) {
    if (condition) {
        console.log("Xin chao");
    }
    else {
        console.log("Tam biet");
    }
}
let isGreeting = true;
checkCondition(isGreeting);
isGreeting = false;
checkCondition(isGreeting);
