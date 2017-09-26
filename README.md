# WhosYourRepRedux
A MERN Full Stack Application for keeping up with politics.  Link to website: https://fathomless-peak-63610.herokuapp.com/

This website has several features: search by state or politician name to get detailed info on state/politician, a calendar of events by state in order to see what the Senators/Representatives in your state are up to, and a trending page to see which events are coming up next.

![Image of website](https://github.com/bjk116/WhosYourRepRedux/blob/master/public/website-pic.PNG)

The data sources for this app are [Political Party Time](http://politicalpartytime.org/api/) for getting events data and [ProPublica](https://www.propublica.org/datastore/api/propublica-congress-api) and [OpenSecrets](https://www.opensecrets.org/resources/create/apis.php) for politician data.

As noted above, this is application is built with the MERN stack.  We also used the npm package node-cron to schedule a task that makes API calls on a daily basis to update the database with new politican and events data.
