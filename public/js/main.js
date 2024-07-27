
jQuery.noConflict();
var $ = jQuery;
var fonts_load = 0;
var odd = 1;
var sp_width = 768;

var m_x = -1000;
var m_y = -1000;
var n_x = -1000;
var n_y = -1000;

var m_x2 = -1000;
var m_y2 = -1000;
var n_x2 = -1000;
var n_y2 = -1000;

var wst = 0;
var wh = 0;

var ajax_p = new Object();
ajax_p = { pd: 1 };



const futuraObserver = new FontFaceObserver('futura-pt');
Promise.all([
    futuraObserver.load()
]).then(function() {
    document.documentElement.classList.add("fonts-loaded");
    fonts_load = 1;
});


var act_flag = 0;
var act_move_flag = 0;
var act_x = 0;
var act_x2 = 0;


$(function($) {





    $("html").mousewheel(function(eo, delta, deltaX, deltaY) {

        if (delta < 0) {
            $("html").attr("scroll_d", "down");
        } else {
            $("html").attr("scroll_d", "up");
        }
    });

    $("html").mousemove(function() {
        if (event.clientY < 76) {
            $("html").attr("scroll_d", "up");
        }
    });




    $(".act__slide>div").clone().appendTo('.act__slide');





    $(document).on('touchstart mousedown', '.act__slide__area', function(event) {
        if (event.type == "mousedown") {
            act_x = event.clientX;
        } else {
            var touchObject = event.changedTouches[0];
            act_x = touchObject.pageX;
        }

        act_flag = 1;
        act_move_flag = 1;

    });



    $(document).on('touchmove mousemove', '.act__slide__area', function(event) {
        if (event.type == "mousemove") {
            act_x2 = event.clientX;
        } else {
            var touchObject = event.changedTouches[0];
            act_x2 = touchObject.pageX;
        }
        if (act_flag && (act_x - act_x2) > 0) {
            $('[sln="act__slide"]').slick('slickNext');
            act_flag = 0;
        }
        if (act_flag && (act_x - act_x2) < 0) {
            $('[sln="act__slide"]').slick('slickPrev');
            act_flag = 0;
        }
        act_move_flag = 0;
    });




    $(document).on('touchend mouseup', '.act__slide__area', function(event) {
        act_flag = 0;
    });






    $(document).on('click', '.act__slide__newnav', function(event) {
        if (act_move_flag) {
            if ($(this).hasClass("act__slide__newnav_2")) {
                $('[sln="act__slide"]').slick('slickNext');
            } else {
                $('[sln="act__slide"]').slick('slickPrev');
            }
        }
        act_flag = 0;

    });





    var loch = location.href;


    $("[ln_to='" + $("html").attr("thislng") + "']").each(function() {
        $(this).prependTo($(this).parent());
    });


    $("[ln_to]").each(function() {

        const arr = ['en', 'ch', 'zh', 'kr'];
        arr.forEach((elem, index) => {
            loch = loch.replace("/" + elem + "/", "/" + $(this).attr("ln_to") + "/");
        });

        $(this).attr("href", loch);


    });

    $("#toppage").keydown(function(event) {
        if (event.keyCode === 40) {
            if ($("html").hasClass("scrolled")) {} else {
                $("body").removeClass("noscroll");
            }

        }
    });

    setTimeout(function() {
        fonts_load = 1;
    }, 100);

    p_wide_button();
    def();
    set_form();
    set_brands();
    set_arc_activities();
    set_sitemap();
    set_policy();
    set_awards();
    set_cookie();
    set_history();
    set_special();
    set_hotels();
    set_dev();
    set_ajax();
    set_history_mc();


    slickr(".related__slide", {
        autoplay: false,
        variableWidth: true,
        centerMode: true,
        infinite: false,
        initialSlide: 1,
        slidesToShow: 3,
        responsive: [{
            breakpoint: sp_width,
            settings: {
                initialSlide: 0,
                slidesToShow: 1,
            },
        }, ]
    });







    slickr(".act_d_slide", {
        autoplay: false,
        variableWidth: true,
        centerMode: true,
        infinite: false,
    });



    teiki();

    (function loop() {
        odd++;

        wst = $(window).scrollTop();
        wh = window.innerHeight;

        window.requestAnimationFrame(loop);
        if (fonts_load) {
            fonts_load = 0;
            fonts_loaded();
        }
        if ($("body").hasClass("popup_on")) {
            popup_scroll();
        }
        //        pos_rot();
        acts_loop();

        d_cursor();
        a_cursor();
        d_scroll();
        slickh();
        if (odd % 5 == 0) {
            ons();
        }
        if (odd % 10 == 0) {
            teiki();
        }
    })();


    function acts_loop() {
        var act_d = Date.now();


        $('[sln="act__slide"]').each(function() {
            var act_sl_count = $(this).find(".slick-slide").length;
            var act_sl_now = $(this).find(".slick-active").attr("data-slick-index");

            var arr = [-2, -1, 0, 1, 2];


            for (const elem of arr) {
                var act_sl_now_e = parseInt(act_sl_now) + parseInt(elem);
                if (act_sl_now_e < 0) {
                    act_sl_now_e = act_sl_count + act_sl_now_e;
                }

                if (act_sl_now_e >= act_sl_count) {
                    act_sl_now_e = act_sl_now_e - act_sl_count;
                }
                $(this).find('[data-slick-index="' + act_sl_now_e + '"]').attr("actrot", elem).attr("actrot_d", act_d);

            }

            $(this).find(".slick-slide").not('[actrot_d="' + act_d + '"]').attr("actrot", "x");


        });

    }


    $(document).on('click', '.popup__opener,[popup]', function() {
        if ($(this).find(".popup__set").length) {
            $(".popup__box__content__in").html($(this).find(".popup__set").text());
            setTimeout(function() {
                $("body").addClass("popup_on");
            }, 100);

        } else if ($(this).next().hasClass("popup__set")) {
            $(".popup__box__content__in").html($(this).next().text());
            $("body").addClass("popup_on");

        }

    });
    $(window).keyup(function(e) {
        if (e.keyCode == 27) {
            $("body").removeClass("popup_on");
        }
    });



    $(document).on('click', '.popup__box__close,.popup__bg', function() {
        $("body").removeClass("popup_on");
    });

    $(document).on('click', '.headbar__close', function() {
        $(".headbar").addClass("headbar_closed");
    });


    $(document).on('click', '.wide_toggle .wide_button', function() {
        $(this).toggleClass("wide_button__on");
        $(this).addClass("wide_button_ckd");
    });


    $(document).on('mouseleave', '.wide_toggle .wide_button', function() {
        $(this).removeClass("wide_button_ckd");
    });

    $(document).on('click', '.wide_toggle_only .wide_button', function() {
        if ($(this).hasClass("wide_button__on")) {
            $(".wide_toggle_only").find(".wide_button__on").removeClass("wide_button__on");
        } else {
            $(".wide_toggle_only").find(".wide_button__on").removeClass("wide_button__on");
            $(this).addClass("wide_button__on");
            $(this).addClass("wide_button_ckd");
        }
    });


    $(document).on('mouseleave', '.wide_toggle_only .wide_button', function() {
        $(this).removeClass("wide_button_ckd");
    });



    $(document).on('click', '.sdgs__load__button', function() {
        $(".sdgs__list__box__toload").removeClass("sdgs__list__box__toload");
        $(".sdgs__load").remove();
    });



    $(document).on('click', '.box_select__opener', function() {
        $(this).parent().toggleClass("box_select__open");
        if ($(this).parent().hasClass("box_select__open")) {

        } else {
            b_s_sort();




        }

    });



    $(document).on('click', '.box_select__block', function() {
        if ($(this).hasClass("box_select__block__selected")) {
            $(this).removeClass("box_select__block__selected");
        } else {

            $(this).parent().find("div").removeClass("box_select__block__selected");
            $(this).addClass("box_select__block__selected");
        }
        $(this).parent().parent().removeClass("box_select__open");

        b_s_sort();


    });



    function b_s_sort() {

        if ($(".box_select__block__selected").length > 0) {

            if (ajax_p["brand"] != $(".box_select__block__selected").attr("brandsort")) {
                ajax_p["brand"] = $(".box_select__block__selected").attr("brandsort")
                ajax_p["pd"] = 1;

                post_ajax();
            }
        } else {

            if (ajax_p["brand"] != $(".box_select__block__selected").attr("brandsort")) {
                delete ajax_p["brand"];
                ajax_p["pd"] = 1;

                post_ajax();
            }

        }


    }

    $(document).on('click', '.menu_button', function() {
        $("body").toggleClass("mainmenu_open");
    });
    $(document).on('click', '.footer__brands__head', function() {
        $(this).parent().toggleClass("maxopen");
    });
    $(document).on('click', '.mainmenu__langr__opener', function() {
        $(".mainmenu__langr").toggleClass("mainmenu__langr__open");
    });

    $("#toppage").mousemove(function() {
        n_x = event.clientX;
        n_y = event.clientY;
    });

    $(document).on('mouseenter', '.destinations__slide', function() {
        $(".d_cursor").addClass("d_cursor_on");
    });

    $(document).on('mouseleave', '.destinations__slide', function() {
        $(".d_cursor").removeClass("d_cursor_on");
    });


    $(document).on('mouseenter', '[brands_photor]', function() {
        $("[brands_photo]").attr("brands_photo", $(this).attr("brands_photor"));
    });


    $(document).on('click', '.brands__set__cont__slide__nav', function() {
        if ($(this).hasClass("brands__set__cont__slide__nav_2")) {
            $("[sln='" + $(this).attr("slt") + "']").slick("slickNext");
        } else {
            $("[sln='" + $(this).attr("slt") + "']").slick("slickPrev");
        }
    });



    $(document).on('click', '.controls__left[slt],.controls__right[slt]', function() {
        if ($(this).hasClass("controls__right")) {
            $("[sln='" + $(this).attr("slt") + "']").slick("slickNext");
            his_c_move(1);
        } else {
            $("[sln='" + $(this).attr("slt") + "']").slick("slickPrev");
            his_c_move(-1);
        }
    });
    $(document).on('click', '.slide_navr', function() {
        if ($(this).offset().left > window.innerWidth / 2) {
            $("[sln='" + $(this).attr("slt") + "']").slick("slickNext");
        } else {
            $("[sln='" + $(this).attr("slt") + "']").slick("slickPrev");
        }
    });




    if ($("#toppage").length) {
        toppage();
    }

});

