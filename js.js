jQuery(document).ready(function($) {


    var settings = {
        "selectedColor": "",
        "selectedPath": ""
    }

    var COLOUR = function() {
        this.init();
    };

    COLOUR.prototype.init = function() {
        this.detectSvg();
        this.detectColor();
    };

    COLOUR.prototype.detectSvg = function() {
        var svg = document.getElementsByTagName("svg")[0],
            bbox = svg.getBBox(),
            viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" "),
            path = $(svg).find('path');

        svg.setAttribute("viewBox", viewBox);

        $(svg).promise().done(function(e) {
            COLOUR.prototype.detectSvgPath(path);
        });
    };

    COLOUR.prototype.detectSvgPath = function(path) {
        $.each(path, function(i, ele) {
        	$(ele).addClass('path' + i);
            $(ele).on('click', function(event) {
                $(ele).toggleClass("selected").siblings().removeClass("selected");
                $('.selected').css("fill", settings.selectedColor);
            })
        });
    };

    COLOUR.prototype.detectColor = function(path) {
        var colors = $("#color_balet").find("span");

        $.each(colors, function(i, ele) {
            $(ele).on('click', function(event) {
                settings.selectedColor = $(ele).data().color;
            });
        });
    };

    $.fn.COLOR = function() {
        return new COLOUR();
    }

    $(document).COLOR();
});