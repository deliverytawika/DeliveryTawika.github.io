// Wait for the page to be fully loaded before running any JavaScript code
$(document).ready(function() {

    // Handle the submit event when the order form is submitted
    $("#orderForm").submit(function(event) {

        // Prevent the default form submission from reloading the page
        event.preventDefault();

        // Get the form data and store it as an object
        var formData = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            order: $("#order").val(),
            location: $("#location").val()
        };

        // Send the order data to the server or perform any necessary actions
        // ...

        // Generate a random order number between 1000 and 9999
        var orderNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

        // Send the order data to the Telegram bot
        var message = "New Order\n\nName: " + formData.name + "\nPhone: " + formData.phone + "\nOrder: " + formData.order + "\nLocation: " + formData.location + "\nOrder Number: ORD-" + orderNumber;
        sendTelegramMessage(message);

        // Show success message with submitted data and order number
        showSuccessMessage(formData.name, formData.phone, formData.order, formData.location, orderNumber);

        // Reset form fields
        $("#orderForm").trigger("reset");
        
        //Show submitted data in small screen
        $(".submitted-data").empty();
        $(".submitted-data").append("<li>Name: " + formData.name + "</li>");
        $(".submitted-data").append("<li>Phone: " + formData.phone + "</li>");
        $(".submitted-data").append("<li>Order: " + formData.order + "</li>");
        $(".submitted-data").append("<li>Location: " + formData.location + "</li>");
        $(".submitted-data").append("<li>Order Number: ORD-" + orderNumber + "</li>");
    });

    function showSuccessMessage(name, phone, order, location, orderNumber) {
        $(".order-details").empty();
        $(".order-details").append("<li>Name: " + name + "</li>");
        $(".order-details").append("<li>Phone: " + phone + "</li>");
        $(".order-details").append("<li>Order: " + order + "</li>");
        $(".order-details").append("<li>Location: " + location + "</li>");

        $(".order-number").text("ORD-" + orderNumber);

        $(".success-message").addClass("show");

        // Hide success message after 5 seconds
        setTimeout(function() {
            $(".success-message").removeClass("show");
        }, 8000);
    }

    function sendTelegramMessage(message) {
        var telegramBotToken = "6351918844:AAGcj7hXJie0jFm_-7ZElanCretnIY7Kufg";
        var telegramChatId = "6361923042";

        var telegramApiUrl = "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage";

        $.ajax({
            type: "POST",
            url: telegramApiUrl,
            data: {
                chat_id: telegramChatId,
                text: message
            },
            success: function(response) {
                console.log("Telegram message sent successfully");
            },
            error: function(error) {
                console.error("Error sending Telegram message: " + error);
            }
        });
    }
});
