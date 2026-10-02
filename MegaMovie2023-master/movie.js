//  ***** header 부분 html 시작 *****

// .header_bottom에 있는 .sitemap을 누르면
// .headerSitemap이 나오거나 사라지도록 만드는 script
let sitemapBtn = document.querySelector(".header_bottom .header_bottom_wrap .sitemap");
let headerSitemap = document.querySelector(".headerSitemap");
sitemapBtn.addEventListener("click", () => {
    if(searchBtn.classList.contains('on')){
        searchBtn.classList.remove('on');
        headerSearch.classList.remove('on');
        rankImg.style.backgroundImage = 'url(images/poster_01.jpg)';
    }
    if(sitemapBtn.classList.contains('on')){
        sitemapBtn.classList.remove('on');
        headerSitemap.classList.remove('on');
    }
    else{
        sitemapBtn.classList.add('on');
        headerSitemap.classList.add('on');
    }
})


// .header_bottom에 있는 .search를 누르면
// .headerSearch가 나오거나 사라지도록 만드는 script
let searchBtn = document.querySelector(".header_bottom .header_bottom_wrap .search");
let headerSearch = document.querySelector(".headerSearch");
searchBtn.addEventListener("click", () => {
    if(sitemapBtn.classList.contains('on')){
        sitemapBtn.classList.remove('on');
        headerSitemap.classList.remove('on');
    }
    if(searchBtn.classList.contains('on')){
        searchBtn.classList.remove('on');
        headerSearch.classList.remove('on');
        rankImg.style.backgroundImage = 'url(images/poster_01.jpg)';
    }
    else{
        headerSearch.classList.add('on');
        searchBtn.classList.add('on');
    }
})

// .headerSearch에 있는 .rank-cont 안 .list의 항목에 마우스를 올리면
//.rank-cont 안 .img 부분이 각각의 항목에 해당되는 이미지로 바뀌도록 만드는 script
let rankList = document.querySelectorAll(".headerSearch .rank-cont .list li a");
let rankImg = document.querySelector(".headerSearch .rank-cont .img");

for(let i=0;i<rankList.length;i++){
    rankList[i].addEventListener("mouseover", () => {
        rankImg.style.backgroundImage = `url(images/poster_0${i+1}.jpg`;
    })
}

// .header_bottom .depth1 안에 있는 list들이 hover될 경우
// 각 list에 붙은 a의 after 및 .depth2 뒤쪽에 있는 .bar가 보일 수 있게끔 만드는 script
let headerBottomList1 = document.querySelectorAll(".header_bottom_wrap .depth1 > li > a");
let headerBottomList2 = document.querySelectorAll(".header_bottom_wrap .depth1 > li > .depth2");
let bar = document.querySelector("header .bar");

for(let i=0;i<headerBottomList1.length;i++){
    console.log(headerBottomList1.length)
    headerBottomList1[i].addEventListener("mouseover", () => {
        if(i!=4){
            headerBottomList1[i].classList.add('after');
            bar.classList.add('on');
        }
    })
    headerBottomList1[i].addEventListener("mouseout", () => {
        headerBottomList1[i].classList.remove('after');
        bar.classList.remove('on');
    })
}

for(let i=0;i<headerBottomList2.length;i++){
    headerBottomList2[i].addEventListener("mouseover", () => {
        if(i===4){
            headerBottomList1[i+1].classList.add('after'); 
        }else{
            headerBottomList1[i].classList.add('after');
        }
        bar.classList.add('on');
    })
    headerBottomList2[i].addEventListener("mouseout", () => {
        if(i===4){
            headerBottomList1[i+1].classList.remove('after'); 
        }else{
            headerBottomList1[i].classList.remove('after');
        }
        bar.classList.remove('on');
    })
}

// .seat_section .seat_select .seat_area .seat_count 부분 js 시작
let downs = document.querySelectorAll(".count .down"); 
let ups = document.querySelectorAll(".count .up"); 
let nums = document.querySelectorAll(".count .number");
let headcount = 0; // 전체 인원수
let adultcount = 0; 
let teencount = 0; 
let specialcount = 0; // 우대 인원수
let startChk = -1;

