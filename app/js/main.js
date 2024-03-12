$(function () {
    new WOW().init();

    // popup-order
    $('.cta').click(function () {
        $('.backdrop').addClass('show');
    });

    $('.order__close-button').click(function () {
        $('.backdrop').removeClass('show');
    });

    $(document).on('mouseup', function (e) {
        // Проверяем, был ли клик вне элемента .order и его дочерних элементов, а также
        // наличие класса 'show' у элемента .backdrop
        if (!$('.order').is(e.target) && $('.order').has(e.target).length === 0 && $('.backdrop').hasClass('show')) {
            $('.backdrop').removeClass('show');
        }
    });



    // Light/Dark Mode
    $('.theme-switcher').click(function () {
        $(this).toggleClass('switch');
        $('.body').toggleClass('light');

    });

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


    // если .blog__list есть на странице, то микситап будет проинициализирован
    if ($('.blog__list').length) {
        var mixer = mixitup('.blog__list');
    }
});


$(function () {
    // Проверяем, что текущий URL содержит "requirements"
    if (window.location.pathname.includes("requirements")) {

        // гармошка блоков критериев
        $(function () {
            $('#reqComContent').hide();
            $('#reqHtmlContent').hide();
            $('#reqCssContent').hide();
            $('#reqAdaptiveContent').hide();
            $('#reqDesignContent').hide();

            $('#reqComBtn').click(function () {
                $(this).toggleClass('active');
                $('#reqComContent').slideToggle();
            });
            $('#reqHtmlBtn').click(function () {
                $(this).toggleClass('active');
                $('#reqHtmlContent').slideToggle();
            });
            $('#reqCssBtn').click(function () {
                $(this).toggleClass('active');
                $('#reqCssContent').slideToggle();
            });
            $('#reqAdaptiveBtn').click(function () {
                $(this).toggleClass('active');
                $('#reqAdaptiveContent').slideToggle();
            });
            $('#reqDesignBtn').click(function () {
                $(this).toggleClass('active');
                $('#reqDesignContent').slideToggle();
            });

        });

        // вызов, закрытие деталей критерия при клике вне деталей и по кнопке закрытия
        $(function () {
            // Обработчик кнопок открытия
            $('.req-card__button').click(function () {
                $('body').addClass('lock');
                var details = $(this).next('.req-card__details');
                details.addClass('show');

                // Добавляем обработчик для закрытия при клике вне элемента
                $(document).on('mouseup.details', function (e) {
                    if (!details.is(e.target) && details.has(e.target).length === 0) {
                        details.removeClass('show');
                        $('body').removeClass('lock');
                        $(document).off('mouseup.details'); // Удаляем обработчик после закрытия
                    }
                });
            });

            // Обработчик кнопок закрытия
            $('.req-card__close-button').click(function () {
                $('body').removeClass('lock');
                $(this).closest('.req-card__details').removeClass('show');
            });
        });
    }
});