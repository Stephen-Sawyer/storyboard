# storyboard

Storyboard.js is an easy, clean & lightweight way of partial page updates using a simple JQuery extension with still having control between updates (chapters/steps).

This enables a more friendly user experience for tasks that traditionally are on seperate pages. e.g. signup

Take a look at the working example.


# Documentation

$("myid").story({chapters:["page1.html","page2.html"], folder:"pages"});

# Moving between chapters

$storyboard.<ContainerID>Next(callback);

# Ending the story

$storyboard.<ContainerID>End(callback);
