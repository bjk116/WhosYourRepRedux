# WhosYourRepRedux
A MERN Full Stack Application for keeping up with politics.  Link to website: https://fathomless-peak-63610.herokuapp.com/

This website has several features: search by state or politician name to get detailed info on state/politician, a calendar of events by state in order to see what the Senators/Representatives in your state are up to, and a trending page to see which events are coming up next.

![Image of website](https://github.com/bjk116/WhosYourRepRedux/blob/master/public/website-pic.PNG)

The data sources for this app are [Political Party Time](http://politicalpartytime.org/api/) for getting events data and [ProPublica](https://www.propublica.org/datastore/api/propublica-congress-api) and [OpenSecrets](https://www.opensecrets.org/resources/create/apis.php) for politician data.

# Built With
1.  As noted above, this is application is built with the MERN stack.
2.  [Node-cron](https://www.npmjs.com/package/node-cron) npm package to schedule a task that makes a daily API call to our data sources in order to get updated data.
3.  [React calendar](https://www.npmjs.com/package/react-big-calendar) npm package to render the calendar.
4.  [React auto suggest](https://www.npmjs.com/package/react-autosuggest) npm package to incorporate auto-fill in our search box.
5.  [React router v4](https://www.npmjs.com/package/react-router-dom) for routing.
6.  [MaterializeCSS](http://materializecss.com/) for front-end design.
