#!/usr/bin/env node

const program = require('commander');
let pkg = require('./package');

let = urlValue = undefined;
program
    .version(pkg.version)
    .description(pkg.description)
    .usage('youtube-dl-info [option] <url>')
    .arguments('<url>')
    .option('-l, --limit <limit>', 'limit number')
    .action(function(url){
        urlValue = url;
    });
program.parse(process.argv);
if(typeof urlValue === 'undefined'){
    console.error(program.usage());
    process.exit(1);
}

const ytlist = require('youtube-playlist');
ytlist(urlValue, 'url').then(res => {
  let limit = Number.MAX_SAFE_INTEGER;
  if(program.limit){
    limit = parseInt(program.limit);
  }
  for(let i = 0 ; i < res.data.playlist.length && i < limit; i++){
    console.log(res.data.playlist[i]);
  }
})
