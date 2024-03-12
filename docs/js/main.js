$(function () {
    new WOW().init();


    // вызов меню
    $(function () {
        var menuVisible = false;
        $('.menu__list').hide();
        // Показать / скрыть меню при клике на кнопку
        $('.burger-btn').click(function (e) {
            e.stopPropagation(); // Остановить всплытие события, чтобы не срабатывало на document.click
            menuVisible = !menuVisible;
            $(this).toggleClass('active');
            $('.menu__list').slideToggle();
        });
        // Скрыть меню при клике за его пределами
        $(document).click(function (e) {
            if (menuVisible && !$(e.target).closest('.menu__list').length && !$(e.target).closest('.burger-btn').length) {
                $('.burger-btn').removeClass('active');
                $('.menu__list').slideToggle();
                menuVisible = false;
            }
        });
        // Скрыть меню при клике на элемент .menu__item
        $('.menu__item').click(function () {
            $('.burger-btn').removeClass('active');
            $('.menu__list').slideToggle();
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

});

$(document).ready(function() {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});