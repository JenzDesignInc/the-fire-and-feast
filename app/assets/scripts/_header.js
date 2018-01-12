$(document).ready(function () {
    
    var mainMenu = $('.menu');
    var menuItem = $('.menu__item ');

    mainMenu.hide();

    // Remove the #tag from the hash on refresh
    $(function () {
        var hash = location.hash.replace('#', '');
        if (hash != '') {
            location.hash = '';
        }
    });

    $(function () {
        $('.header__mobileUtil button').on('click', function () {
            
            mainMenu.toggle()
            mainMenu.toggleClass('animated fadeInRight');
            menuItem.addClass('hide');
            

            if ($('nav').css({ display: "none" })) {
                $('nav').css({ display: "block" })

            }
        });

    });
    //close menu on escape key
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('#hamburger div').removeClass('hamburger__navicon--isActive');
            mainMenu.removeClass('animated fadeInLeft').hide();
        }
    });

    //hide main menu on click to sub navs
    $(function () {
        $('[data-toggle]').on('click', function () {
            mainMenu.addClass('animated fadeInRight')
            menuItem.addClass('animated fadeInRight')
            $(window).scrollTop(0);
        });

    });

    //back to main menu
    $(function () {
        $('.back').on('click', function () {
            if ($('#mainNav').css({ display: "none" })) {
                $('#mainNav').css({ display: "block" })
            }
        });

    });
    $(function () {
        $('#hamburger').on("click", function () {
            // event.stopPropagation();
            $('#hamburger div').toggleClass('hamburger__navicon--isActive');
        });
    });



});