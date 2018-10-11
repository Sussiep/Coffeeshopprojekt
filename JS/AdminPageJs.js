function listCoffees() {
    // Call Web API to get a list of post
    $.ajax({
        url: 'https://coffeeshopproject.azurewebsites.net/api/coffee?CurrentPage=1&ItemsPerPage=3',
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
    $("#products_area").empty();
    // Iterate over the collection of data
    $.each(coffees, function (index, coffee) {
        // Add a row to the post table
        addCoffeeRow(coffee);
    });
}

function addCoffeeRow(coffee) {
    // Check if <tbody> tag exists, add one if not
    // Append row to <table>
    $("#products_area").append(
        buildCoffeeRow(coffee));
}

function buildCoffeeRow(coffee) {
    var ret ="<div id='"+coffee.coffeeId+"' onclick='test()' class=\"mdl-cell mdl-cell--4-col\">\n" +
        "                       <img id=\"cappuccino\" src=\"img/Cappuccino.jpg\" alt=\"\">\n" +
        "                       <p>"+coffee.coffeeName+"</p>\n" +
        "                        </div>";
    return ret;
}

$('#coffeeForm').on('submit',function(e){
    e.preventDefault();
    var coffeeName = $( "#coffeeName" ).val();
    var coffeePrice = $( "#coffeePrice" ).val();
    var coffeeStrength = $( "#coffeeStrength" ).val();
    var coffeeDescription = $( "#coffeeDescription" ).val();
    $.ajax({
        url: "https://coffeeshopproject.azurewebsites.net/api/coffee",
        type: 'POST',
        data: JSON.stringify({
            "CoffeeName": coffeeName,
            "CoffeePrice": coffeePrice,
            "CoffeeStrength": coffeeStrength,
            "CoffeeDescription": coffeeDescription}),
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

function openWin() {
    window.open("http://localhost:63342/Coffeeshopprojekt/admin.html?_ijt=ho8mlojqr28j5etokotlgs21fi");
}

function test() {
    window.open("");
}