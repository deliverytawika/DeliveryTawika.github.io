function sendOrder() {
    var name = $("#name").val();
    var phone = $("#phone").val();
    var order = $("#order").val();
    var location = $("#location").val();

    // Generate order number
    var orderNumber = generateOrderNumber();

    // Send order data to Telegram bot API endpoint via AJAX POST request
    $.ajax({
        url: "https://api.telegram.org/bot6351918844:AAGcj7hXJie0jFm_-7ZElanCretnIY7Kufg/sendMessage",
        type: "POST",
        data: {
            chat_id: "5879421948",
            text: "New Order Details:\n"
                + "Order Number: " + orderNumber + "\n"
                + "Name: " + name + "\n"
                + "Phone Number: " + phone + "\n"
                + "Order: " + order + "\n"
                + "Location: " + location
        },
        success: function(response) {
            alert("Order submitted successfully! Your order number is: " + orderNumber);
            resetForm();
        },
        error: function(xhr, status, error) {
            alert("There was an error submitting the order: " + error);
        }
    });
}

function generateOrderNumber() {
    var date = new Date();
    var orderNumber = "ORD-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + getRandomInteger(1000, 9999);
    return orderNumber;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetForm() {
    $("#name").val("");
    $("#phone").val("");
    $("#order").val("");
    $("#location").val("");
}