// modal 부분 변수 지정
let modal = document.querySelector(".movieSeatContainer .modal");
let overlay = document.querySelector(".overlay");
let modal_p = document.querySelector(".modal_content p");
let modal_btnGroup = document.querySelector(".modal_content .btn_group");
// let modal_btns = document.querySelectorAll(".modal_content .btn_group button");
let modal_close = document.querySelector(".modal_content .btn_group .close");
let modal_confirm = document.querySelector(".modal_content .btn_group .confirm");
let modal_btnClose = document.querySelector(".modal .btn-close");

// 인원수가 줄어들고 늘어날 경우 .seat_choice_area 부분도 영향을 받는다.
let seats = document.querySelectorAll(".seat_choice .seats .seat");
let seatsChoiceArray = [];
for(let i=0;i<seats.length;i++){
    seatsChoiceArray[i] = "-";
}
// .seat_choice .seats에서 선택 가능한 자리 표시 
function seatsPossibleCheck() {
    for (let i = 0; i < seats.length; i++) {
        seats[i].classList.remove('possible');
    }
    for (let j = 0; j < headcount; j++) {
        seats[j].classList.add('possible');
    }
}


// 인원수가 줄어들고 늘어날 경우 .seatTable 부분 또한 영향을 받는다.
// 선택 가능한 인원수에 따라 .seatTable에서 선택 가능한 자리 표시
let choicecount = 0; // 선택한 인원수
let possiblecount = 0; // 선택 가능한 인원수

function seatTablePossibleCheck(){
    for(let i=0;i<seatTable.rows.length;i++){
        for (let j = 1; j < seatTable.rows[0].cells.length; j++) {
            // 선택 가능 인원수가 1명일 경우
            // 선택 불가 자리 표시 (짝수 번째 자리에만)
            if (possiblecount === 1) {
                if(j % 2 === 0){
                    if (seatTable.rows[i].cells[j].classList.contains('common')) {
                        seatTable.rows[i].cells[j].classList.remove('common');
                        seatTable.rows[i].cells[j].classList.add('impossible');
                    }
                }
            }
            // 아닐 경우 선택 불가 자리 표시할 필요 X
            else {
                if (seatTable.rows[i].cells[j].classList.contains('impossible')) {
                    seatTable.rows[i].cells[j].classList.remove('impossible');
                    seatTable.rows[i].cells[j].classList.add('common');
                }
            }
        }
    }
}

// down 버튼을 누를 경우
for(let i=0;i<downs.length;i++){
    downs[i].addEventListener("click", () => {
        // 전체 인원수가 선택 인원수의 값과 같을 때 modal 표시 (단, 전체 인원수가 0일 경우는 제외) 
        if(headcount===choicecount && headcount!=0){
            modal.classList.add('on');
            overlay.classList.add('on');
            modal_p.innerHTML = '선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?';
            modal_close.classList.add('on');
        }
        else{
            if(i===0){
                if(adultcount>0){
                    adultcount--;
                    headcount--;
                    nums[i].innerHTML = adultcount;
                }
            }
            else if(i===1){
                if(teencount>0){
                    teencount--;
                    headcount--;
                    nums[i].innerHTML = teencount;
                }
            }
            else{
                if(specialcount>0){
                    specialcount--;
                    headcount--;
                    nums[i].innerHTML = specialcount;
                }
            }
            possiblecount = headcount-choicecount;
            seatsPossibleCheck();
            seatTablePossibleCheck();
            choicePeopleCheck();
            countDisplay();
            payDisplay();
        }
    })
}

// up 버튼을 누를 경우
for(let i=0;i<ups.length;i++){
    ups[i].addEventListener("click", () => {
        // 총 인원수가 8명일 경우 modal 표시
        if(headcount===8){
            modal.classList.add('on');
            overlay.classList.add('on');
            modal_p.innerHTML = '인원선택은 총 8명까지 가능합니다.';
        }
        else{
            if(i===0){
                adultcount++;
                nums[i].innerHTML = adultcount;
            }
            else if (i === 1) {
                teencount++;
                nums[i].innerHTML = teencount;
            }
            else {
                // 우대 인원수가 0명일 경우 modal 표시
                if(specialcount===0){
                    modal.classList.add('on');
                    overlay.classList.add('on');
                    modal_p.innerHTML = '우대 요금으로 예매하신 고객님께서는<br>상영관 입장 시 증빙서류를 제시해 주시기 바랍니다.<br>(미지참 시 입장 제한)<br><br>- 장애인: 1~6급 (복지카드)<br>- 국가유공자: (국가유공자증)<br>- 경로: 만 65세 이상 (신분증)<br><br>위 기재된 사항 외 우대 적용 대상 고객님께서는 현장 매표소에서 우대 발권이 가능합니다. 우대 요금 선택 시 추가 할인이 제한될 수 있습니다.<br>※일부 지점의 경우 경로 우대요금 미운영';
                }
                specialcount++;
                nums[i].innerHTML = specialcount;
            }
            headcount++;
        }
        possiblecount = headcount-choicecount;
        seatsPossibleCheck();
        seatTablePossibleCheck();
    })
}

