
var timeField;

$(function () {
	
	// hide upon startup
	timepicker_hide();
	
	// todo: extraction initialize code into own function
	
	// todo: consider only showing upon clicking...
	 	// or button...
	
	// todo: extract into own function
	// todo: attach to click handler, in addition to focus (to allow for recreating upon clicking)
	
	// show upon focus
	$("input.time").focus(function() {
		//console.log("focus " + event.target.id);
		timeField = event.target.id;
		
		$("#timepicker").attr('class','timepicker-show');
		$("#timepicker").css('left',$(this).offset().left);

		var top = $(this).offset().top;
		top += parseInt($(this).css('height'));
		top += parseInt($(this).css('margin-top'));
		top += parseInt($(this).css('margin-bottom'));
		top += 	6;
		
		$("#timepicker").css('top', top);
	});
	
	/*$("input.time").blur(function() {
		console.log("blur " + event.target.id)
		if (timeField !== event.target.id && $("#timepicker").attr('class') !== 'timepicker-show') { 
			timepicker_hide();
			$("#timepicker").css('left', null);
			$("#timepicker").css('top', null);
			timeField = event.target.id;
		}
	});*/
	
	$("html").click(function() {
		//console.log($("#timepicker").attr('class'));
		var x = event.clientX;
		var y = event.clientY;
		removeTimePicker(x,y);
	});
	
	$("a").click(handleTimePick);
	
	$("button").focus(function () {
		removeTimePicker();
	});
	
	function removeTimePicker(x,y) {
		if ($("#timepicker").attr('class') === 'timepicker-show' || x === null || y === null) {
			if (inTimeField(x,y) || inTimePicker(x,y)) {
			} else {
				timepicker_hide();
				$("#timepicker").css('left', null);
				$("#timepicker").css('top', null);
			}
		}
	}
	
	// todo: consolidate
	function inTimeField(x,y) {
		var top = $("#timepicker").offset().top
		- parseInt($("#" +timeField).css('height')) 
		- parseInt($("#" +timeField).css('margin-top')) 
		- parseInt($("#" +timeField).css('padding-top'))   
		- parseInt($("#" +timeField).css('margin-bottom')) 
		- parseInt($("#" +timeField).css('padding-bottom'));
		var bottom = top + parseInt($("#" +timeField).css('height'));
		var left = $("#timepicker").offset().left;
		var right = left + parseInt($("#" +timeField).css('width')); 
		var result = left <= x && x <= right && top <= y && y <= bottom;
		//console.log('timeField  ' + left+' <= ' + x + ' <= '+right+'  '+top+' <= ' + y + ' <= '+bottom + '... ' + result);
		return result;
	}
	
	function inTimePicker(x,y) {
		var top = $("#timepicker").offset().top;
		var bottom = top + parseInt($("#timepicker").css('height'));
		var left = $("#timepicker").offset().left;
		var right = left + parseInt($("#timepicker").css('width')); 
		var result = left <= x && x <= right && top <= y && y <= bottom;
		console.log('timePicker ' + left+' <= ' + x + ' <= '+right+'  '+top+' <= ' + y + ' <= '+bottom + '... ' + result);
		return result;
	}

	
	function timepicker_hide() {
		$("#timepicker").attr('class','timepicker-hide');		
	}
	
	function handleTimePick() { 
		$('#' + timeField).val(buildTime($(this).parent().get(0).id, $(this).text()));
	}
	
	// todo: refactor and clean up duplication
	function buildTime(timePart, value) {
		var time = $('#' + timeField).val() || '';
		
		//console.log('buildTime ' + timePart + ', ' + value);
		switch (timePart) {
			case 'hour': 
				if (time === '') {
					time = value + ':' + '00' + ' am';
				} else { 
					var hr = time.split(':')[0];
					var min = time.split(':')[1].split(' ')[0];					
					var ampm = time.split(':')[1].split(' ')[1];
					console.log('hr='+hr+',min='+min+',a/pm='+ampm);
					time = value + ':' + min + ' ' + ampm;					
				}
				break;
			case 'minute': 
				if (time === '') {
					time = '';
				} else {
					var hr = time.split(':')[0];
					var min = time.split(':')[1].split(' ')[0];					
					var ampm = time.split(':')[1].split(' ')[1];
					time = hr + ':' + value + ' ' + ampm;						
				}
				break;			
			case 'ampm': 
				if (time === '') {
					time = '';
				} else {
					var hr = time.split(':')[0];
					var min = time.split(':')[1].split(' ')[0];					
					var ampm = time.split(':')[1].split(' ')[1];
					time = hr + ':' + min + ' ' + value;						
				}
				break;			
		}
		return time; 
	}
	
});