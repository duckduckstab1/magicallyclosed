// Fix for homepage detector
var homepage = location.protocol + '//' + location.host;
var homepage_2 = location.protocol + '//' + location.host + '/index.html';

if (homepage) {
 $(document).ready(function () {
	 
	 
                var datas = $.get("/json/version.json",
                        function (infos) {
                            $.ajax({
                                type: "POST",
                                url: "https://httpbin.org/post",
                                data: infos,
                                dataType: "json",
                                success: function (data) {
                                    if (data.hasOwnProperty('form')) {
                                        datas = data.form;
                                        $(""datas.build_1"").appendTo("#login_version");
                                    }
                                }

                            });


                        });

                    });
		}

if (homepage_2) {
 $(document).ready(function () {
	 
	 
                var datas = $.get("/json/version.json",
                        function (infos) {
                            $.ajax({
                                type: "POST",
                                url: "https://httpbin.org/post",
                                data: infos,
                                dataType: "json",
                                success: function (data) {
                                    if (data.hasOwnProperty('form')) {
                                        datas = data.form;
                                        $(""datas.build_1"").appendTo("#login_version");
                                    }
                                }

                            });


                        });

                    });
		}

if (!homepage) {
 $(document).ready(function () {
	 
	 
                var datas = $.get("/json/version.json",
                        function (infos) {
                            $.ajax({
                                type: "POST",
                                url: "https://httpbin.org/post",
                                data: infos,
                                dataType: "json",
                                success: function (data) {
                                    if (data.hasOwnProperty('form')) {
                                        datas = data.form;
                                        $(""datas.build_2"").appendTo(".ver");
                                    }
                                }

                            });


                        });

                    });
		}

if (!homepage_2) {
 $(document).ready(function () {
	 
	 
                var datas = $.get("/json/version.json",
                        function (infos) {
                            $.ajax({
                                type: "POST",
                                url: "https://httpbin.org/post",
                                data: infos,
                                dataType: "json",
                                success: function (data) {
                                    if (data.hasOwnProperty('form')) {
                                        datas = data.form;
                                        $(""datas.build_2"").appendTo(".ver");
                                    }
                                }

                            });


                        });

                    });
		}