// .seat_section .seat_select .seat_area .seat_layout 부분 js 시작
// 2차원 배열과 table을 이용해서 스크린 좌석 배치도 작성
let seatLayout = document.querySelector(".seat_layout");
let alphabet = ["A","B","C","D","E","F","G","H","I","J"];
let seatArr = Array.from(Array(10),() => new Array(10));

// .seat_Layout에 테이블 생성 
function seat(){
    let table = '<table class="seatTable">';
    for(let i=0;i<seatArr.length;i++){
        table += '<tr>';
        table += '<td>'+alphabet[i]+'</td>';
        for(let j=0;j<seatArr[0].length;j++){
            table += '<td class="common">'+(j+1)+'</td>';
        }
        table += '</tr>';
    }
    table += '</table>';
    seatLayout.innerHTML = table;
}
seat();

// .seatTable 요소들
let seatTable = document.querySelector(".seatTable");
// .seatTable 위에 마우스 커서를 올리면
for(let i=0;i<seatTable.rows.length;i++){
    for(let j=1;j<seatTable.rows[0].cells.length;j++){
        seatTable.rows[i].cells[j].addEventListener("mouseover", () => {
            // 선택 가능한 인원수가 1일 경우
            if (possiblecount === 1) {
                if (seatTable.rows[i].cells[j].classList.contains('common')) {
                    seatTable.rows[i].cells[j].classList.remove('common');
                    seatTable.rows[i].cells[j].classList.add('hover');
                }
            }
            // 2 이상일 경우
            else if (possiblecount >= 2) {
                // 홀수 번째 cell이 hover될 경우
                if (j % 2 === 1) {
                    if (seatTable.rows[i].cells[j].classList.contains('common')) {
                        seatTable.rows[i].cells[j].classList.remove('common');
                        seatTable.rows[i].cells[j].classList.add('hover');
                    }
                    if (seatTable.rows[i].cells[j + 1].classList.contains('common')) {
                        seatTable.rows[i].cells[j + 1].classList.remove('common');
                        seatTable.rows[i].cells[j + 1].classList.add('hover');
                    }
                }
                // 짝수 번째 cell이 hover될 경우
                else {
                    if (seatTable.rows[i].cells[j].classList.contains('common')) {
                        seatTable.rows[i].cells[j].classList.remove('common');
                        seatTable.rows[i].cells[j].classList.add('hover');
                    }
                    if (seatTable.rows[i].cells[j - 1].classList.contains('common')) {
                        seatTable.rows[i].cells[j - 1].classList.remove('common');
                        seatTable.rows[i].cells[j - 1].classList.add('hover');
                    }
                }
            }
        })  
    }
}
// .seatTable 위에 마우스 커서를 내리면
for(let i=0;i<seatTable.rows.length;i++){
    for(let j=1;j<seatTable.rows[0].cells.length;j++){
        seatTable.rows[i].cells[j].addEventListener("mouseout", () => {
            // 선택 가능한 인원수가 1일 경우
            if (possiblecount === 1) {
                if(seatTable.rows[i].cells[j].classList.contains('hover')){
                    seatTable.rows[i].cells[j].classList.remove('hover');
                    seatTable.rows[i].cells[j].classList.add('common');
                }
            }
            // 2 이상일 경우
            else if (possiblecount >= 2) {
                // 홀수 번째 cell이 hover될 경우
                if (j % 2 === 1) {
                    if (seatTable.rows[i].cells[j].classList.contains('hover')) {
                        seatTable.rows[i].cells[j].classList.remove('hover');
                        seatTable.rows[i].cells[j].classList.add('common');
                    }
                    if (seatTable.rows[i].cells[j + 1].classList.contains('hover')) {
                        seatTable.rows[i].cells[j + 1].classList.remove('hover');
                        seatTable.rows[i].cells[j + 1].classList.add('common');
                    }
                }
                // 짝수 번째 cell이 hover될 경우
                else {
                    if (seatTable.rows[i].cells[j].classList.contains('hover')) {
                        seatTable.rows[i].cells[j].classList.remove('hover');
                        seatTable.rows[i].cells[j].classList.add('common');
                    }
                    if (seatTable.rows[i].cells[j - 1].classList.contains('hover')) {
                        seatTable.rows[i].cells[j - 1].classList.remove('hover');
                        seatTable.rows[i].cells[j - 1].classList.add('common');
                    }
                }
            }       
        })
    }
}

