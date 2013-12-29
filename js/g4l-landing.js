var map, infowindow;

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
          zoom: 13
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
        infowindow = new google.maps.InfoWindow({content: ''});
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

                google.maps.event.addListener(marker, 'click', function() {
                    var photoKey = "img/placeholder.png";
                    if (gym.photos.length > 0) {
                        photoKey = 'https://s3-eu-west-1.amazonaws.com/g4l-images/' + gym.id + '/' + gym.photos[0].key;
                    }
                    var content = "<div class='callout'><div class='photo-gym'><img src='"+photoKey+"'/></div><div class='content-gym'>"+gym.name+"</div></div>";
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            }
        });
    }
}


/*+ (NSMutableArray*)normalizeCategories:(NSArray*)categories
{
    NSMutableArray* categoriesToBeShown = [[NSMutableArray alloc] init];

    NSArray* colors = [[NSArray alloc] initWithObjects:
                       [UIColor colorWithRed:83/255.0 green:93/255.0 blue:111/255.0 alpha:1],
                       [UIColor colorWithRed:109/255.0 green:183/255.0 blue:118/255.0 alpha:1],
                       [UIColor colorWithRed:89/255.0 green:189/255.0 blue:186/255.0 alpha:1],
                       [UIColor colorWithRed:195/255.0 green:211/255.0 blue:121/255.0 alpha:1],
                       [UIColor colorWithRed:234/255.0 green:55/255.0 blue:81/255.0 alpha:1],
                       [UIColor colorWithRed:242/255.0 green:130/255.0 blue:77/255.0 alpha:1],
                       [UIColor colorWithRed:200/255.0 green:74/255.0 blue:90/255.0 alpha:1],
                       [UIColor colorWithRed:238/255.0 green:101/255.0 blue:57/255.0 alpha:1],
                       nil];

    NSArray* imageNames = [[NSArray alloc] initWithObjects:
                           @"icon_fitness",
                           @"icon_spa",
                           @"icon_pool",
                           @"icon_activities",
                           @"icon_beauty",
                           @"icon_court",
                           @"icon_services",
                           @"icon_food",
                           nil];

    NSArray* leftOffsets = [[NSArray alloc] initWithObjects:
                            [NSNumber numberWithInteger:13],
                            [NSNumber numberWithInteger:13],
                            [NSNumber numberWithInteger:13],
                            [NSNumber numberWithInteger:8],
                            [NSNumber numberWithInteger:12],
                            [NSNumber numberWithInteger:10],
                            [NSNumber numberWithInteger:10],
                            [NSNumber numberWithInteger:1],
                            nil];

    categoriesToBeShown = [[NSMutableArray alloc] init];
    for (Category* category in categories)
    {
        bool categoryMustBeIncluded = false;
        for (Facility* facilty in category.facilities)
        {
            if (facilty.included)
            {
                categoryMustBeIncluded = true;
                break;
            }
        }

        int assetsPos = category.position;

        if (categoryMustBeIncluded) {
            category.color = colors[assetsPos];
            category.imagename = imageNames[assetsPos];
            category.leftOffset = [(NSNumber*)leftOffsets[assetsPos] integerValue];
            [categoriesToBeShown addObject:category];
        }
    }

    return categoriesToBeShown;
}*/



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