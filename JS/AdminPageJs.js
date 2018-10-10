
function openWin() {
    window.open("http://localhost:63342/Coffeeshopprojekt/admin.html?_ijt=ho8mlojqr28j5etokotlgs21fi");
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