// (1) .seatTable에 있는 좌석을 클릭하면
for(let i=0;i<seatTable.rows.length;i++){
    for(let j=1;j<seatTable.rows[0].cells.length;j++){
        seatTable.rows[i].cells[j].addEventListener("click", () => {  
            // (2.hover) 선택하지 않은 좌석을 클릭하면
            if(seatTable.rows[i].cells[j].classList.contains('hover')){
                // (3.twoormore) possiblecount가 2 이상이면
                if(possiblecount >= 2){
                    // (4.odd)홀수 번째 좌석이면 오른쪽 좌석도 같이 선택
                    if(j % 2 === 1){
                        seatTable.rows[i].cells[j].classList.remove('hover');
                        seatTable.rows[i].cells[j+1].classList.remove('hover');
                        seatTable.rows[i].cells[j].classList.add('choice');
                        seatTable.rows[i].cells[j+1].classList.add('choice');
                        choicecount += 2;
                        // .seats 부분에 선택한 좌석 입력
                        seatsChoiceArray[choicecount-2] = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML;
                        seatsChoiceArray[choicecount-1] = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j+1].innerHTML; 
                        // seats[choicecount-2].innerHTML = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML;
                        // seats[choicecount-1].innerHTML = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j+1].innerHTML;
                    }
                    // (4.even)짝수 번째 좌석이면 왼쪽 좌석도 같이 선택
                    else{
                        seatTable.rows[i].cells[j].classList.remove('hover');
                        seatTable.rows[i].cells[j-1].classList.remove('hover');
                        seatTable.rows[i].cells[j].classList.add('choice');
                        seatTable.rows[i].cells[j-1].classList.add('choice');
                        choicecount += 2;
                        seatsChoiceArray[choicecount-2] = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j-1].innerHTML;
                        seatsChoiceArray[choicecount-1] = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML;
                        // seats[choicecount-2].innerHTML = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j-1].innerHTML;
                        // seats[choicecount-1].innerHTML = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML;
                    }  
                }
                // (3.one)possiblecount가 1이면
                else if(possiblecount === 1){
                    seatTable.rows[i].cells[j].classList.remove('hover');
                    seatTable.rows[i].cells[j].classList.add('choice');
                    choicecount++;
                    seatsChoiceArray[choicecount-1] = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML;
                    // seats[choicecount-1].innerHTML = seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML;
                }
            }
            // (2.choice) 선택했던 좌석을 클릭하면
            else if(seatTable.rows[i].cells[j].classList.contains('choice')){
                // 옆 자리에도 선택된 좌석이 있으면
                // 옆 자리 좌석까지 포함하여 취소
                // => choicecount는 2 감소,         possiblecount는 감소된 choicecount만큼 증가
                // 옆 자리에 선택 좌석이 없으면
                // 선택한 좌석만 취소
                // => choicecount는 1 감소,         possiblecount는 감소된 choicecount만큼 증가
                
                // (3.odd) 홀수 번째 자리
                if(j % 2 === 1){
                    // (4.true)옆 자리에도 선택된 좌석이 있으면
                    if(seatTable.rows[i].cells[j+1].classList.contains('choice')){
                        seatTable.rows[i].cells[j].classList.remove('choice');
                        seatTable.rows[i].cells[j+1].classList.remove('choice');
                        seatTable.rows[i].cells[j].classList.add('common');
                        seatTable.rows[i].cells[j+1].classList.add('common');
                        choicecount -= 2;
                        for(let k=0;k<seatsChoiceArray.length;k++){
                            if(seatsChoiceArray[k]===seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML){
                                seatsChoiceArray.splice(k,2);
                            }
                        }
                        seatsChoiceArray.splice(seatsChoiceArray.length,0,'-','-');
                    }
                    // (4.false)옆 자리에 선택 좌석이 없으면
                    else{
                        seatTable.rows[i].cells[j].classList.remove('choice');
                        seatTable.rows[i].cells[j].classList.add('common');
                        choicecount--;
                        for(let k=0;k<seatsChoiceArray.length;k++){
                            // console.log(seatsChoiceArray[k]);
                            // console.log(seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML);
                            if(seatsChoiceArray[k]===seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML){
                                seatsChoiceArray.splice(k,1);
                            }
                        }
                        seatsChoiceArray.splice(seatsChoiceArray.length,0,'-');
                    }
                }
                // (3.even) 짝수 번째 자리
                else {
                    // (4.true) 옆 자리에도 선택된 좌석이 있으면
                    if (seatTable.rows[i].cells[j - 1].classList.contains('choice')) {
                        seatTable.rows[i].cells[j].classList.remove('choice');
                        seatTable.rows[i].cells[j - 1].classList.remove('choice');
                        seatTable.rows[i].cells[j].classList.add('common');
                        seatTable.rows[i].cells[j - 1].classList.add('common');
                        choicecount -= 2;
                        for(let k=0;k<seatsChoiceArray.length;k++){
                            if(seatsChoiceArray[k]===seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j-1].innerHTML){
                                seatsChoiceArray.splice(k,2);
                            }
                        }
                        seatsChoiceArray.splice(seatsChoiceArray.length,0,'-','-');
                    }
                    // (4.false) 옆 자리에 선택 좌석이 없으면
                    else {
                        seatTable.rows[i].cells[j].classList.remove('choice');
                        seatTable.rows[i].cells[j].classList.add('common');
                        choicecount--;
                        for(let k=0;k<seatsChoiceArray.length;k++){
                            // console.log(seatsChoiceArray[k]);
                            // console.log(seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML);
                            if(seatsChoiceArray[k]===seatTable.rows[i].cells[0].innerHTML+seatTable.rows[i].cells[j].innerHTML){
                                seatsChoiceArray.splice(k,1);
                            }
                        }
                        seatsChoiceArray.splice(seatsChoiceArray.length,0,'-');
                    }
                }
            }
            console.log(seatsChoiceArray);
            possiblecount = headcount-choicecount;
            seatTablePossibleCheck();
            choiceCountCheck();
            seatsChoiceCheck();
            nextButtonChangeCheck();
            choicePeopleCheck();
            countDisplay();
            payDisplay();
            // console.log("선택 가능 좌석:" + possiblecount);
        })
    }
}

