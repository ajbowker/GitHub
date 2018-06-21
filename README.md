## BBC Sport (2017 Rebrand) - CasparCG Templates

![Sport Results Screenshot](https://github.com/bbc/casparcg-bbcsport-results-board/blob/master/readme_screenshot.png)

[sport-result.html](templates/sport-result.html)

How it works

You animate on the board by firing an `update` command with the following JSON:
```
update('{"type":"SPORT_RESULTS","title":"LADBROKES SCOTTISH PREMIERSHIP","logoId":"1","rows":"Saturday|CELTIC~1-2~RANGERS|HEART OF MIDLOTHIAN~3-4~HIBERNIAN|Sunday|ST JOHNSTON~0-5~ABERDEEN|~~|~~|~~|~~|~~|~~|~~|~~|~~"}')
```
The board can handle changes from one page to the next through state logic.

Animate it off with:
```
update('{"type":"SPORT_RESULTS_OFF"}')
```

- `type` can either be `SPORT_RESULTS` or `SPORT_RESULTS_OFF`.
- `logoId` is linked to the PNG images in [templates/img/competition_logo](templates/img/competition_logo).
- `rows` are made up of either subheadings or matches. To make a subheading, simply enter the required string, 'Saturday'. Match details are separated by '~',`HomeTeam~0 - 0~AwayTeam`. If score contains any letters, box goes grey. 
- Each row is separated with '|', up to a maximum of 14 rows.

This template featured in the [CasparCG at BBC Scotland](https://youtu.be/-XN8rovqzA0) talk to the glasgowCoderCollective.

Created by Andy Leggett & Ryan McKenna, for Scott Crawford at BBC Alba
