// function getLength<T>(item:T):number { //ch biet chac chan kieu du lieu gi 
//     //return item.length; //llm vậy bị sai vi ko XD dc kieu dlieu ban dau
// }
//can rang buoc boi tu khoa extends
function getLength(item) {
    return item.length;
}
console.log(getLength("Rikkei Education"));
console.log(getLength([1, 2, 3]));
function sayHello(person) {
    console.log((`Hello,${person.name}`));
}
sayHello({ name: "PTIT" }); //ko dc truyen sai kieu du lieu , van dc them thuoc tinh nma ko dc sai va cung 1 dong