for(let i=0;i<seatTable.rows.length;i++){
    for(let j=1;j<seatTable.rows[0].cells.length;j++){
        seatTable.rows[i].cells[j].addEventListener("click", () => {  
            // (2.common) hover가 되지 않는 상황에서 선택하지 않은 좌석을 클릭하면

            // 총 인원수가 0명이 아닐 때 클릭하면 modal 표시
            if(seatTable.rows[i].cells[j].classList.contains('common')
                && possiblecount === 0 && startChk === 0){
                modal.classList.add('on');
                overlay.classList.add('on');
                modal_p.innerHTML = '좌석 선택이 완료되었습니다.';
                // let closeButton = document.createElement('button');
                // closeButton.setAttribute('class','close purple target');
                // let closeTextNode = document.createTextNode('확인');
                // modal_btnGroup.appendChild(closeButton).appendChild(closeTextNode);
                // modal_btnGroup.innerHTML = '<button type="button" class="purple close">확인</button>';
                // modal_btns = document.querySelectorAll(".modal_content .btn_group button");
            }
            // 총 인원수가 0명일 때 클릭하면 modal 표시
            else if(seatTable.rows[i].cells[j].classList.contains('common')
            && possiblecount === 0 && startChk === -1){
                modal.classList.add('on');
                overlay.classList.add('on');
                modal_p.innerHTML = '관람하실 인원을 먼저 선택해주세요.';
                // let closeButton = document.createElement('button');
                // closeButton.setAttribute('class','close purple target');
                // let closeTextNode = document.createTextNode('확인');
                // modal_btnGroup.appendChild(closeButton).appendChild(closeTextNode);
                // modal_btnGroup.innerHTML = '<button type="button" class="purple close">확인</button>';
                // modal_btns = document.querySelectorAll(".modal_content .btn_group button");
            }
        })
    }
}

