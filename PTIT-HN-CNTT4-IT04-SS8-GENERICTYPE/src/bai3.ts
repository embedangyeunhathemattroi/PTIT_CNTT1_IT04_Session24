function reverseArray<T>(a:T[]):T[] {
    return a.slice().reverse();
    
}
console.log(reverseArray([1,2,3]));
console.log(reverseArray(['a','y','PTIT']));