//common
var loadclass_c = 1;

function loadclass() {
    $("html").addClass("ld_" + loadclass_c);
    loadclass_c++;
    if (loadclass_c <= 1) { //1-
        setTimeout(loadclass, 200);
    }
}

function fonts_loaded() {
    loadclass();
    setTimeout(a_style, 100);
    setTimeout(b_style, 1000);




    setTimeout(function() {
        $("html").addClass("ld_c");
    }, 2000);




    if ($("#toppage").length) {


        setTimeout(function() {
            $("html").addClass("ld_end");
        }, 3000);


    } else {
        a_style();
        b_style();

        setTimeout(function() {
            $("html").addClass("ld_end");
        }, 300);
    }



}

function a_style() {
    $("[a_style]").each(function() {
        $(this).attr("style", $(this).attr("a_style"));
        $(this).removeAttr("a_style");
    });
    $("[a_src]").each(function() {
        $(this).attr("src", $(this).attr("a_src"));
        $(this).removeAttr("a_src");
    });
}

function b_style() {
    $("[b_style]").each(function() {
        $(this).attr("style", $(this).attr("b_style"));
        $(this).removeAttr("b_style");
    });
    $("[b_src]").each(function() {
        $(this).attr("src", $(this).attr("b_src"));
        $(this).removeAttr("b_src");
    });
}