// modal에서 .btn-close 버튼을 눌렀을 때
modal_btnClose.addEventListener("click", () => {
    // console.log(modal_btns.length);
    // console.log(modal_btns[0]);
    modal_p.innerHTML = '';
    // let target = document.getElementsByClassName('target');
    // for(let i=0;i<target.length;i++){
    //     target[i].parentNode.removeChild(target);
    // }
    // modal_btnGroup.innerHTML = '';
    modal.classList.remove('on');
    overlay.classList.remove('on');
    modal_close.classList.remove('on');
})

// modal에서 취소 버튼을 눌렀을 때
modal_close.addEventListener("click", () => {
    modal_p.innerHTML = '';
    modal.classList.remove('on');
    overlay.classList.remove('on');
    modal_close.classList.remove('on');
})

// modal에서 확인 버튼을 눌렀을 때
modal_confirm.addEventListener("click", () => {
    // close 버튼이 활성화(on)되어 있을 때만
    // 확인 버튼을 누를 때 reset 해준다
    if(modal_close.classList.contains('on')){
        reset();
    }
    modal_p.innerHTML = '';
    modal.classList.remove('on');
    overlay.classList.remove('on');
    modal_close.classList.remove('on');
})

// modal에서 .btn_group에 있는 버튼을 눌렀을 때
// for(let i=0;i<modal_btns.length;i++){
//     modal_btns[i].addEventListener("click", () => {
//         if(modal_btns[i].classList.contains('confirm')){
//             reset();
//         }
//         modal_p.innerHTML = '';
//         // let target = document.getElementsByClassName('target');
//         // for(let j=0;j<target.length;j++){
//         //     target[j].parentNode.removeChild(target);
//         // }
//         modal_btnGroup.innerHTML = '';
//         modal.classList.remove('on');
//         overlay.classList.remove('on');
//     })
// }


// 선택한 인원수가 0일 경우 startChk = -1;
function choiceCountCheck(){
    if(choicecount===0){
        startChk = -1;
    }
    else{
        startChk = 0;
    }
}

// 선택한 인원수만큼 선택좌석 클래스 표시
function seatsChoiceCheck() {
    for (let i = 0; i < headcount; i++) {
        seats[i].classList.remove('choice');
        seats[i].classList.add('possible');
        seats[i].innerHTML = seatsChoiceArray[i];
    }
    for (let j = 0; j < choicecount; j++) {
        seats[j].classList.remove('possible');
        seats[j].classList.add('choice');
    }
}

// 선택 완료 시 '다음' 버튼 속성 변경
let nextButton = document.querySelector(".btn_group .next");

function nextButtonChangeCheck(){
    if(startChk===0 && possiblecount===0){
        nextButton.classList.remove('disabled');
        nextButton.classList.add('active');
    }
    else{
        nextButton.classList.remove('active');
        nextButton.classList.add('disabled');
    }
}

// 인원 선택 시 어른→청소년→우대 순으로 인원과 결제금액 출력
let adultchoice = 0;
let teenchoice = 0;
let specialchoice = 0;
let cnt = document.querySelector(".count span");
let price = document.querySelector(".pay .price em");

function choicePeopleCheck(){
    adultchoice = 0;
    teenchoice = 0;
    specialchoice = 0;
    for(let i=0;i<choicecount;i++){
        if(i<adultcount){
            adultchoice++;
        }
        else if(i<adultcount+teencount){
            teenchoice++;
        }
        else{
            specialchoice++;
        }
    }
}

function countDisplay(){
    let number = "";
    if(adultchoice>0){
        number += `&nbsp;성인&nbsp;${adultchoice}`;
    }
    if(teenchoice>0){
        number += `&nbsp;청소년&nbsp;${teenchoice}`;
    }
    if(specialchoice>0){
        number += `&nbsp;우대&nbsp;${specialchoice}`;
    }
    cnt.innerHTML = number;
}

