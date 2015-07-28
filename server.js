var fs = require('fs')
var net = require('net')
var port = 3000
var clients = 0
var count = 1
	

var server = net.createServer(function(c){
	console.log('client connected')
	clients++
	c.write('hello client '+clients+'\r\n')
	
	c.on('data', function(data){
		console.log(data.toString().trim())
		
	var readMessages = fs.readFileSync('messages.json', 'utf-8')

//// create message table	
	var messages;
	if (readMessages === ''){
		messages = []
	}else {
		messages = JSON.parse(readMessages)
	}

//// split input to string
	var splitMessage = (data.toString('utf-8').split(',',2))

//// add entries
		if (splitMessage[0] === 'add'){
			messages.push(count+':'+splitMessage[1])
				count++
			fs.writeFile('messages.json', JSON.stringify(messages))

//// list entries
		}else if (splitMessage[0]=== 'list'){
			c.write(messages.toString())
			console.log('printing messages')
			console.log(messages.toString())

//// remove entry
		}else if (splitMessage[0]==='delete'){
			fs.readFileSync('messages.json','utf-8')
			messages.splice(0, splitMessage[1])
			console.log(messages)
			fs.writeFile('messages.json', JSON.stringify(messages))
		}

//	c.write(data.toString().trim()+'\n')
	})
	
	c.on('end', function(){
		console.log('client disconnected')
	})
})



server.listen(port, function(){
	console.log('listening on ' + port)
})