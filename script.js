function sendData() {
	var name = $('#name').val();
	var phoneNumber = $('#phonenumber').val();
	var order = $('#order').val();
	var location = $('#location').val();

	if (name != '' && phoneNumber != '' && order != '' && location != '') {
		$.post('/send-message', {name: name, phoneNumber: phoneNumber, order: order, location: location}, function(response) {
			alert(response.message);
		});
	} else {
		alert('Please fill in all the fields.');
	}
}
