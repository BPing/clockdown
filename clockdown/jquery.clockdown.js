/**
 * countdown倒计时插件
 * @author cBping
 *
 *
 */

(function ($) {

    $.fn.clockdown = function (options) {

        /**
         * deal time(s) to day`hour`minutes`second
         *
         * @param    number    The name of time unit（s）
         * @return   object    {day hour minutes second}
         */
        function dealTime(t) {

            var nDay = 0;
            var nHour = 0;
            var nMinutes = 0;
            var nSecond = 0;

            if (typeof t === "number" && t > 0) {

//                 nDay = Math.floor(t / (1000 * 60 * 60 * 24));
//                 nHour = Math.floor(t / (1000 * 60 * 60)) % 24;
//                 nMinutes = Math.floor(t / (1000 * 60)) % 60;
//                 nSecond = Math.floor(t / 1000) % 60;
                nDay = Math.floor(t / ( 60 * 60 * 24));
                nHour = Math.floor(t / ( 60 * 60)) % 24;
                nMinutes = Math.floor(t / (60)) % 60;
                nSecond = Math.floor(t) % 60;

                //  console.log(t,nDay,nHour,nMinutes,nSecond);
            }

            return {
                day: nDay,
                hour: nHour,
                minutes: nMinutes,
                second: nSecond
            }
        };

        function Check(t) {
            if (typeof opt.time !== "number") {
                return false;
            }
            return true;
        };

        /**
         * 计时句柄
         */
        var timer = null;
        var Parent = this;
        var opt = $.extend($.fn.clockdown.defaultsConfig, options);
        log(opt);

        /**
         * Log a string into the console if it exists
         *
         * @param    string    The name of the option
         * @return    mixed
         */

        function log(str) {
            if (window.console && console.log) {
                console.log(str);
            }
        }


        var Method = {

            start: function () {

                return Parent.each(function () {

                    clearInterval(timer);

                    var selObject = $(this);//获取当前对象

                    selObject.removeClass("timerbg");
                    selObject.addClass("timerbg");

                    var h = "<div><strong class='day'>0</strong>天<strong class='hour'>0</strong>时<strong class='minutes'>0</strong>分<strong class='second'>0</strong>秒</div>"

                    selObject.html("");
                    selObject.html(h);


                    function down() {
                        //log(opt.time);
                        if (typeof opt.time === "number" && opt.time > 0) {
                            var time = dealTime(opt.time);
                            // log(time);
                            selObject.find(".day").text(time.day);
                            selObject.find(".hour").text(time.hour);
                            selObject.find(".minutes").text(time.minutes);
                            selObject.find(".second").text(time.second);
                        }

                        if (typeof opt.time === "number" && opt.time <= 0) {
                            clearInterval(timer);
                            selObject.find(".second").text("0");
                            if (typeof opt.callback.end === "function") opt.callback.end();
                        }
                        opt.time--;
                    }

                    if (typeof opt.callback.start === "function") opt.callback.start();
                    timer = setInterval(down, 1000);


                });
            },
            setTime: function (argtime) {
                if (argtime != null && argtime > 0) {
                    opt = $.extend(opt, {time: argtime});
                }
                return Method;
            },
            setStartCallback: function (callback) {
                if (typeof callback=== "function") {
                    opt.callback = $.extend(opt.callback, {start: callback});
                }
                return Method;
            },
            setEndCallback: function (callback) {
                if (typeof callback=== "function") {
                    opt.callback = $.extend(opt.callback, {end: callback});
                }
                return Method;
            },
            setCallback: function (callbacks) {
                for (var key in callbacks) {
                    if (typeof callbacks[key] === "function") {
                        opt.callback[key] = callbacks[key];
                    }
                }

                return Method;
            }


        }


        return Method;


    };

    $.fn.clockdown.defaultsConfig = {

        time: 0,
        callback: {
            end: function () {
                console.log("end count down");
            },
            start: function () {
                console.log("start count down ");
            }

        }

    };

})(jQuery);


