//1. Triển khai lớp Audience (Khán Giả)
class Audience {
    static countID = 1;
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(name: string, email: string, phone: string){
        this.id = Audience.countID++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails():string{
        return `Thông tin khán giả_ ID: ${this.id} - Name: ${this.name} - email: ${this.email} - phone: ${this.phone}`;
    }
}

//2. Triển khai lớp Movie (phim)
abstract class Movie{
    static countID = 1;
    id: number;
    title: string;
    genre: string;
    ticketPrice: number;
    isShowing: boolean = false;

    constructor(title: string, genre: string, ticketPrice: number){
        this.id = Movie.countID++;
        this.title = title;
        this.genre = genre;
        this.ticketPrice = ticketPrice;
    }
    //Các phương thức
    startShow():void{
        this.isShowing = true;
    }

    stopShow():void{
        this.isShowing = false;
    }
    //Phương thức tính giá vé
    abstract calculateTicketCost(quantity: number):number
    //các ưu đãi đặc biệt
    abstract getSpecialOffers():string[]
    //Mô tả nội dung phim
    abstract getMovieInfo():string
}

//3. Các lớp con của Movie
    //3.1
class ActionMovie extends Movie{

    //Phương thức tính giá vé
    calculateTicketCost(quantity: number):number{
        return this.ticketPrice * quantity;
    }
    //các ưu đãi đặc biệt
    getSpecialOffers():string[]{
        return ["Miễn phí bắp răng", "Tặng poster"];
    }
    //Mô tả nội dung phim
    getMovieInfo():string{
        return `Tên phim ${this.title} - Giá vé: ${this.ticketPrice} - Phim hành động gay gắn, Kỹ xảo hoành tráng`;
    }
}
    //3.2
class ComedyMovie extends Movie{
     //Phương thức tính giá vé
    calculateTicketCost(quantity: number):number{
        let rootPrice = this.ticketPrice;

        return quantity > 4 ? rootPrice * 0.9 * quantity : rootPrice * quantity;
    }
    //các ưu đãi đặc biệt
    getSpecialOffers():string[]{
        return ["Giảm 10% cho nhóm trên 4 người"];
    }
    //Mô tả nội dung phim
    getMovieInfo():string{
        return `Tên phim ${this.title} - Giá vé: ${this.ticketPrice} - Phim hài nhẹ nhàng, vui nhộn`;
    }
}
    //3.3
class AnimationMovie extends Movie{
    //Phương thức tính giá vé
    calculateTicketCost(quantity: number):number{
        //Kiểm tra nếu tuổi < 12 thì không thu tiền
         return this.ticketPrice * quantity;
    }
    //các ưu đãi đặc biệt
    getSpecialOffers():string[]{
        return ["Giảm giá cho trẻ em dưới 12 tuổi"];
    }
    //Mô tả nội dung phim
    getMovieInfo():string{
        return `Tên phim ${this.title} - Giá vé: ${this.ticketPrice} - Phim hoạt hình với hình ảnh sống động`;
    }
}

//4. Lớp TicketBooking
class TicketBooking{
    static countId = 1;
    bookingId: number;
    audience: Audience;
    movie: Movie;
    quantity: number;
    totalPrice: number;

    constructor(audience: Audience, movie: Movie, quantity: number, totalPrice: number){
        this.bookingId = TicketBooking.countId++;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
    getDetails():string{
        return ` Thông tin đặt vé: audience: ${this.audience} - move: ${this.movie} - quantity: ${this.quantity} - totalPrice: ${this.totalPrice}`;
    }
}
//5. Cinema (Rạp chiếu)
class Cinema{
    movies: Movie[];
    audiences: Audience[];
    bookings: TicketBooking[];
    totalPrice: number;
    //Triển khai các phương thức

     //case 1:
    addAudience(name: string, email: string, phone:string): Audience{
        let newAudiences = new Audience(name, email, phone);
        this.audiences.push(newAudiences); 
        return newAudiences;
    }

    //case 2:
    addMovie(movie: Movie):void{
        this.movies.push(movie); //Thêm phim mới
    }
    //3. Đặt vé
    bookTickets(audienceId: number, movieId: number, quantity: number): TicketBooking | null{
        //Kiểm tra xem tồn tại id khách hàng, id phim
        let findAudicnceById = this.audiences.find(item => item.id === audienceId);
        let findMovieById = this.movies.find(item => item.id === movieId);

        if(findAudicnceById && findMovieById && quantity > 0 && findMovieById.isShowing){
            let newBooking = new TicketBooking(findAudicnceById, findMovieById, quantity, findMovieById.calculateTicketCost(quantity));
            this.bookings.push(newBooking);
            return newBooking;
        }
        return null;
    }

//ngung chieu phim 
cancelMovie(movieId: number): void{
            let findMovieById = this.movies.find(item => item.id === movieId);
            if(findMovieById){
                findMovieById.isShowing=false;
            }

}

listShowingMovies(): void{
    let result=this.movies.filter(item =>item.isShowing);
    for (let index = 0; index < result.length; index++) {
     console.log(`danh sach cac phim dang chieu thu ${index+1}la:ten ${result[index].title} `);
     
        
    }

}
listAudienceBookings(audienceId: number): void {
    let results=this.audiences.filter(item =>item);
    for (let index = 0; index < results.length; index++) {
     console.log(`danh sach cac phim dang chieu thu ${index+1}la:ten ${results[index].} `);
     
        
    }
}

}



    let choice: number;
do{
    console.log(`
-------------------------MENU------------------------
1. Thêm khán giả mới. (10đ)
2. Thêm phim mới (chọn loại: ActionMovie, ComedyMovie, AnimationMovie). (10đ)
3. Đặt vé (chọn khán giả, chọn phim, nhập số lượng vé). (10đ)
4. Ngừng chiếu phim. (10đ)
5. Hiển thị danh sách phim đang chiếu (filter). (10đ)
6. Hiển thị các đặt vé của một khán giả (filter). (10đ)
7. Tính và hiển thị tổng doanh thu (reduce). (10đ)
8. Đếm số lượng từng thể loại phim (reduce hoặc map). (10đ)
9. Tìm kiếm và hiển thị thông tin bằng mã định danh (generic). (10đ)
10. Hiển thị ưu đãi của một phim (find). (5đ)
11. Thoát chương trình. (5đ)
       `);
    choice = Number(prompt("Mời bạn nhập lựa chọn: "));

    switch(choice){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        case 11:
            console.log("Thoát chương trình!");
            break;
        default:
            console.log("Lựa chọn của bạn không hợp lệ vui lòng nhập lại");
    }
}while(choice != 11);