function ons() {




    if (wst + wh + 20 > $("html").height() || wst < 100) {
        $("html").addClass("scroll_end");
    } else {
        $("html").removeClass("scroll_end");
    }

    var sc_margin = -10;
    if (wst > 100) {
        $("body").removeClass("noscroll");
    }

    if (wst > 5) {
        $("html").addClass("scrolled");
    }

    if (0) {
        $(".c_pad").each(function() {
            $(this).css("height", ($(this).parent().outerHeight() - $(this).next().innerHeight()) / 2 + "px");
        });

        $("#toppage .wrapper").css("max-height", (window.innerHeight - parseInt($("#toppage .header").css("height"))) + "px");
    }

    $(".ons,.once").each(function() {
        if ($(this).offset().top < wst + wh && $(this).offset().top + sc_margin + $(this).height() + sc_margin > wst && !$("body").hasClass("loading")) {
            $(this).addClass("onscreen");
            $(this).find("*").addClass("onscreen");
        } else {
            if ($(this).hasClass("ons")) {
                $(this).removeClass("onscreen");
                $(this).find("*").removeClass("onscreen");
            }
        }
    });
}


function zero(NUM, LEN) {
    return (Array(LEN).join('0') + NUM).slice(-LEN);
}


function pos_rot() {
    var ww = window.innerWidth;



    $(".pos_rot").each(function() {
        var pr_p = $(this).offset().left;
        pr_p += $(this).width() / 2;
        pr_p -= ww / 2;
        //pr_p = Math.ceil(pr_p);

        var pr_z = 10;
        if (pr_p < -90) {
            pr_z = 11;
        }
        if (pr_p > 90) {
            pr_z = 9;
        }
        var pr_mab = Math.abs(pr_p);
        var pr_o = 10 - pr_mab / 100;
        if (pr_o > 0) {
            if (sp_width < ww) {
                if (pr_p < 0) {
                    $(this).children().css({
                        "rotate3d": '2,-0.5,1,' + (50 * pr_mab / 550) + 'deg',
                        "scale": 1 - pr_mab / 10000,
                        "y": pr_p * -0.5 + "px",
                        "x": pr_p * 0.05 + "px",
                        "opacity": pr_o
                    });
                } else {
                    $(this).children().css({
                        "rotate3d": '2,-0.5,1,' + (50 * pr_mab / 550) + 'deg',
                        "scale": 1 - pr_mab / 10000,
                        "y": pr_p * -1.1 + "px",
                        "x": pr_p * -0.2 + "px",
                        "opacity": pr_o
                    });
                }
            } else {
                if (pr_p < 0) {
                    $(this).children().css({
                        "rotate3d": '2,-0.5,1,' + (50 * pr_mab / 450) + 'deg',
                        "scale": 1 - pr_mab / 10000,
                        "y": pr_p * -1.1 + "px",
                        "x": pr_p * -0.17 + "px",
                        "opacity": pr_o
                    });
                } else {
                    $(this).children().css({
                        "rotate3d": '2,-0.5,1,' + (50 * pr_mab / 250) + 'deg',
                        "scale": 1 - pr_mab / 10000,
                        "y": pr_p * -1.2 + "px",
                        "x": pr_p * -0.6 + "px",
                        "opacity": pr_o
                    });
                }

            }

        } else {
            $(this).children().css({
                "opacity": pr_o
            });
        }


        if (pr_o < 0) {
            $(this).css({
                "pointer-events": "none",
                "overflow": "hidden"
            });
        } else {

            $(this).css({
                "pointer-events": "auto",
                "overflow": "visible"
            });
        }
        $(this).parent().css({
            "position": "relative",
            "z-index": pr_z
        });
    });


}






//top

