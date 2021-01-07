const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://test.mosquitto.org:1883')

//wait for connection
client.on('connect', ()=> {
    console.log('Connected')
    //subscribe to a topic
    client.subscribe('lukheitopic', (err, granted)=> {
        //check if there are any error
        if(err != null){
            console.error('subscription error: ', err)
            process.exit(-1)
        }
        console.log('granted: ', granted)

        //listen to incoming mesages
        client.on('message', (topic, payload)=> {
            const data = payload.toString()
            console.log(`Topic: ${topic}, payload: ${data}`)
        })
    })
})