//OOP
abstract class Animal{
    //gom nhieu phuong thuc abstract va nhieu phuong thuc kopk abstract
    abstract makeSound():void; //ko muon tra ve gtri sdung void
    //abstract....
    //co method rieng cua no dc dinh nghia cho chinh no
    move(){
       console.log("phuong thuc di chuyen");
       
    }
    //1 class khac khac ke thua
}
class Cat extends Animal {  //ke thua thi ph trien khai tu cai abstract cua no
    //bat buoc ph trien khai method astract
    //di trien khai
     makeSound():string {
        return ` tieng keu cua loai meo, meo meo!`;
     }
}

//neu la 1 abstract bat buoc chi dc dinh nghia trong abstract class.1 class co abstract sai k dinh
//interFace nhu ban hop dong cac class ph tuan theo no