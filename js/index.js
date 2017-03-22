var months = {
	'01':'Январь',
	'02':'Февраль',
	'03':'Март',
	'04':'Апрель',
	'05':'Май',
	'06':'Июнь',
	'07':'Июль',
	'08':'Август',
	'09':'Сентябрь',
	'10':'Октябрь',
	'11':'Ноябрь',
	'12':'Декабрь'
};
var quarters = {
	'01':'l',
	'02':'l',
	'03':'l',
	'04':'ll',
	'05':'ll',
	'06':'ll',
	'07':'lll',
	'08':'lll',
	'09':'lll',
	'10':'lV',
	'11':'lV',
	'12':'lV'
};
var quarters_intervals = {
	'l': {
		0:'01.01',
		1:'31.03'
	},
	'll': {
		0:'01.04',
		1:'30.06'
	},
	'lll': {
		0:'01.07',
		1:'31.09'
	},
	'lV': {
		0:'01.10',
		1:'31.12'
	}
};

$(function(){	
	
	$('.btn-group button').click(function(){
		$(this).parent().find('button').removeClass('active');
		$(this).addClass('active');
	});

	//переключение типа интервала
	$('.filter .interval button').click(function(){
		returnInterval($('.interval_value').attr('data-start'));
	});
	returnInterval($('.interval_value').attr('data-start'));
	
	//переключение интервала по стрелочке
	$('.filter .interval_value button.left,.filter .interval_value button.right').click(function(){
		updateInterval($(this));
	});
});

function updateInterval(this_){

	if( this_.hasClass('left') ){
		//выбран месяц
		if( $('.filter .interval button.month.active').length ){
			
			start = this_.parent().attr('data-start');
			was = new Date(start.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
			new_ = new Date(was.setMonth(was.getMonth() - 1));
			$('.interval_value').attr('data-start',  getFormattedDate(new_));
			$('.interval_value').attr('data-end',  (new Date(new_.getFullYear(), new_.getMonth() + 1, 0)).getDate() + '.' + getFormattedDate(new_).substr(3,10));

		}
		//выбран квартал
		if( $('.filter .interval button.quarter.active').length ){
			start = this_.parent().attr('data-start');
			was = new Date(start.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
			new_ = new Date(was.setMonth(was.getMonth() - 3));
			
			start = getFormattedDate(new_);
			start_spit = start.split(".");
			start_m = start_spit[1];
			ints = quarters_intervals[quarters[start_m]];
			console.log( ints );
			$('.interval_value').attr('data-start',  ints[0]+'.'+start_spit[2]);
			$('.interval_value').attr('data-end',  ints[1]+'.'+start_spit[2]);

		}
		//выбран год
		if( $('.filter .interval button.year.active').length ){
			
			start = this_.parent().attr('data-start');
			start_y = start.split('.');
			start_y = parseInt(start_y[2]) - 1;
			$('.interval_value').attr('data-start',  '01.01.' + start_y);
			$('.interval_value').attr('data-end',  '31.12.' + start_y);

		}
	} else if( this_.hasClass('right') ){

		//выбран месяц
		if( $('.filter .interval button.month.active').length ){
			
			start = this_.parent().attr('data-start');
			was = new Date(start.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
			new_ = new Date(was.setMonth(was.getMonth() + 1));
			$('.interval_value').attr('data-start',  getFormattedDate(new_));
			$('.interval_value').attr('data-end',  (new Date(new_.getFullYear(), new_.getMonth() + 1, 0)).getDate() + '.' + getFormattedDate(new_).substr(3,10));

		}
		//выбран квартал
		if( $('.filter .interval button.quarter.active').length ){
			start = this_.parent().attr('data-start');
			was = new Date(start.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
			new_ = new Date(was.setMonth(was.getMonth() + 3));
			
			start = getFormattedDate(new_);
			start_spit = start.split(".");
			start_m = start_spit[1];
			ints = quarters_intervals[quarters[start_m]];
			console.log( ints );
			$('.interval_value').attr('data-start',  ints[0]+'.'+start_spit[2]);
			$('.interval_value').attr('data-end',  ints[1]+'.'+start_spit[2]);

		}
		//выбран год
		if( $('.filter .interval button.year.active').length ){
			
			start = this_.parent().attr('data-start');
			start_y = start.split('.');
			start_y = parseInt(start_y[2]) + 1;
			$('.interval_value').attr('data-start',  '01.01.' + start_y);
			$('.interval_value').attr('data-end',  '31.12.' + start_y);

		}

	}

	returnInterval($('.interval_value').attr('data-start'));
}


function returnInterval(date){

	date_split = date.split(".");

	console.log( date_split );

	//выбран месяц
	if( $('.filter .interval button.month.active').length ){
		$('.interval_value .value').text( months[date_split[1]] + ' ' + date_split[2] );

		start = date;
		was = new Date(start.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
		new_ = new Date(was.setMonth(was.getMonth()));
		$('.interval_value').attr('data-start',  getFormattedDate(new_));
		$('.interval_value').attr('data-end',  (new Date(new_.getFullYear(), new_.getMonth() + 1, 0)).getDate() + '.' + getFormattedDate(new_).substr(3,10));
	}
	//выбран квартал
	if( $('.filter .interval button.quarter.active').length ){
		$('.interval_value .value').text( quarters[date_split[1]] + ' ' + date_split[2]  );

		start = date;
		was = new Date(start.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
		new_ = new Date(was.setMonth(was.getMonth()));
		
		start = getFormattedDate(new_);
		start_spit = start.split(".");
		start_m = start_spit[1];
		ints = quarters_intervals[quarters[start_m]];
		console.log( ints );
		$('.interval_value').attr('data-start',  ints[0]+'.'+start_spit[2]);
		$('.interval_value').attr('data-end',  ints[1]+'.'+start_spit[2]);
	}
	//выбран год
	if( $('.filter .interval button.year.active').length ){
		$('.interval_value .value').text( date_split[2] );

		start = date;
		start_y = start.split('.');
		start_y = parseInt(start_y[2]) ;
		$('.interval_value').attr('data-start',  '01.01.' + start_y);
		$('.interval_value').attr('data-end',  '31.12.' + start_y);
	}
	
	$('p.result').text($('.interval_value').attr('data-start') + ' - ' +  $('.interval_value').attr('data-end'));

}

function getFormattedDate(date) {
	var year = date.getFullYear();
	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return day + '.' + month + '.' + year;
}