function slickr(ele, sset) {
    if ($(ele).length) {

        $(ele).on('mousedown touchstart touchmove swipe', function() {
            $(".slide_bar[slt='" + $(this).attr("sln") + "']").addClass("slide_bar_reset");
        });
        $(ele).on('mouseup touchend', function() {
            $(".slide_bar[slt='" + $(this).attr("sln") + "']").removeClass("slide_bar_reset");
            if ($(this).slick('slickGetOption', 'autoplay')) {
                $(this).slick('slickPlay');
            }

        });
        $(ele).on('init afterChange', function(event, slick, currentSlide, nextSlide) {

            if ($(this).attr("sln") == "destinations__slide") {
                var n_d_area = $(this).find(".slick-active").find("[d_area]").attr("d_area");
                var n_d_href = $(this).find(".slick-active").find("a").attr("href");
                $(".destinations__foot__link").attr("href", n_d_href);

                $(".destinations__foot__text__span").text(n_d_area);
                $(".destinations__foot__text").removeClass("destinations__foot__text__move");
            }

            if ($(this).attr("sln") == "history__mc__slide") {
                his_set(currentSlide + 1);
            }

            $(".slide_bar[slt='" + $(this).attr("sln") + "']").addClass("slide_bar_reset");
            setTimeout(function(thi) {
                $(".slide_bar[slt='" + $(thi).attr("sln") + "']").removeClass("slide_bar_reset");
            }, 300, this);


            if (!currentSlide) { currentSlide = 0; }
            currentSlide++;
            if ($(this).attr("sln") == "act__slide") {
                var currentSlided = currentSlide;
                if (currentSlided > slick.slideCount / 2) {
                    currentSlided = currentSlided - slick.slideCount / 2;
                }
                $(".controls__count__in[slt='" + $(this).attr("sln") + "']").text(zero(currentSlided, 2) + "/" + zero(slick.slideCount / 2, 2));
            } else {
                $(".controls__count__in[slt='" + $(this).attr("sln") + "']").text(zero(currentSlide, 2) + "/" + zero(slick.slideCount, 2));
            }
        });
        $(ele).on('beforeChange', function(event, slick, currentSlide, nextSlide) {


            if ($(this).attr("sln") == "destinations__slide") {

                $(".destinations__foot__text").addClass("destinations__foot__text__move");

                setTimeout(function() {
                    var n_d_area = $("[sln='destinations__slide']").find(".slick-active").find("[d_area]").attr("d_area");
                    var n_d_href = $("[sln='destinations__slide']").find(".slick-active").find("a").attr("href");
                    $(".destinations__foot__text__span").text(n_d_area);
                    $(".destinations__foot__link").attr("href", n_d_href);
                    $(".destinations__foot__text").removeClass("destinations__foot__text__move");
                }, 200);


            }



            if ($(this).attr("sln") == "history__mc__slide") {
                his_check();
            }


            $(".slide_bar[slt='" + $(this).attr("sln") + "']").addClass("slide_bar_reset");
            $(this).removeClass("slick-moving");
            $(this).addClass("slick-moving2");
            setTimeout(function(thi) {
                $(thi).addClass("slick-moving");
                $(thi).removeClass("slick-moving2");
            }, 300, this);




            if (!nextSlide) { nextSlide = 0; }
            nextSlide++;


            if ($(this).attr("sln") == "act__slide") {
                var currentSlided = nextSlide;
                if (currentSlided > slick.slideCount / 2) {
                    currentSlided = currentSlided - slick.slideCount / 2;
                }
                $(".controls__count__in[slt='" + $(this).attr("sln") + "']").text(zero(currentSlided, 2) + "/" + zero(slick.slideCount / 2, 2));
            } else {
                $(".controls__count__in[slt='" + $(this).attr("sln") + "']").text(zero(nextSlide, 2) + "/" + zero(slick.slideCount, 2));
            }


            //            $(".controls__count__in[slt='" + $(this).attr("sln") + "']").text(zero(nextSlide, 2) + "/" + zero(slick.slideCount, 2));
        });
        var sdef = {
            arrows: false,
            autoplay: true,
            touchThreshold: 1,
            cssEase: 'cubic-bezier(0.400, 0.000, 0.000, 1.000)',
            cssEase: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)', //smipe
            autoplaySpeed: 3000,
            speed: 2200,
            speed: 1200,
            speed: 800,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            infinite: true,
            //            touchMove:false
        };
        Object.assign(sdef, sset);
        $(ele).slick(sdef);



        $(".slide_bar[slt='" + $(ele).attr("sln") + "']").css("transition-duration", $(ele).slick('slickGetOption', 'autoplaySpeed') + "ms");


if($(ele).hasClass("slick-double")){
        $(ele).find(".slick-track").clone().addClass("slick-track-2").appendTo($(ele).find(".slick-list"));//slickh
}

    }
}

function toppage() {


    $("body").addClass("noscroll");
    var top_ts = 0;
    var top_ts_moved = 0;
    window.addEventListener('touchstart', function(event) {
        var touchObject = event.changedTouches[0];
        top_ts = touchObject.pageY;
    });


    window.addEventListener('touchmove', function(event) {


        var touchObject = event.changedTouches[0];
        if (touchObject.pageY - top_ts < -10) {
            top_ts_moved = 1;
            $("html").addClass("scrolled");
        }

        if ($("body").hasClass("noscroll")) {
            event.preventDefault();
        }
    });


    window.addEventListener('touchend', function(event) {
        if ($("html").hasClass("scrolled")) {
            $("body").removeClass("noscroll");
        }
    });






    $('x.wrapper').bind('touchend', function() {
        $("html").addClass("scrolled");
        $("body").removeClass("noscroll");

    });

    window.addEventListener('wheel', ffscroll);

    function ffscroll() {

        if (event.wheelDelta < -10) {
            $("html").addClass("scrolled");

            setTimeout(function() {
                $("body").removeClass("noscroll");
            }, 1000);
        }

    }



    window.onmousewheel = function() {

        if (event.wheelDelta < -10) {
            $("html").addClass("scrolled");

            setTimeout(function() {
                $("body").removeClass("noscroll");
            }, 1000);
        }

    }









    $('.section').after('<div class="section__end"></div>');

    slickr(".fv__slide", { arrows: false });
    slickr(".destinations__slide", {
        speed: 2000,
    });
    slickr(".brands__slide", {
        variableWidth: true,
        centerMode: true,
        asNavFor: ".brands__logoslide",
    });
    slickr(".brands__logoslide", {
        autoplay: false,
        fade: true,
        swipe: false
    });

    //act__slide

    slickr(".news__slide", {
        autoplay: false,
        variableWidth: true,
        centerMode: true,
    });




}



var mper = 0.75;

function d_cursor() {
    if ($(".d_cursor").length) {
        m_x = m_x * mper + n_x * (1 - mper);
        m_y = m_y * mper + n_y * (1 - mper);
        $(".d_cursor").css("x", m_x).css("y", m_y);
    }
}

var mper2 = 0.75;

function a_cursor() {
    if ($(".awards__content__side").length) {

        m_x2 = m_x2 * mper2 + n_x2 * (1 - mper2);
        m_y2 = m_y2 * mper2 + n_y2 * (1 - mper2);
        $(".a_cursor").css("x", m_x2).css("y", m_y2);

        var wst = $(window).scrollTop();
        var nowy = 0;
        $(".awards__set__wrap").each(function() {
            if ($(this).offset().top < wst + 210) {
                nowy = $(this).attr("ywrap");
            }
        });
        if (nowy == 0) {
            nowy = $("[yselect]").eq(0).attr("yselect");
        }
        $("[yselect]:not([yselect='" + nowy + "'])").removeClass("nowyear");
        $("[yselect='" + nowy + "']").addClass("nowyear");
        var nowy_h = $(".nowyear").offset().top - $(".awards__content__side__year").offset().top;
        $(".awards__content__side__tri").css("y", nowy_h + "px");
    }



}

