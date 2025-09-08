
function createObject<K extends string, V>(keys: K[], values: V[]): Record<K, V> {
    const result = {} as Record<K, V>;
    keys.forEach((key, index) => {
        result[key] = values[index];
    });

    return result;
}


const keys = ['name', 'age', 'email'] as const; 
const values = ['Linh ', 20, 'linh@example.com'];

const person = createObject(keys, values);

console.log(person);
