Search Bermuda Classified Sites
===============================

Use this tool to search several Bermuda classifieds sites from one place.
<br>*Original source/site: http://bdasearch.com/*

The way this works is that after you load the website, when a submission is made it does the following:

1. Sends three requests to Yahoo YQL API in parallel
2. Yahoo issues GET requests to each target.
3. Each target responds to Yahoo's requests
4. Yahoo returns the content to the browser client
5. The browser client then parses the content
6. The browser client displays the parsed results