function teiki() {

    if (window.innerWidth < 1001) {
        $(".brands__set").each(function() {
            $(this).find(".brands__set__in").css("max-height", window.innerWidth * 0.85 * 0.584 + $(this).find(".brands__set__head").outerHeight());
            $(this).find(".brands__set__key").css("top", $(this).find(".brands__set__head").outerHeight() - 115);

        });
    } else {
        $(".brands__set").each(function() {
            if ($(this).find(".brands__set__in").attr("style")) {
                $(this).find(".brands__set__in").attr("style", $(this).find(".brands__set__in").attr("style").replace("max", "mx"));
                $(this).find(".brands__set__key").css("top", "0");

            }
        });
    }


    $(".single__oc iframe").each(function() {
        $(this).css("height", $(this).outerWidth() / 16 * 9 + "px");
    });


    $(".card_align").each(function() {
        if ($(this).hasClass("card_align_pc") && window.innerWidth <= sp_width) {
            $(this).find(".card").css("min-height", "unset");
        } else {
            var card_in_h = 0;
            $(this).find(".card_in").each(function() {
                if (card_in_h < $(this).outerHeight()) {
                    card_in_h = $(this).outerHeight();
                }
            });
            $(this).find(".card").css("min-height", card_in_h + "px");
        }


    });




    $(".section_aw").each(function() {
        if (window.innerWidth > sp_width) {
            $(this).css("padding-top", ($(".fv__texts").outerHeight() - 480) + "px");
        } else {
            $(this).css("padding-top", "0px");
        }
    });


    $(".cardheight").each(function() {
        var card_h = 0;
        $(this).find(".card").each(function() {
            if (parseInt($(this).height()) > card_h) {
                card_h = parseInt($(this).height());
            }
        });
        $(this).css("height", card_h + "px");
    });



    $(".sitemap__cont__set__line").each(function() {
        $(this).css("height", $(this).parent().parent().height());
    });


    $(".history__set").each(function() {
        var hstp = (window.innerHeight / 2 - $(this).outerHeight() / 2);
        if (hstp < -40) {
            hstp = -40;
        }
        $(this).css("top", hstp + "px");
    });

}




function set_form() {

    $(".error").each(function() {

        $(this).prependTo($(this).parent());


    });

    $(".contact__cont__set__input").each(function() {
        if ($(this).find(".error").length) {
            $(this).find("input,textarea").css("background-color", "#ffecec");
        } else {
            $(this).find("input,textarea").css("background-color", "#ffffff");
        }
    });

    if ($(".form__reason").find(".error").length) {
        $(".contact__cont__radio__set_1_cc").css("background", "#ffecec")
    }
    $('[formselecter="' + $(".form__reason").find("input").val() + '"]').addClass("formselecter_on");

    $(document).on('click', '[formselecter]', function() {
        $("[formselecter]").removeClass("formselecter_on");
        $(this).addClass("formselecter_on");
        $('input[name="reason"]').val($(this).attr("formselecter"));
    });

}

function p_wide_button() {

    $(".p_wide_button,#cn-accept-cookies").each(function() {
        if ($(this).attr("target") == "_blank") {
            $(this).after($(".for_p_wide_button__blank").html());
        } else {
            $(this).after($(".for_p_wide_button__def").html());
        }
        $(this).next().find(".wide_button__in").text($(this).text());
        $(this).next().attr("href", $(this).attr("href"));
        $(this).next().attr("target", $(this).attr("target"));
        $(this).remove();
    });

    $(".mw_wp_form_confirm").find(".contact__foot .wide_button__in").text("Send");
    $("[thislng='zh'] .mw_wp_form_confirm").find(".contact__foot .wide_button__in").text("å‘é€");
    $("[thislng='ch'] .mw_wp_form_confirm").find(".contact__foot .wide_button__in").text("å¯„å‡º");
    $("[thislng='kr'] .mw_wp_form_confirm").find(".contact__foot .wide_button__in").text("ë³´ë‚´ê¸°");


}


function def() {
    //    $('[href="/"]').attr("href", $('.header__logo').attr("href"));




    $("a[href]").each(function() {
        if ($(this).attr("href").charAt(0) == "/") {
            $(this).attr("href", $('.header__logo').attr("href") + $(this).attr("href").substr(1));
        }


        var thisherf = location.href;
        var thisherf2 = $(this).prop("href");
        if (thisherf.substr(-1) != "/") {
            thisherf += "/";
        }
        if (thisherf2.substr(-1) != "/") {
            thisherf2 += "/";
        }
        if (thisherf == thisherf2) {
            $(this).addClass("samelink");
        }


    });



    $(".foot_banner a").each(function() {

        if (location.href == $(this).prop("href")) {
            $(this).remove();
        }

        if ($(".foot_banner__about").length) {
            if ($(this).prop("href").indexOf('activities') != -1) {
                $(this).remove();
            }
        }


    });

    $(".foot_banner").each(function() {
        if ($(this).find("a")) {

        } else {
            $(this).remove();
        }
    });

    $(".wide_textwidth").find(".wide_button").each(function() {
        $(this).append('<div class="wide_button__in wide_button__txw">' + $(this).find(".wide_button__in").text() + '</div>');

    });


}

