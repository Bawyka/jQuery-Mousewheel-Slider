$(document).ready(function () {

    // решения для ИЕ
    if ($.browser.msie) {
        // видимая полоса прокрутки
        $('body').css('overflow-y', 'scroll');
        // удаляем изинги
        $('#ease').remove();


        // массив якорей
        var ids = new Array("jak1", "jak2", "jak3", "jak4");
        i = 0;
        rabotaj = true;

        // в каждой ссылке есть якорь
        function goToByScroll(id) {
            $('html,body').animate({
                scrollTop: $("#" + id).offset().top
            }, "fast");
        }

        var tempScrollTop = 0;
        var currentScrollTop = 0;
        var way = "default";

        function updatePosition() {
            i++;
            alert(1);
        }

        var throttled = _.throttle(updatePosition, 100);

        window.scroll(throttled);

        /*		
		$(window).scroll(function()
		{
			
			currentScrollTop = $(window).scrollTop();
				
			if (tempScrollTop < currentScrollTop)
			{ 
				way = "down";
			} 
			else if (tempScrollTop > currentScrollTop)
			{
				way = "up";
			}

			tempScrollTop = currentScrollTop;
				
			window.setTimeout(function(){
			
			(way=="down")?i++:i--;
			
			if (i>=4) { --i; }
			if (i<0) { ++i; }
			
			goToByScroll(ids[i]);
			
			},1000);
			
		});
		
		*/
    }

    // решение для телефонов
    /*
  var r_ = /iphone|android|blackberry|webos/i;

    if (r_.test(navigator.userAgent))
	{

        $('body').css('overflow-y','scroll'); 

        $('#ease').remove();

        function goToByScroll(id)
		{  
			$('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');  
        } 
    //  goToByScroll("jak2");
    }
	*/

    // resize solution
    $(window).resize(function () {
        var _height = $('#slider').children().height();
        _curIndx = $('#slider').find('.current').index();
        $('#slider').css('top', -_height * _curIndx);
    });

    $('.cleaner').height($('#icons').height());
    $('#slider li img').css('margin-top', -$('.cleaner').height());
    $('#slider li:first-child').addClass('current');

    var current = 0;
    _length = $('#slider').children().length;
    start = true;
    $slider = $('#slider');
    _scroll = true;

    var mercedes = new Array('Mercedes C-klasse W203 (Мерседес Ц-класса)', 'Mercedes C-klasse W204 (Мерседес Ц-класса)', 'Mercedes GL-klasse (Мерседес ГЛ-класса)', 'Mercedes-Benz CL-class');

    $('#icons h3').html(mercedes[0]);

    $(window).bind('mousewheel', function (event, delta) {

        if (_scroll) {

            // var $slider = $(this); // слайдер
            var _height = $slider.children().height() * $slider.children().length; // высота всего слайдера  
            var _edge = _height - $slider.children().height(); // нижняя граница
            var _top = parseInt($slider.css('top')); // отступ от верхнего края
            var _h = $slider.children().height(); // высота 1 item

            ease = $('#ease').val();

            // слайд
            function _slide() {
                var dir = delta < 0 ? '-' : '+';
                $slider.animate({
                    top: dir + '=' + _h
                }, 1000, ease, function () {
                    _scroll = true;
                });
            }

            $slider.find('li').removeClass('current');

            delta > 0 ? --current : ++current;

            start = true;

            if (current < 0) {
                ++current;
                start = false;
            }

            if (current >= _length) {
                --current;
                start = false;
            }

            if (start) {
                $('#content').effect('highlight', 'slow');
                _slide();
                _scroll = false;
            }

            $('#icons h3').html(mercedes[current]);

            $slider.find('li:eq(' + current + ')').addClass('current');

        } else {

            _scroll = false;

        }

    });

});