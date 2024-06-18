$(function () {
    new WOW().init();


    // вызов меню
    $(function () {
        var menuVisible = false;

        // Показать / скрыть меню при клике на кнопку
        $('.burger-btn').click(function (e) {
            e.stopPropagation(); // Остановить всплытие события, чтобы не срабатывало на document.click
            menuVisible = !menuVisible;
            $(this).toggleClass('active');
            $('.header__list').toggleClass('active');
        });
        // Скрыть меню при клике за его пределами
        $(document).click(function (e) {
            if (menuVisible && !$(e.target).closest('.header__list').length && !$(e.target).closest('.burger-btn').length) {
                $('.burger-btn').removeClass('active');
                $('.header__list').toggleClass('active');
                menuVisible = false;
            }
        });
        // Скрыть меню при клике на элемент .menu__item
        $('.header__item').click(function () {
            $('.burger-btn').removeClass('active');
            $('.header__list').toggleClass('active');
            menuVisible = false;
        });
    });

    // появление затемнения липкой шапки
    $(function () {
        var header = $('.header');
        var scrollPosition = $(window).scrollTop();

        // Проверяем положение прокрутки при загрузке страницы
        if (scrollPosition > 30) {
            header.addClass('fixed');
        }

        $(window).scroll(function () {
            scrollPosition = $(window).scrollTop();
            if (scrollPosition > 30) {
                header.addClass('fixed');
            } else {
                header.removeClass('fixed');
            }
        });
    });


    // чтобы тег base не мешал якорным ссылкам + сразу же плавный скролл для всех якорных ссылок
    $(function () {
        $("body").on('click', '[href*="#"]', function (e) {
            var fixed_offset = 150;
            $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 800);
            e.preventDefault();
        });
    });

    // popup

    $('.modalBtn').click(function () {
        $('.modal').addClass('show');
        $('.body').addClass('lock');
    });
    $('.modalBtnClose').click(function () {
        $('.modal').removeClass('show');
        $('.body').removeClass('lock');
    });
    $(document).on('mouseup', function (e) {
        // Проверяем, был ли клик вне элемента .order и его дочерних элементов, а также
        // наличие класса 'show' у элемента .backdrop
        if (!$('.modal__content').is(e.target) && $('.modal__content').has(e.target).length === 0 && $('.modal').hasClass('show')) {
            $('.modal').removeClass('show');
            $('.body').removeClass('lock');
        }
    });



});

$(document).ready(function () {
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});


