var map;

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

    function initializeMap() {
        //Spain locations
        /*var lat = 40.178873;
        var lng = -3.361816;*/
        //Barcelona location
        var lat = 41.396385;
        var lng = 2.174606;
        var mapOptions = {
          center: new google.maps.LatLng(lat,lng),
          zoom: 12
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initializeMap);


    //Barcelona by default so far
    var latitude=41.396385;
    var longitude=2.174606;

    var url = 'http://gymforless.herokuapp.com/api/gyms?longitude='+longitude+'&latitude='+latitude;
    $.ajax({
        url: url,
        type: 'GET',
        success: annotations
    });

})();

function annotations(data, textStatus, jqXHR)
{
    if (textStatus == "success")
    {
        data.forEach(function(gym) {
            if (gym.location.latitude != null && gym.location.longitude != null) {
                var loc = new google.maps.LatLng(gym.location.latitude,gym.location.longitude);
                var image = 'img/annotation.png';
                var marker = new google.maps.Marker({
                    position: loc,
                    map: map,
                    icon: image,
                    title: gym.name
                });

                var content = "<div class='callout'>"+gym.name+"</div>"

                var infowindow = new google.maps.InfoWindow({
                      content: content
                  });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
            }
        });
    }
}

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