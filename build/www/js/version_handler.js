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
                                        $("" + datas.build_1 + "").appendTo("#login_version");
                                    }
                                }

                            });


                        });

                    });
		}
