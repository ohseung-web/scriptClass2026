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
// 각 list에 붙은 a의 after가 보일 수 있게끔 만드는 script
let headerBottomList1 = document.querySelectorAll(".header_bottom_wrap .depth1 > li > a");
let headerBottomList2 = document.querySelectorAll(".header_bottom_wrap .depth1 > li > .depth2");

for(let i=0;i<headerBottomList1.length;i++){
    headerBottomList1[i].addEventListener("mouseover", () => {
        headerBottomList1[i].classList.add('after');
    })
    headerBottomList1[i].addEventListener("mouseout", () => {
        headerBottomList1[i].classList.remove('after');
    })
}

for(let i=0;i<headerBottomList2.length;i++){
    headerBottomList2[i].addEventListener("mouseover", () => {
        if(i===4){
            headerBottomList1[i+1].classList.add('after'); 
        }else{
            headerBottomList1[i].classList.add('after');
        } 
    })
    headerBottomList2[i].addEventListener("mouseout", () => {
        if(i===4){
            headerBottomList1[i+1].classList.remove('after'); 
        }else{
            headerBottomList1[i].classList.remove('after');
        }
    })
}
  
// .btn-like에 관한 script
let btnLike = document.querySelectorAll(".section01_wrap .movie-list .cell .btn-group .btn-like");
let btnLikeIcon = document.querySelectorAll(".section01_wrap .movie-list .cell .btn-group .btn-like i");
for(let i=0;i<btnLike.length;i++){
    btnLike[i].addEventListener("click", () => {
        if(btnLikeIcon[i].classList.contains('on')){
            btnLikeIcon[i].classList.remove('on');
        }
        else{
            btnLikeIcon[i].classList.add('on');
        }
    })
}

// ***** .section05 부분 script *****
let prev = document.querySelector(".section05_wrap .prev");
let next = document.querySelector(".section05_wrap .next");
let slideInner = document.querySelector(".section05_wrap .slide .slide-inner");
let slideImgs = document.querySelectorAll(".section05_wrap .slide .slide-inner a");

// 각각의 이미지들이 hover될 경우 이미지가 변경되도록 하는 script
for(let i=0;i<slideImgs.length;i++){
    slideImgs[i].addEventListener("mouseover", () => {
        slideImgs[i].classList.add('on');
    })
    slideImgs[i].addEventListener("mouseout", () => {
        slideImgs[i].classList.remove('on');
    })
}

// .section05_wrap의 .slide에 있는 .prev/.next 버튼을 클릭하면
// 가운데 있는 이미지들이 각각 왼쪽 또는 오른쪽으로 움직이도록 하는 script
prev.addEventListener("click", () => {
    slideInner.classList.add('left');
    slideInner.classList.remove('right');
})
next.addEventListener("click", () => {
    slideInner.classList.add('right');
    slideInner.classList.remove('left');
})

// .swiper-bullet을 클릭했을 때 해당하는 이미지가 뜨게끔 만들기
// .popup_modal의 이미지 play/stop(3초 후에 자동으로 이미지 변경)
// .popup_modal의 .btn-close를 누르면 modal 사라지게 만들기
let popupModal = document.querySelector(".popup_modal");
let popupImg = document.querySelector(".popup_modal .wrap .popup-img img");
let popupPlayBtn = document.querySelector(".popup_modal .wrap .popup-control .popup-btn-play");
let popupbullet = document.querySelectorAll(".popup_modal .wrap .popup-control .popup-swiper-btn .swiper-bullet");
let popupCloseBtn = document.querySelector(".popup_modal .wrap .btn-close");
let k = 0;
let myTimer;

for(let i=0;i<popupbullet.length;i++){
    popupbullet[i].addEventListener("click", () => {
        for(let j=0;j<popupbullet.length;j++){
            popupbullet[j].classList.remove('active');
        }
        popupbullet[i].classList.add('active');
        popupImg.setAttribute("src",'images/pic_'+(i+1)+'.jpg');
    })
}
imageChange();
// setTimeOut(function(),지연시간)을 이용한 자동 버튼 클릭
function imageChange(){
    if(k===5){
        k = 0;
    }
    else{
        popupbullet[k].click();
        k++;
    }
    // 
    myTimer = setTimeout(imageChange,3000); 
}

// clearTimeOut(function(),지연시간): setTimeOut의 자동 실행을 지운다.
popupPlayBtn.addEventListener("click", () => {
    if(popupPlayBtn.classList.contains('stop')){
        popupPlayBtn.classList.remove('stop');
        imageChange();
    }
    else{
        popupPlayBtn.classList.add('stop');
        clearTimeout(myTimer);
    }
})

popupCloseBtn.addEventListener("click", () => {
    popupModal.style.display = "none";
})

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