function set_brands() {

    $(document).on('click', '.brands__set__head__button', function() {
        $(this).parent().parent().parent().toggleClass("brands__set__open");
    });


    $(".brands__set").each(function() {
        var brands__set__cont__slide;
        $(this).find(".brands__set__cont__slide").each(function() {
            brands__set__cont__slide = '[sln="' + $(this).attr("sln") + '"]';
            slickr(brands__set__cont__slide, {
                autoplay: false,
                variableWidth: true,
                centerMode: true,
                asNavFor: '[sln="key__' + $(this).attr("sln") + '"]',
            });
        });

        $(this).find(".brands__set__key__photo__slide").each(function() {
            slickr('[sln="' + $(this).attr("sln") + '"]', {
                autoplay: false,
                asNavFor: brands__set__cont__slide,
            });
        });

    });


}

function set_arc_activities() {
    slickr('.arc_act__slide', {
        autoplay: false,
        asNavFor: '.arc_act__slide_i',
    });
    slickr('.arc_act__slide_i', {
        autoplay: false,
        fade: true,
        swipe: false,
    });


    slickr(".act__slide", {
        autoplay: false,
        variableWidth: true,
        centerMode: true,
        touchMove: false,
        swipeToSlide: true,
        swipe: false,

        //test
        variableWidth: false,
        fade: true,
        speed: 0
    });


    $(document).on('click', '.arc_act__find__box__head', function() {
        $(this).parent().toggleClass("arc_act__find__box__open");
    });


}

function set_sitemap() {}



function popup_scroll() {

    var poc_h = $(".popup__box__content").outerHeight();
    var poci_h = $(".popup__box__content__in").outerHeight();
    var poc_s = $(".popup__box__content").scrollTop();
    var poc_size = poc_h / poci_h;
    var poc_scroll = poc_s / (poci_h - poc_h);


    $(".popup__box__scroll__bar").css("height", poc_size * 100 + "%");
    $(".popup__box__scroll__bar").css("top", poc_scroll * (1 - poc_size) * 100 + "%");
    if (poc_size > 1) {
        $(".popup__box__scroll__bar").css("opacity", 0);
    } else {
        $(".popup__box__scroll__bar").css("opacity", 1);
    }

}



function set_policy() {

    $(".policy__content h3").each(function() {
        h3p($(this));
    });

    $(".policy__content h2").each(function() {
        if ($(this).find("span").length) {
            $(this).addClass("h2span");
        }
    });
}

function h3p(nel) {
    if (nel.next().prop("tagName") == "p" || nel.next().prop("tagName") == "P") {

        nel.next().addClass("h3p");
        h3p(nel.next());
    }
}

function set_awards() {

    $(document).on('click', '.awards__set__opener', function() {
        $(this).toggleClass("awards__set__opened");
    });


    $("#awards_page").mousemove(function() {
        n_x2 = event.clientX;
        n_y2 = event.clientY;
    });


    $(document).on('mouseenter', '.awards__set', function() {
        $(".a_cursor").css("background-image", "url('" + $(this).find(".awards__set__photo").attr("src") + "')");
    });


    $(document).on('mouseenter', '.awards__content_m', function() {
        $(".a_cursor").css("opacity", 1);
    });

    $(document).on('mouseleave', '.awards__content_m', function() {
        $(".a_cursor").css("opacity", 0);
    });

    $(document).on('click', '[yselect]', function() {
        let speed = 300;
        let href = $("[ywrap='" + $(this).attr("yselect") + "']");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top - 279 + 70;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
    });

}

function set_cookie() {
    $(document).on('click', '.cookie__close', function() { //.cookie .wide_button,
        $("body").addClass("cookie__hide");
    });
}


var his_movable = 1;
var his_movable2 = 1;

function set_history() {
    if ($("#history_yt").length) {

        $(document).on('mouseenter', '.history__set__in__scroll', function() {
            $("html").addClass("history__scroller");
        });

        $(document).on('mouseleave', '.history__set__in__scroll', function() {
            $("html").removeClass("history__scroller");
        });





        $(".history__set__in__scroll").mousewheel(function(eo, delta, deltaX, deltaY) {

            if (his_movable) {
                his_movable = 0;

                setTimeout(function() {
                    his_movable = 1;
                }, 1200);



                if (delta < 0) {
                    $("html").attr("history__scroll", "down");
                    his_c_move(1);
                    $("[sln='history__mc__slide']").slick("slickNext");
                } else {
                    $("html").attr("history__scroll", "up");
                    his_c_move(-1);
                    $("[sln='history__mc__slide']").slick("slickPrev");
                }

            }
        });


        const ytiframe = 'history_yt';
        const targetWindow = document.getElementById(ytiframe).contentWindow;


        const ag2ytControl = function(action, arg = null) {
            targetWindow.postMessage('{"event":"command", "func":"' + action + '", "args":' + arg + '}', '*');
        };



        $(document).on('click', '.history__mov__thumb', function() {
            $(this).addClass("history__mov__button__hide");
            ag2ytControl('playVideo');
        });


        $("[bar__point]").eq(0).addClass("bar__point__mem");
        //        $("[bar__point]").last().addClass("bar__point__mem");

        $("[bar__point]").each(function() {
            var np_f = $("[bar__point]").eq(0).attr("bar__point");
            var np_l = $("[bar__point]").last().attr("bar__point");
            var np_t = $(this).attr("bar__point");
            var np_range = np_l - np_f;

            $(this).css("left", ((np_t - np_f) / np_range) * 100 + "%");
            $(this).attr("leftp", ((np_t - np_f) / np_range) * 100 + "%");


        });
        $(document).on('click', '[bar__point]', function() {
            his_move($(this).attr("np_c"));

        });

        $(document).on('click', 'x.hs_controls', function() {
            var np_move = 0;
            if ($(this).hasClass("controls__right")) {
                np_move = parseInt($("[np_count]").attr("np_count")) + 1;
            } else {
                np_move = parseInt($("[np_count]").attr("np_count")) - 1;
            }
            if (np_move < 1) {
                np_move = $("[np_to]").last().attr("np_to");
            }


            if (np_move > $("[np_to]").last().attr("np_to")) {
                np_move = 1;
            }
            his_move(np_move);
        });
    }
}


