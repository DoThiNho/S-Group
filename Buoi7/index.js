//Bài 1
// Arrow function : là cú pháp ngắn gọn để viết các biểu thức
const arrowFunctionDefinition = () => {
    const result = 5*7;
    return result;
}

// Anonymous function : hay còn gọi là hàm ẩn danh
// Khi nào thì dùng hàm ẩn danh : khi hàm chỉ sử dụng một lần để thực hiện một công việc và bạn không cần sử dụng hàm đó ở phạm vi global thì bạn có thể sử dụng hàm ẩn danh

() => {
    const result = "Nho Do";
    return result;
}

let greet = function () {
    console.log("Welcome to Nho Do!");
};
 
greet();

// Bai 2
function getDateTime() {
    let d = new Date();
    return "Now is : " + d.getHours() + ":" + d.getMinutes() + " " + d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear();
}

console.log(getDateTime());

// Bai 3
function allFormatsOfDate({day, month, year}){
    return month + "-" + day + "-" + year 
    + "\n" + month + "/" + day + "/" + year
    + "\n" + day + "-" + month + "-" + year
    + "\n" +  day + "/" + month + "/" + year;
}

const date = {
    day : 28,
    month : 12,
    year : 2022
}

const result = allFormatsOfDate(date);
console.log(result);

// Bai 4
function isIncreaseChainNumber(number){
    let arr = number.toString().split('');
    for(let i = 0; i < arr.length - 2; i++){
        if(arr[i] < arr[i+1] && arr[i+1] < arr[i+2]){
            return true;
        }
    }
    return false;
}

const number1 = 123456789n
const number2 = 123432112321n
const number3 = 988811111n
const number4 = 12121212n;

console.log(isIncreaseChainNumber(number1))  // true
console.log(isIncreaseChainNumber(number2)) // true
console.log(isIncreaseChainNumber(number3)) // false
console.log(isIncreaseChainNumber(number4)) // false


// Bai 5
function caesarCypher(text, step) {
	// 
}

const name = "Hoang Nhan"
const cypherText = getCaesarString(name, 3)

console.log(cypherText) // Krdqj Qkdq







// Bai 6
function highestFreqNumber(numbers) {
    return numbers.sort((a,b) =>
        numbers.filter(v => v===a).length
        - numbers.filter(v => v===b).length
    ).pop();

}

const numbers = [1,2,3,5,6,7,4,7,3,2,1,6,7,8,7,7,1,7,3,7,9999,7,123,7]

console.log(highestFreqNumber(numbers)) // 7

// Bai 7
const isIncludeJS = (str) => {
	return str.toLowerCase().includes("javascript");
}

const str1 = "asdsajkzzjAVAscriptttaskldjkl123aszxc"
const str2 = "jjjjjjjavaaaaScriptttttttttt"
const str3 = "888javaScript888"

console.log(isIncludeJS(str1)); //true
console.log(isIncludeJS(str2)); //false
console.log(isIncludeJS(str3)); //true

// Bai 8
function getMonthName(monthNumber) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(monthNumber < 0 || monthNumber > 12) return "Not a number";
    return monthNames[monthNumber - 1];
}
   
console.log(getMonthName(3)) // March
console.log(getMonthName(4)) // April

// Bai 9
function longestWord(str) {
	return str.replaceAll(',', '').split(' ').reduce((max, item) => {
        return max.length > item.length ? max : item;
    }, str.split(' ')[0]);
}

const str = "Little darlin', it's been a loooooong, cold, lonely winter"

console.log(longestWord(str)) // loooooong


// Bai 10
const sum = (number) => {
    return number.toString().split('').filter(item => Number(item) !== 5).reduce((total, item) => {
        return total += Number(item);
    }, 0);  
}
  
  console.log(sum(1231312321378127391237219312n)) // 90
  console.log(sum(99999999999999999999999999999n))// 261
  console.log(sum(12345678908765432123456555566n)) // 98