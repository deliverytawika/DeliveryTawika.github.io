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

        // Send the order data to the Telegram bot
        var message = "New Order\n\nName: " + formData.name + "\nPhone: " + formData.phone + "\nOrder: " + formData.order + "\nLocation: " + formData.location + "\nOrder Number: ORD-" + orderNumber;
        sendTelegramMessage(message);

        // Show success message with submitted data and order number
        showSuccessMessage(formData.name, formData.phone, formData.order, formData.location, orderNumber);

        // Reset form fields
        $("#orderForm").trigger("reset");

        // Increment order number for next order
        orderNumber++;
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
        }, 5000);
    }

    function sendTelegramMessage(message) {
        var telegramBotToken = "YOUR_TELEGRAM_BOT_TOKEN";
        var telegramChatId = "YOUR_TELEGRAM_CHAT_ID";

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

    var orderNumber = 1;

});
