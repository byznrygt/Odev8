//gerekli tüm öğelerin seçilmesi işlemi
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const photo = document.querySelector(".photo");

// startQuiz butonuna tıklandığında
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //info box gösterir
}

// exitQuiz butonun atıklandığında
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //info box ı gizler
}

// continueQuiz butonuna tıklandığında 
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //info box ı gizler
    quiz_box.classList.add("activeQuiz"); // quiz box ı gösterir
    showQuetions(0); // showQestions fonksiyonunu çağırır
    queCounter(1); //queCountera bir parametre aktarır
    startTimer(10); // startTimer fonksiyonunu çağırır
    startTimerLine(0); //startTimerLine fonksiyonnunu çağırır
}

let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//restartQuiz butonuna tıkladığımızda 
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //quiz box ı gösterir
    result_box.classList.remove("activeResult"); // result box ı gizler
    timeValue = 10;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // showQestions fonksiyonunu çağırır
    queCounter(que_numb); //que_numb değerini queCounter a geçirir
    clearInterval(counter); // counter ı temizler
    clearInterval(counterLine); // counterLine ı sıfırlar
    startTimer(timeValue); //startTimer fonksiyonunu çağırır
    startTimerLine(widthValue); //startTimerLine fonksiyonunu çağırır
    timeText.textContent = "Time Left"; //timeText metnini Time Left olarak değiştirir
    next_btn.classList.remove("show"); // next butonunu gizler
}

// quitQuiz butonu tılandığında
quit_quiz.onclick = () => {
    window.location.reload(); //mevcut sayfayı yeniden yükler
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Next Que butonuna tıklandığında
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //soru sayısı toplam soru uzunluğundan azsa
        que_count++; //que_count değerini artır
        que_numb++; // que_numb değerini artır
        if (que_count == 3) {
            photo.style.display = "block";
        } else {
            photo.style.display = "none";
        }
        showQuetions(que_count); //showQestions fonksiyonunu çağırır
        queCounter(que_numb); //que_numb değerini queCounter'a geçirir
        clearInterval(counter); // counter ı sıfırlar
        clearInterval(counterLine); //counterLine ı sıfırlar
        startTimer(timeValue); //startTimer fonksiyonunu çağırır
        startTimerLine(widthValue); //startTimerLine fonksiyonunu çağırır
        timeText.textContent = "Time Left"; //timeText'i Time Left olarak değiştirir
        next_btn.classList.remove("show"); //next butonu gizler
    } else {
        clearInterval(counter); // counter ı sıfırlar
        clearInterval(counterLine); //counterLine ı sıfırlar
        showResult(); //showResult fonksiyonunu çağıırır
    }
}

// diziden sorular ve seçenekler alma
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //soru ve seçenek için yeni bir yayılma ve div etiketi oluşturma ve dizi indeksini kullanarak değeri geçirme
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    que_text.innerHTML = que_tag; //que_tag içine yeni span etiketi ekleme
    option_list.innerHTML = option_tag; //

    const option = option_list.querySelectorAll(".option");

    // onclick i olan bütün seçeneklere ayaralama işlemi
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// simgeler için yeni div etiketleri oluşturma
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//kullanıcı seçeneğe tıkladığında
function optionSelected(answer) {
    clearInterval(counter); // counter ı temizler
    clearInterval(counterLine); //counterLine ı sıfırlar
    let userAns = answer.textContent; //kullanıcı tarafından seçilen seçeneği alma işlemi
    let correcAns = questions[que_count].answer; //diziden doğru cevap alma işlemi
    const allOptions = option_list.children.length; //tüm seçenek öğelerini alma işlmei

    if (userAns == correcAns) { //kullanıcı tarafından seçilen seçenek doğruysa
        userScore += 1; //puan değerini 1 artırma
        answer.classList.add("correct"); //seçilen seçeneğin yeşil olması
        answer.insertAdjacentHTML("beforeend", tickIconTag); //tick işareti ekleme
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //seçilen seçeneğin kırmızı olması
        answer.insertAdjacentHTML("beforeend", crossIconTag); //çarpı işsareti ekleme
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //dizi yanıtıyla eşleşen bir seçenek varsa 
                option_list.children[i].setAttribute("class", "option correct"); //eşleşen seçeneğe yeşil renk ekleme
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //tik işareti
                console.log("Auto selected correct answer.");
            }
        }

    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // seçenek seçildikten sonra tüm seçenekler devre dışı olur
    }

    next_btn.classList.add("show"); //next btn gösterir
}

function showResult() {
    info_box.classList.remove("activeInfo"); // info box ı gizler
    quiz_box.classList.remove("activeQuiz"); //quiz box ı gizler
    result_box.classList.add("activeResult"); //result box gösterir
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // üçten fazla puan alındıysa
        let scoreTag = '<span>ve Tebrikler 🎉,  <p>' + userScore + '</p> /<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //
    } else if (userScore > 1) { // birden fazla puan aldıysa
        let scoreTag = '<span>iyisin 😎, <p>' + userScore + '</p> /<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else { // if user scored less than 1
        let scoreTag = '<span>Üzgünüm 😐, <p>' + userScore + '</p> /<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time; //timeCount değerini zaman değeriyle değiştirme işlmei
        time--; //zaman değerini azaltma işlemi
        if (time < 9) { //zamanlayıcı 9'dan küçükse
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //zaman değerinden önce 0 eklenir
        }
        if (time < 0) { //zamanlayıcı 0'dan küçükse
            clearInterval(counter); //counter sıfırlar
            timeText.textContent = "Time Off"; //kalan zamanı zaman bitti  olarak değiştirir
            const allOptions = option_list.children.length; //ttüm seçenekleri alma 
            let correcAns = questions[que_count].answer; //diziden doğru cevabı alma
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //eşleşen bi yanıt varsa
                    option_list.children[i].setAttribute("class", "option correct"); //yeşil yanması
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //vve tick işareti
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //seçenek seçildikten sonra tüm seçenekler devre dışı olur
            }
            next_btn.classList.add("show"); //next btn gösterme 
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1; //zamanı bir artırma
        time_line.style.width = time + "px"; //zaman değerine göre px ile time_line genişliğini artırma
        if (time > 549) { //zaman değeri 549'dan büyükse
            clearInterval(counterLine); //counterLine ı sıfırla
            if (que_count < questions.length - 1) { //soru sayısı toplam soru uunluğundan azasa
                que_count++; //que_count değerini artırır
                que_numb++; // que_numb değerini artırır
                if (que_count == 3) {
                    photo.style.display = "block";
                } else {
                    photo.style.display = "none";
                }
                showQuetions(que_count); //showQestions fonksiyonunu çağırır
                queCounter(que_numb); //que_numb değerini queCounter'a geçirme işlemi
                clearInterval(counter); //counter sıfırlama
                clearInterval(counterLine); // counterLine sıfırlama
                startTimer(timeValue); //startTimer fonksiyonunu çağırma
                startTimerLine(widthValue); //startTimerLine fonksiyonunu çağırma
                timeText.textContent = "Time Left"; //timeText'i Time Left olarak değiştirir
                next_btn.classList.remove("show"); // next butonunu saklama
            } else {
                clearInterval(counter); //counter sıfırlama
                clearInterval(counterLine); // counterLine sıfırlama
                showResult(); //showResult fonksiyonunu çağırır
            }

        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> /<p>' + questions.length + '</p> Soru</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}