function h_range() {
    var np_countr = 1;
    var np_end = 1;
    $("[np_to]").each(function() {
        if (window.innerWidth > sp_width) {
            if ($(this).offset().top < $(".history__content").offset().top + $(".history__content").height() - 10) {
                np_countr = $(this).attr("np_to");
            }
        } else {
            if ($(this).offset().top < wst + wh) {
                np_countr = $(this).attr("np_to");
            }
        }
        np_end = $(this).attr("np_to");

    });

    //    $("[np_count]").attr("np_count", np_countr);
    if (np_countr == 1) {
        $("html").attr("np_pos", "first");
    } else if (np_countr == np_end) {
        $("html").attr("np_pos", "last");
    } else {
        $("html").attr("np_pos", "other");
    }

    if (0) {
        $(".history__set__in__bar__tri").css("left", $(".history__set__in__bar__point[np_c='" + np_countr + "']").css("left"));
        if (window.innerWidth < sp_width) {
            $(".history__set__in__bar").css("x", parseFloat($(".history__set__in__bar__point[np_c='" + np_countr + "']").attr("leftp")) * -1 + "%");
        } else {
            $(".history__set__in__bar").css("x", 0);
        }

    }

}


function his_c_move(his_vec) {


    if (his_movable2) {
        his_movable2 = 0;

        setTimeout(function() {
            his_movable2 = 1;
        }, 1200);


        if ($("#history_yt").length) {
            var histo = 1;
            if (his_vec > 0) {
                histo = parseInt($("[np_count]").attr("np_count")) + 1;
            } else {
                histo = parseInt($("[np_count]").attr("np_count")) - 1;
            }

            console.log(histo);

            var np_x = $("[np_x]").attr("np_x");
            if (histo < 1) {
                histo = np_x;
            } else if (histo > parseInt(np_x)) {
                histo = 1;
            }

            his_set(histo);
        }
    }
}

function his_move(np_move) {
    $("[sln='history__mc__slide']").slick("slickGoTo", np_move - 1);
    his_set(np_move);

}

function his_set(his_n) {
    if (isNaN(his_n)) {
        his_n = 1;
    }
    $("[np_count]").attr("np_count", his_n);
    his_check();
}

function his_check() {
    var np_countr = $("[np_count]").attr("np_count");
    $(".history__set__in__bar__tri").css("left", $(".history__set__in__bar__point[np_c='" + np_countr + "']").css("left"));
    if (window.innerWidth < sp_width) {
        $(".history__set__in__bar").css("x", parseFloat($(".history__set__in__bar__point[np_c='" + np_countr + "']").attr("leftp")) * -1 + "%");
    } else {
        $(".history__set__in__bar").css("x", 0);
    }
}

function set_special() {

    $(document).on('click', '.special__content__more .wide_button', function() {
        $(".special").addClass("special__show");
    });


}

function set_hotels() {


    $(document).on('click', '.hotels__sort .wide_button', function() {

        setTimeout(function() {
            hotel_sort();
        }, 100);

    });

    $(".hotels__section__cont .card").addClass("hotelcard_on");
    $(document).on('click', '.hotels__sort__opener', function() {
        $(".hotels__sort").toggleClass("hotels__sort__open");
    });

    $(document).on('click', '[totab]', function() {

        if ($("[sorttab]").attr("sorttab") == $(this).attr("totab")) {

        } else {
            $(".wide_toggle_only").find(".wide_button__on").removeClass("wide_button__on");

        }

        $("[sorttab]").attr("sorttab", $(this).attr("totab"));
        $(".hotels__sort").addClass("hotels__sort__open");
        hotel_sort();

    });

    $(document).on('click', '.hotels__section__more .wide_button', function() {
        $(this).parent().parent().addClass("hotels__section__mored");
    });

    setTimeout(function() {
        hotel_slickr();
    }, 100);

}

function hotel_sort() {
    $(".hotels__section__mored").removeClass("hotels__section__mored");

    $(".hotels__section__cont.pc .card").removeClass("hotelcard_on");


    if ($(".wide_button__on").length) {

        $(".hotels__section__cont.pc .termclass_" + $(".wide_button__on").attr("param")).addClass("hotelcard_on");

        let speed = 300;
        let href = $(".hotels__total").eq(0);
        let target = $(href == "#" || href == "" ? 'html' : href);
        if (sp_width < window.innerWidth) {
            var position = target.offset().top + target.outerHeight();
        } else {
            var position = target.offset().top + target.outerHeight() - $(".header").outerHeight() + 2;
        }
        $("html, body").animate({ scrollTop: position }, speed, "swing");

        $("html").attr("scroll_d", "down");

    } else {
        $(".hotels__section__cont.pc .card").addClass("hotelcard_on");
    }


    //hotel__count


    $("[hotelcard_index]").attr("hotelcard_index", -1);
    $(".hotels__section__cont.pc ").each(function() {
        $(this).find(".hotelcard_on").each(function(index) {
            $(this).attr("hotelcard_index", index);
        });

    });


    //end hotel__count


    hotel_slickr();
}

