$(function() {

	$(".error").hide();
	var form = $('#ajax-contact');
    var formMessages = $('#form-messages');
    $(".bar").css.width="0";

    $.easing.easeOutCubic = function(t, e, n, i, o) {
            return i * ((e = e / o - 1) * e * e + 1) + n
        }

    $('.nav-icon').click(function(){
    	$(this).toggleClass('open');
    	$('nav').toggleClass('on');
    });

    $(".bar", ".progress-bar").width(0), $(".bar", ".progress-bar-thin").width(0), $(".progress-bar, .progress-bar-thin").on("inview", function(t, e) {
            var n = $(this),
                i = n.find(".bar"),
                o = n.data("percent");
            e && i.animate({
                width: o + "%"
            }, 12 * o, "easeOutCubic")
        });
    
    $('.animate').on('inview', function(event, isInView) {
	  if (isInView) {
	    $(this).addClass("animated").css("visibility", "visible");
	  } else{}
	});
	
	$(form).submit(function(event) {
	    event.preventDefault();

	    var formData = $(form).serialize();
	    
	    $.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    data: formData
		})
		
		.done(function(response) {
		    // Make sure that the formMessages div has the 'success' class.
		     $(formMessages).hide();
		    $(formMessages).text("");
		    $(formMessages).show();
		    $(formMessages).removeClass('error');
		    $(formMessages).addClass('success');

		    // Set the message text.
		    $(formMessages).text(response);

		    // Clear the form.
		    $('#name').val('');
		    $('#email').val('');
		    $('#msg').val('');
		    $('#spambot').val('');
		    setTimeout(function () { $(formMessages).fadeOut(1000); }, 5000);
		})

		.fail(function(data) {
		    // Make sure that the formMessages div has the 'error' class.
		    $(formMessages).hide();
		    $(formMessages).text("");
		    $(formMessages).show();
		    $(formMessages).removeClass('success');
		    $(formMessages).addClass('error');

		    // Set the message text.
		    if (data.responseText !== '') {
		        $(formMessages).text(data.responseText);
		    } else {
		        $(formMessages).text('Oops! An error occured and your message could not be sent.');
		    }
		    setTimeout(function () { $(formMessages).fadeOut(1000); }, 5000);
		});
	});
});



$(document).ready(function() {
  $("html,body").animate({scrollTop: 0}, 50); //100ms for example
});