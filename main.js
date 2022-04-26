var iTunes = require("itunes-bridge");
var currentTrack = iTunes.getCurrentTrack();
var iTunesEmitter = iTunes.emitter;
var applescript = require('applescript');
var fs = require('fs');
const express = require('express');
const ngrok = require('ngrok');
const RPC = require("discord-rpc");
var rpcimg;
var artwork;

const app = express();
 
applescript.execFile('./GetArtwork.scpt', function(err, data, rtn) {
    //console.log(rtn);
    console.log(data);
    fs.writeFile('./artwork/artwork.png', data, 'binary', function(err) {})

    const app = express();
 
    // Defining port number
    const PORT = 3000;                 
 
    // Function to serve all static files
    // inside public directory.
    app.get('/artwork', (req, res) => {
        res.send(data);
       });
    // Server setup
    app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}...`);

    })
});

const rpc = new RPC.Client({
    transport: "ipc"
})

    
async function discordrpcset() {

        const url = await ngrok.connect(3000);
        rpcimg = url;
        console.log(url);
        
        rpc.setActivity({
            details: iTunes.getCurrentTrack().name,
            state: iTunes.getCurrentTrack().state,
            endTimestamp: end,
            largeImageKey: rpcimg+"/artwork",
            largeImageText: iTunes.getCurrentTrack().name,
        })
    }

async function artwork() {
    applescript.execFile('./GetArtwork.scpt', function(err, data, rtn) {
        //console.log(rtn);
        console.log(data);
        
    
})
    
}



    

    
    
    
const delta = (currentTrack.duration - currentTrack.elapsedTime) * 1000;
const end = Math.ceil(Date.now() + delta);
console.log(end),

iTunesEmitter.on('playing', function(type, currentTrack){
    // If it is a paused track that restarts playing
    if(type === "player_state_change") {
        console.log(currentTrack.name + " has been resumed! ");
        applescript.execFile('./GetArtwork.scpt', function(err, data, rtn) {
            //console.log(rtn);
            console.log(data);
            fs.writeFile('./artwork/artwork.png', data, 'binary', function(err) {
            });
                

            })
        // Or if it is a new track
    }else if(type === 'new_track'){
        console.log(currentTrack.name+" is now playing!")
        
    }
});

console.log(artwork);
iTunesEmitter.on('paused', function(type, currentTrack){
    console.log(currentTrack.name+" is now paused!");
    discordrpcset();
});
// Do something when iTunes is stopped
iTunesEmitter.on('stopped', function(){
    console.log("iTunes is not longer playing!");
    discordrpcset();
});



rpc.login({
    clientId: "968473127342473246"
})
