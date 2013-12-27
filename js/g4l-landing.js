(function(){
	var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

	if (isMobileWebkit) {
		$('html').addClass('mobile');
	}

	$(function(){
		if (isMobileWebkit) {

		} else {

		}

	});

    document.getElementById("sendBtn").onclick = function(){
        send();
    };

})();

function send()
{
    var value = document.getElementById("telephoneOrEmail").value;
    if ( validatePhonenumber(value) || validateEmail(value) )
    {
        //document.getElementById("main-form").submit();
    }
    else
    {
        alert("Tiene que ingresar un número móvil o un correo electrónico")
    }
}


function validatePhonenumber(inputtxt)
    {
        var phoneno = /^\d{9}/;
        var firstCharacter = inputtxt.charAt(0);
        if( inputtxt.match(phoneno) && (firstCharacter == "6" || firstCharacter == "7"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function validateEmail(email)
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }