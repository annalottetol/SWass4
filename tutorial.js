
/* functie voor query zonder inferencing */

$('#InferencingOff').on('click', function(e){

	var query = 'prefix owl: <http://www.w3.org/2002/07/owl#> select distinct ?pizza  where { ?pizza a owl:ObjectProperty . }';
	var endpoint = 'http://localhost:5820/week4/query';
	var format = 'JSON';
	var reasoning = 'False';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': reasoning}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#resultaat').html(ul);
		} catch(err) {
			$('#resultaat').html('Er is iets misgegaan.');
		}
		

		
	});
	
});

/* functie voor query met inferencing */

$('#InferencingOn').on('click', function(e){

	var query = 'prefix owl: <http://www.w3.org/2002/07/owl#> select distinct ?pizza  where { ?pizza a owl:ObjectProperty . }';
	var endpoint = 'http://localhost:5820/week4/query';
	var format = 'JSON';
	var reasoning = 'True';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': reasoning}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#resultaat').html(ul);
		} catch(err) {
			$('#resultaat').html('Er is iets mis gegaan!');
		}
		

		
	});
	
});


