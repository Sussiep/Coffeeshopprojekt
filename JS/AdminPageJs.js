function listCoffees() {
    // Call Web API to get a list of post
    $.ajax({
        url: 'https://coffeeshopproject.azurewebsites.net/api/coffee?CurrentPage=1&ItemsPerPage=6',
        type: 'GET',
        dataType: 'json',
        success: function (coffees) {
            onGetCoffeeSuccess(coffees);
        },
        error: function (request, message, error) {
            console.log(error);
        }
    });
}

function onGetCoffeeSuccess(coffees) {

    $("#products_area").empty() && $("#products_area1").empty();
    // Iterate over the collection of data
    $.each(coffees, function (index, coffee) {
        // Add a row to the post table
        addCoffeeRow(coffee);
    });
}

function addCoffeeRow(coffee) {
    // Append row to <table>
    $("#products_area").append(
        buildCoffeeRow(coffee));
}

function buildCoffeeRow(coffee) {
    var ret ="<div id='"+coffee.id+"' onclick='test("+coffee.id+")' class=\"mdl-cell mdl-cell--4-col\">\n" +
        "                       <img id=\"cappuccino\" src=\"img/Cappuccino.jpg\" alt=\"\">\n" +
        "                       <p>"+coffee.coffeeName+"</p>\n" +
        "                        </div>";

    return ret;
}

function getCoffeeById() {
    // get by ID
    $.ajax({
        url: 'https://coffeeshopproject.azurewebsites.net/api/coffee/'+ document.URL.split('=')[1],
        type: 'GET',
        dataType: 'json',
        success: function (coffee) {
            console.log(coffee);
            $("#coffeeSingle").empty();
            $("#coffeeSingle").append("<div class=\"mdl-grid\">\n" +
                "                        <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                         <img id=\"colored\" src=\"img/colored.jpg\" alt=\"\">\n" +
                "                        </div>\n" +
                "                        <div class=\"mdl-cell mdl-cell--4-col\">\n" +
                "                      <div id=\"Sweety-coffee\"><p>"+coffee.coffeeName+"</p>" +
                "                       <div id=\"edit\">\n" +
                "                            <input type=\"button\" value=\"&#xf044\" class=\"fas fa-edit\" onclick='editCoffee("+coffee.id+")'\> \n" +
                "                            <input type=\"button\" value=\"&#xf2ed\" class=\"fas fa-trash-alt\" onclick='deleteCoffee("+coffee.id+")'\> \n" +
                "                        </div></div>\n" +
                "                      <div id=\"flavour\"><p>Strength: "+coffee.coffeeStrength+"</p>\n" +
                "                        <div id=\"\"><p>Price: "+coffee.coffeePrice+"</p></div>\n" +
                "                      <div id=\"Order-here\"><p>Description: <br>"+coffee.coffeeDescription+"</p></div>\n" +
                "                        </div>\n" +
                "                      </div>");
        },
        error: function (request, message, error) {
            console.log(error);
        }
    });
}

$('#coffeeForm').on('submit',function(e){
    e.preventDefault();
    var coffeeName = $( "#coffeeName" ).val();
    var coffeePrice = $( "#coffeePrice" ).val();
    var coffeeStrength = $( "#coffeeStrength" ).val();
    var coffeeDescription = $( "#coffeeDescription" ).val();
    var coffeePicUrl = $( "#coffeePicUrl" ).val();


    $.ajax({
        url: "https://coffeeshopproject.azurewebsites.net/api/coffee",
        type: 'POST',
        data: JSON.stringify({
            "CoffeeName": coffeeName,
            "CoffeePrice": coffeePrice,
            "CoffeeStrength": coffeeStrength,
            "CoffeeDescription": coffeeDescription,
            "CoffeePicUrl": coffeePicUrl}),


        processData: false,
        contentType: 'application/json',
        success: function (comments) {
            console.log("Modtaget!");
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

function deleteCoffee(id) {
    // Call Web API to get a list of post
    console.log("blabalba");
    $.ajax({
        url: 'https://coffeeshopproject.azurewebsites.net/api/coffee/'+id,
        type: 'DELETE',
        dataType: 'json',
        processData: false,
        success: function (message) {
            console.log("slettet!");
        },
        error: function (request, message, error) {
            console.log("fejl");
        }
    });
}
$('#editCoffeeForm').on('submit',function(e){
    e.preventDefault();
    var id = getUrlParameter('id');
    var coffeeName = $( "#coffeeName" ).val();
    var coffeePrice = $( "#coffeePrice" ).val();
    var coffeeStrength = $( "#coffeeStrength" ).val();
    var coffeeDescription = $( "#coffeeDescription" ).val();
    var coffeePicUrl = $( "#coffeePicUrl" ).val();


    $.ajax({
        url: "https://coffeeshopproject.azurewebsites.net/api/coffee/" + getUrlParameter('id'),
        type: 'PUT',
        data: JSON.stringify({
            "id": id,
            "CoffeeName": coffeeName,
            "CoffeePrice": coffeePrice,
            "CoffeeStrength": coffeeStrength,
            "CoffeeDescription": coffeeDescription,
            "CoffeePicUrl": coffeePicUrl}),


        processData: false,
        contentType: 'application/json',
        success: function (comments) {
            console.log("Modtaget!");
        },
        error: function (request, message, error) {
            console.log(message);;
        }
    });
});
function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function openWin() {
    window.open("../Coffeeshopprojekt/admin.html");
}

function test(id) {
    window.open("../Coffeeshopprojekt/productinfo.html?id="+id);
}
function editCoffee(id) {
    window.open("../Coffeeshopprojekt/EditWin.html?id="+id);
}

