      // DOM요소 접근
        let btnOpen = document.querySelector('.btn-open');
        let btnClose = document.querySelector('.btn-close');
        let modal = document.querySelector('.modal');
        let overlay = document.querySelector('.overlay');

        // addEventListener()이용
        // 모달 열기
        btnOpen.addEventListener('click',() => {
            modal.classList.add('active');
            overlay.classList.add('active');
        });
        // 모달 닫기
        btnClose.addEventListener('click',() => {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        });
        // 오버레이 클릭시 모달 닫기
        overlay.addEventListener('click',() => {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        });