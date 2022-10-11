$(function(){

// header --------------------------------------------------

    $('.header .nav-item').click(function(){
        $(this).find('.link-nav').addClass('active');
        $(this).siblings().find('.link-nav').removeClass('active');
    });

    $('.group-rightBtn .btn-top').click(function(){
        $('html, body').scrollTop(0);
    });

// sc-visual -----------------------------------------------

    fetch('./data/mainBanner.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;

        let html ='';
        let pop_html = '';

        data.forEach(banner => {
            html += `
                    <li class="swiper-slide">
                        <a href="#">
                            <div class="img-area" data-swiper-parallax-x="50%">
                                <img src="${banner.thumnail}" alt="${banner.title}">
                            </div>
                            <div class="text-bg">
                                <div class="text-area">
                                    <strong class="title">${banner.title}</strong>
                                    <span class="desc">${banner.desc}</span>
                                </div>
                            </div>
                        </a>
                    </li> 
                    `;
        });
        $('.sc-visual .swiper-wrapper').html(html);
    })

    var swiper = new Swiper(".sc-visual .swiper", {
        loop: true,
        parallax: true,
        autoplay: {
        delay: 2500,
        disableOnInteraction: false
        },
        pagination: {
            el: ".num-box",
            type: "custom",
            renderCustom:function(swiper, current, total){
                return `
                        <em class="num">
                            <span class="blind">현재</span>
                            ${current}
                        </em>
                        <em class="num">
                            <span class="blind">전체</span>
                            / ${total}
                        </em>
                        `;
            }
          }
    });

// sc-ranking ----------------------------------------------

    var swiper = new Swiper(".sc-ranking .swiper", {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true
    });

    fetch('./data/ranking.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;

        let html = '';
        let num = 1;

        data.forEach(el => {
            html += `
                    <li class="rank-item swiper-slide">
                        <a href="#" class="link-rank">
                            <div class="img-area">
                                <em class="num">${num++}</em>
                                <img src="${el.thumb}" alt="${el.brand}">
                            </div>
                            <div class="text-area">
                                <p class="brand">${el.brand}</p>
                                <div class="price-box">
                                    <em class="price">${el.price}</em>
                                    <span class="sale">${el.sale}</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    `;
        });
        $('#rankList').html(html);
    });

// sc-live ----------------------------------------------

    var swiper = new Swiper(".sc-live .swiper", {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true
    });

    fetch('./data/live.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;
        let html = '';
        data.forEach(el => {
            html += `
                    <li class="live-item swiper-slide">
                        <a href="#" class="link-live">
                            <div class="img-area">
                                <em class="date">${el.date}</em>
                                <img src="${el.thumb}" alt="${el.brand}">
                            </div>
                            <div class="text-area">
                                <p class="desc">${el.desc}</p>
                            </div>
                        </a>
                    </li>
                    `;
        });
        $('#liveList').html(html);
    });

// sc-profile ----------------------------------------------

    fetch('./data/influ.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;

        let html ='';

        data.forEach(el => {
            html += `
                    <li class="profile-item swiper-slide" role="tab" aria-selected="false">
                        <a href="#" class="link-profile">
                            <div class="bgColor-box">
                                <div class="img-area">
                                    <img src="${el.thumb}" alt="">
                                </div>
                            </div>
                            <div class="text-area">
                                <p class="name">${el.name}</p>
                                <span class="follower">팔로워${el.flowerCnt}</span>
                            </div>
                        </a>
                    </li>
                    `;
       });
       $('#influList').html(html);
       $('.profile-item').eq(0).trigger('click');
    })

    $(document).on('click','.profile-item',function(e){
        e.preventDefault();

        const idx = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        $(this).attr('aria-selected',true).siblings().attr('aria-selected',false);

        fetch('./data/influ.json')
        .then((response) => response.json())
        .then((json) => {
            data = json.items[idx].pics;
            data2 = json.items[idx];
            let html ='';
            data.forEach(el => {
                html += `
                        <li class="like-item">
                            <a href="#" class="like-link">                             
                                <div class="img-area">
                                    <img src="${el.thumb}" alt="">
                                </div>
                                <div class="text-box">
                                    <span class="desc">좋아요<span class="num">${el.likeCnt}</span>
                                </div>
                            </a>
                        </li>
                        `;
            });
            html2 = `
                    <a href="${data2.url}" class="link-sortcut">
                        <strong class="strong">${data2.name}</strong>
                        <span class="text">프로필 보러 가기</span>
                        <span class="icon"></span>
                    </a>
                    `;
            $('#influItems').html(html);
            $('.sc-profile .btn-box').html(html2);
        });
    });

    var swiper = new Swiper(".sc-profile .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 5,
        freeMode: true
    });

// sc-coordi -----------------------------------------------

    $(document).ready(function(){
        $('.btn-new').trigger('click');
    })

    $(document).on('click','.btn-new',function(e){
        e.preventDefault();

        const idx = Math.round(Math.random()*2)

        fetch('./data/coordi.json')
        .then((response) => response.json())
        .then((json) => {
            data = json.items[idx].look;

            let html = '';

            data.forEach(el => {
                html += `
                        <li class="coordi-item">
                            <a href="#" class="link-coordi">
                                <img src="${el.thumb}" alt="" class="img">
                            </a>
                        </li>
                        `;
            });
            $('#coordiList').html(html);
        });
    });

// footer --------------------------------------------------

    $('.btn-addr').click(function(){
        if($(this).hasClass('active')){
            $('.addr-box').removeClass('active');
            $(this).removeClass('active');
        }else {
            $('.addr-box').addClass('active');
            $(this).addClass('active');
        }
    });

});









/*  
<li class="swiper-slide">
    <a href="#">
        <div class="img-area" data-swiper-parallax-x="50%">
            <img src="./images/mv.jpg" alt="">
        </div>
        <div class="text-bg">
            <strong class="title">2020 스웨트 페스티벌</strong>
            <div class="text-area">
                <span class="desc">22.09.06 - 09.19</span>
            </div>
        </div>
    </a>
</li>  

<em class="num">
    <span class="blind">현재</span>
    11
</em>
<em class="num">
    <span class="blind">전체</span>
    / 28
</em>

<li class="coordi-item">
    <a href="#" class="link-coordi">
        <img src="./images/coordi01.jpg" alt="코디1" class="img">
    </a>
</li>

<a href="#" class="link-sortcut">
    <strong class="strong">${}</strong>
    <span class="text">프로필 보러 가기</span>
    <span class="icon"></span>
</a>

<li class="like-item">
    <a href="#" class="link-like">
        <div class="img-box">
            <img src="./images/profile-bottom.jpg" alt="">
        </div>
        <div class="text-box">
            <span class="desc">좋아요<span class="num">622</span>
        </div>
    </a>
</li>

    $('.sc-profile .profile-item').click(function(e){
        e.preventDefault();
        $(this).addClass('active')
        $(this).siblings().removeClass('active');

        nickName = $(this).find('.name').text();

        $('.sc-profile .strong').text(nickName);
    });
*/