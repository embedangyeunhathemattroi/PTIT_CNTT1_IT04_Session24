// Hàm generic T để xử lý câu đầu vào
function findLongestUniqueWord<T extends string>(sentence: T): string {
    // Tách câu thành mảng từ
    const words = sentence.split(" ");

    // Hàm kiểm tra từ có ký tự trùng hay không
    const hasUniqueChars = (word: string): boolean => {
        const charSet = new Set(word); // Set chỉ giữ ký tự duy nhất
        return charSet.size === word.length;
    };

    
    const uniqueWords = words.filter(hasUniqueChars);


    let longestWord = "";
    for (const word of uniqueWords) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}


console.log(findLongestUniqueWord("hello world apple banana orange pumpkin cucumber"));

