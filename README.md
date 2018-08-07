# BBC Sport (2017 Rebrand) - CasparCG Templates

![Sport Results Screenshot](https://github.com/bbc/casparcg-bbcsport-results-board/blob/master/readme_screenshot.png)

[sport-results.html](templates/sport-results.html)

## How it works:

**This is an HD (1920 x 1080 pixels) template**

You animate on the board by firing an `update` command with the following JSON:
```
update('{"type":"SPORT_RESULTS","title":"LADBROKES SCOTTISH PREMIERSHIP","logoId":"1","hashtag":"#getinspired","website":"bbc.co.uk/getinspired","rows":"Saturday|CELTIC~1 - 2~RANGERS|HEART OF MIDLOTHIAN~3 - 4~HIBERNIAN|Sunday|ST JOHNSTON~0 - 5~ABERDEEN|~~|~~|~~|~~|~~|~~|~~|~~|~~"}')
```
The board can handle changes from one page to the next through state logic.

Animate it off with:
```
update('{"type":"SPORT_RESULTS_OFF"}')
```

- `type` can either be :
`SPORT_RESULTS`,
`FOOTBALL_RESULTS`,
`SPORT_RESULTS_OFF` or 
`SPORT_RESULTS_OFF`.
- `logoId` is linked to the PNG images in [templates/img/competition_logos](templates/img/competition_logos/). Leave this empty to hide the competition logo.
- `hashtag` is linked to the footer bar, left hand text, `#sportscene`
- `website` is linked to the footer bar, right hand text `bbc.co.uk/getinspired`
- `rows` are made up of either subheadings or matches. 

To make a subheading, simply enter the required string, 'Saturday'. 

Match details are separated by '~', `HomeTeam~0 - 0~AwayTeam`. If score contains any letters, box goes grey. 

If the score contains an '*' then we will present this match as active, a blue box with white text. eg: `Celtic~3 - 1*~Rangers`

Matches with 5 values inside such as `5~Chelsea~0 - 0~Arsenal~2` will display a Pools result along with the match. Make sure to top the rows with a subheading saying 'Pools' if so.

- Each row is separated with '|', up to a maximum of 14 rows. Or more if you want, but that might look daft.

For the main BBC logo, you can swap the .svg for any other Sport brand in the 
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

- [ ] Limit text size in headings (like MaxSize does in Viz Artist)

## About this work:

This template featured in the [CasparCG at BBC Scotland](https://youtu.be/-XN8rovqzA0) talk to the glasgowCoderCollective.

We've intentionally tried to avoid using any external JS libraries, and focused on CSS3
transforms and transitions for animation.

Created by Andy Leggett & Ryan McKenna, for Scott Crawford at BBC Alba