function payDisplay(){
    let money = adultchoice*15000 + teenchoice*12000 + specialchoice*5000;
    price.innerHTML = money.toLocaleString(money);
}

// 초기화버튼을 누르면 모든 부분(관람인원, 좌석부분, 선택좌석, 금액 등)이 초기화
function reset(){
    headcount = 0;
    adultcount = 0; 
    teencount = 0; 
    specialcount = 0;
    startChk = -1;
    choicecount = 0;
    possiblecount = 0;
    for(let i=0;i<nums.length;i++){
        nums[i].innerHTML = 0;
    }
    for(let i=0;i<seatTable.rows.length;i++){
        for(let j=1;j<seatTable.rows[0].cells.length;j++){
            seatTable.rows[i].cells[j].classList.remove('choice');
            seatTable.rows[i].cells[j].classList.remove('impossible');
            seatTable.rows[i].cells[j].classList.add('common');
        }
    }
    for(let i=0;i<seats.length;i++){
        seats[i].classList.remove('possible');
        seats[i].classList.remove('choice');
        seats[i].innerHTML = "-";
        seatsChoiceArray[i] = "-";
    }
    choiceCountCheck();
    seatsChoiceCheck();
    nextButtonChangeCheck();
    choicePeopleCheck();
    countDisplay();
    payDisplay();
}


// .seat_section .seat_result .info_area 부분 js 시작
let time = document.querySelector(".time");
let time_now = document.querySelector(".time .now");
let time_others = document.querySelectorAll(".time .other .btn");
let time_check = 0;

time.addEventListener("click", () => {
    if(time_check){
        time.classList.add('on');
        time_check--;
    }
    else{
        time.classList.remove('on');
        time_check++;
    }
})
timeMatch();

for(let i=0;i<time_others.length;i++){
    time_others[i].addEventListener("click", () => {
        time_now.innerHTML = time_others[i].innerHTML;
        timeMatch();
    })
}

function timeMatch(){
    for(let i=0;i<time_others.length;i++){
        time_others[i].classList.remove('on');
        if(time_others[i].innerHTML===time_now.innerHTML){
        time_others[i].classList.add('on');
        }
    }
}

//로그인 누르면 modal이 뜨도록 & scroll 보기/감추기
//X버튼 누르면 modal이 사라지도록
let login = document.querySelector("header .header_top .right a:first-child");
let login_btnClose = document.querySelector(".login_modal .btn_close");
let loginModal = document.querySelector(".login_modal");
let bgModal = document.querySelector(".bg-modal");

login.addEventListener("click", () => {
    document.body.classList.add('scrollStop');
    loginModal.classList.add('on');
    bgModal.classList.add('on');
})
login_btnClose.addEventListener("click", () => {
    document.body.classList.remove('scrollStop');
    loginModal.classList.remove('on');
    bgModal.classList.remove('on');
})

// 아이디, 비밀번호 input에 최소 한 글자씩 입력되야
// 로그인 버튼 활성화
let idInput = document.querySelector(".login_modal .modal_cont .modal_left .input-text.id");
let pwInput = document.querySelector(".login_modal .modal_cont .modal_left .input-text.pw");
let loginBtn = document.querySelector(".login_modal .modal_cont .modal_left .button");

idInput.addEventListener("input", () => {
    var space = /\s/; // 공백 체크
    if(space.exec(idInput.value)){
        idInput.value = idInput.value.replace(' ',''); // 공백 제거
    }
    var notBlank = /\S+/;
    if(notBlank.test(idInput.value) && notBlank.test(pwInput.value)){
        loginBtn.disabled = false;
    }
    else{
        loginBtn.disabled = true;
    }
})

pwInput.addEventListener("input", () => {
    var space = /\s/; // 공백 체크
    if(space.exec(pwInput.value)){
        pwInput.value = pwInput.value.replace(' ',''); // 공백 제거
    }
    var notBlank = /\S+/;
    if(notBlank.test(idInput.value) && notBlank.test(pwInput.value)){
        loginBtn.disabled = false;
    }
    else{
        loginBtn.disabled = true;
    }
})


// 연습용
// function addPlus() {
//     let a = document.getElementById('a');
//     return a;
// }

// function calc() {
//     let element = addPlus();  
//     console.log(element.value);  
// }