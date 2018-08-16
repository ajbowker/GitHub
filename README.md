# BBC Sport (2017 Rebrand) - CasparCG Templates

![Sport Results Screenshot](https://github.com/bbc/casparcg-bbcsport-results-board/blob/master/readme_screenshot.png)

[sport-results.html](templates/sport-results.html)

## How it works:

**This is an HD (1920 x 1080 pixels) template**

This is also just a plain old website. You can open it up in Chrome and use the console to test it. 

You animate on the board by firing an `update` command with the following JSON:
```
update('{"type":"SPORT_RESULTS","title":"LADBROKES SCOTTISH PREMIERSHIP","logoId":"1","hashtag":"#getinspired","website":"bbc.co.uk/getinspired","rows":"Saturday|CELTIC~1 - 2~RANGERS|HEART OF MIDLOTHIAN~3 - 4~HIBERNIAN|Sunday|ST JOHNSTON~0 - 5~ABERDEEN|~~|~~|~~|~~|~~|~~|~~|~~|~~"}')
```
The board can handle changes from one page to the next through the state logic in the .js file.

Animate it off with:
```
update('{"type":"SPORT_RESULTS_OFF"}')
```

- `type` can either be :
`SPORT_RESULTS`,
`FOOTBALL_RESULTS`, (the same really, but planning ahead)
`SPORT_RESULTS_OFF` or 
`SPORT_RESULTS_OFF` (these are the same as well).
- `logoId` is linked to the PNG images in [templates/img/competition_logos](templates/img/competition_logos/). Leave this empty `""` to hide the competition logo.
- `hashtag` is linked to the footer bar, left hand text, `#bbcsport`
- `website` is linked to the footer bar, right hand text `bbc.co.uk/getinspired`
- `rows` are made up of either subheadings or matches. 
- Each row is separated with '|', up to a maximum of 14 rows. Or more if you want, but that might look daft.

To make a regular left aligned subheading, simply enter the required string, `Saturday`. 

For a centred subheading with yellow strap, enter the text into the score field leaving the first field blank, eg `~Yellow subheading`.

The match details are separated by '~', like `HomeTeam~0 - 0~AwayTeam`. If the middle section, the score contains any letters, the box goes grey through a CSS class. 

If the score contains an '*' then we will present this match as active, and a blue box with white text will be used. eg: `Celtic~3 - 1*~Rangers`

Matches with 5 values inside such as `5~Chelsea~0 - 0~Arsenal~2` will display a Pools result along with the match. First value in here is the Pools Number, and the last is the Pools Value (0,1 or 2) Make sure to top the rows with a subheading saying 'Pools' if you use these on a board.

[Football Pools on Wikipedia](https://en.wikipedia.org/wiki/Football_pools)
[Football Pools - Classic Results](https://www.footballpools.com/pool-games/classic-pools)




The main BBC logo can be swapped for the .svg of any other Sport brand in the 
[templates/img](templates/img/) folder.

Eg:  `<img class="bbc-logo" src="img/bbc_sport.svg" />`

## CasparCG - Adding template to the Server and Client

1. Download [CasparCG Server](https://sourceforge.net/projects/casparcg/?source=typ_redirect), or you may be best using the latest fork from [Superfly](https://github.com/SuperFlyTV/casparcg-server/releases) to get a better version of the Chrome Embedded Framework, for improved text and animation. *Sever 2.2 is coming soon.* 

2. Download [Caspar Client](https://sourceforge.net/projects/casparcg/files/CasparCG_Client/CasparCG_Client_2.0/)

3. In the Server, change the casparcg.config to HD:

`<video-mode>1080i5000</video-mode>`

4. Add the template into the `template` folder within Caspar server

5. In Client, drag the template into the Caspar rundown from the left hand side `Templates` box. Hit F2 to load the template to the server.

6. By filling in the template data like below, and clicking `Send as JSON`, you can now hit F6 to send an Update to Caspar, and animate it on screen.

![Sport Results Screenshot](https://github.com/bbc/casparcg-bbcsport-results-board/blob/master/readme_caspar_client.png)

## To do:

- [X] Add footer text (hashtag, web address) to be configurable from update/JSON

- [X] Have a pools style board from 'SPORT_RESULTS_POOL', and have a 5 detail row containing Pools Number and Pools Value

- [X] Give blue score background for matches in play, yellow for completed matches, add a flag to score for matches in play, such as '2 - 1*' 

- [ ] Limit text size in headings (like MaxSize does in Viz Artist). Expando-text.

- [ ] Cricket match result board

- [ ] League Table of any type

## About this work:

This template featured in the [CasparCG at BBC Scotland](https://youtu.be/-XN8rovqzA0) talk to the glasgowCoderCollective.

We've intentionally tried to avoid using any external JS libraries, and focused on CSS3
transforms and transitions for animation.

Created by Andy Leggett & Ryan McKenna, for Scott Crawford at BBC Alba