function hotel_slickr() {



    $(".hotels__section").each(function() {

        $(this).find(".hotels__section__head__count__num").text($(this).find(".hotels__section__cont.pc .hotelcard_on").length);
        if ($(this).find(".hotels__section__cont.pc .hotelcard_on").length < 3) {
            $(this).addClass("hotels__section__mored");
        }


        if ($(this).find(".hotels__section__cont.pc .hotelcard_on").length) {
            $(this).removeClass("hotels__section_zero");
        } else {
            $(this).addClass("hotels__section_zero");
        }

    });



    $(".hotels__section").removeClass("hotels__section_odd");

    $(".hotels__section").not(".hotels__section_zero").each(function(index) {
        if (index % 2 == 0) {
            $(this).addClass("hotels__section_odd");

        }


    });






    $(".hotels__total__num").text($(".hotels__section__cont.pc .hotelcard_on").length);








    $(".hotels__section").each(function() {

        if ($(this).find('.hotels__section__slide').length) {
            $(this).find('.hotels__section__slide').slick('unslick');
            $(this).find('.hotels__section__slide').remove();
        }

        $(this).find('.hotels__section__slide__wrap').append('<div class="hotels__section__slide" sln="hotels__section__slide__' + $(this).attr("hot_count") + '"></div>');
        $(this).find('.hotels__section__slide').append($(this).find(".hotels__section__cont").find(".hotelcard_on").clone());
        slickr('[sln="hotels__section__slide__' + $(this).attr("hot_count") + '"]', {
            autoplay: false,
            variableWidth: true,
            centerMode: true,
            infinite: true,
            centerPadding: "0px",
        });


    });


}

function set_dev() {
    slickr('.dev__set__slide', {
        autoplay: false,
        infinite: true,
    });
    var d_year = 0;
    $("[d_year]").each(function() {
        if (parseInt($(this).attr("d_year")) != d_year) {
            d_year = parseInt($(this).attr("d_year"));
            $(".dev__content__side__stick").append('<div class="dev__content__side__year" d_yselect="' + d_year + '">' + d_year + '</div>');
        }
    });



    $(document).on('click', '[d_yselect]', function() {
        let speed = 300;
        let href = $("[d_year='" + $(this).attr("d_yselect") + "']").eq(0);
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top - 279 + 70;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
    });



}







function d_scroll() {
    if ($(".dev__content__side__stick").length) {
        wst = $(window).scrollTop();
        var nowy = 0;
        $("[d_year]").each(function() {
            if ($(this).offset().top < wst + 210) {
                nowy = $(this).attr("d_year");
            }
        });
        if (nowy == 0) {
            nowy = $("[d_yselect]").eq(0).attr("d_yselect");
        }
        $("[d_yselect]:not([d_yselect='" + nowy + "'])").removeClass("nowyear");
        $("[d_yselect='" + nowy + "']").addClass("nowyear");
        var nowy_h = $(".nowyear").offset().top - $(".dev__content__side__year").offset().top;
        $(".dev__content__side__tri").css("y", nowy_h + "px");
    }



}



function set_ajax() {


    $(document).on('change', ".query_s", function() {
        ajax_p["s"] = $(this).val();
        setTimeout(function() {
            ajax_p["pd"] = 1;
            post_ajax();
        }, 100);
    });

    $(document).on('click', ".c_news__head .wide_button", function() {
        setTimeout(function() {
            c_news__head__check();
        }, 100);
    });

    function c_news__head__check() {

        var c_news_tag = "";
        $(".c_news__head .wide_button.wide_button__on").each(function() {
            c_news_tag = c_news_tag + "_" + $(this).attr("param");
        });
        ajax_p["tag"] = c_news_tag;
        ajax_p["pd"] = 1;
        post_ajax();
    }

    $(document).on('click', "[navx]", function() {
        ajax_p["pd"] = $(this).attr("navx");
        post_ajax();
    });





    $(document).on('click', ".arc_act__find__box__cont__search .wide_button", function() {
        arc_sort_check();
    });




    function arc_sort_check() {

        $("[arc_sort]").each(function() {
            if ($(this).find(".wide_button__on").length) {
                var arc_tags = "";
                $(this).find(".wide_button__on").each(function() {
                    arc_tags = arc_tags + "_" + $(this).attr("param");
                });
                ajax_p["arc_" + $(this).attr("arc_sort")] = arc_tags;
            } else {
                delete ajax_p["arc_" + $(this).attr("arc_sort")];
            }

        });
        ajax_p["pd"] = 1;
        post_ajax();
    }




}



function post_ajax() {

    var ajax_q = "?ajax=ajax";
    $("body").addClass("ajaxloading");
    console.log(ajax_p);
    Object.keys(ajax_p).forEach(function(value) {
        console.log(value + 'ï¼š' + this[value]);
        ajax_q = ajax_q + "&" + value + "=" + this[value];
    }, ajax_p);



    var pal = ajax_q;
    console.log(pal);

    $.ajax({
        url: pal,
        type: 'GET',
        cache: false,
        dataType: 'html'
    }).done(function(html) {
        $(html).find('[ajaxarea]').each(function() {
            console.log('[ajaxarea="' + $(this).attr("ajaxarea") + '"]');

            $("[ajaxarea='" + $(this).attr("ajaxarea") + "']").html($(this).html());
            a_style();
            b_style();


            setTimeout(function() {
                $("body").removeClass("ajaxloading");
            }, 200);


        });

    }).fail(function() {
        alert('ã‚¨ãƒ©ãƒ¼ãŒèµ·ãã¾ã—ãŸ');
    }).always(function() {
        console.log('complete');
    });




}




function set_history_mc() {

    slickr(".history__mc__slide", {
        fade: true,
        autoplay: false,
        speed: 500,
    });


}


function slickh2(){


    $(".slick-track-2").each(function() {
        var cst =  $(this).parent().find(".slick-track").not(".slick-track-2").css("transform");
        var csts = cst;
        cst = cst.split(',');
$(this).css("x",cst[4]+"px");
    });   
}


function slickh(){


    $(".slick-track-2").each(function() {
        var cst =  $(this).parent().find(".slick-track").not(".slick-track-2").offset().left;
$(this).css("left",cst+"px");
    });   
}