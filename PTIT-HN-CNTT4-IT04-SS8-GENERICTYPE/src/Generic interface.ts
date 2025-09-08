interface NumberOption{
    value:number;
    name:string;
}

interface stringOption{
    value:number;
    name:string;
}
//lam theo kieu generic, tso kieu T + bat ki gtri nao truyen phia sau
interface Option<T>{
     value:T;
    name:string;
}


const option1:Option<number>={
    value:100,
    name:"Ptit"
}
console.log(option1);

const option2:Option<number>={
    value:100,
    name:"Ptit"
}
console.log(option2);

//vdu ve interface product
interface product{
    id:number;
    name:string;
}
//tao bien product 
const productOption:Option<product>={//se quy dinh value dang obj
    value:{name:"JS",id:1},
    name:"PTIT",
    //ko muon ep kieu nguyen thuy nx thi tao nhu tren, value giong product
}
 console.log(productOption);

 