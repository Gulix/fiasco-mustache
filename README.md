# fiasco-mustache
 A Fiasco Playset generator !

## What is Fiasco-Mustache ?

"Fiasco-Mustache" is a project I made in order to easily produce playsets for [Fiasco](http://www.bullypulpitgames.com/games/fiasco/), the game by Bully Pulpit Game.

This project is a web-page, with no server-related code, so everyone can get a local copy and test it with any web-browser. The name comes from a distinct library used to generate the playset : [Mustache](https://mustache.github.io/). The current version doesn't make much use of the Mustache library, but the name stuck.

## How to use Fiasco-Mustache ?

You can download the last version of the code source, or run the [demo-page](http://gulix.github.io/fiasco-mustache/).

First step is to fill all the blank fields from 'Introduction' to 'Section #4'. It matches a classic Fiasco-playset layout.

In the "Description" and "Credits" part of the "Introduction" tab, you can create "Title" line by prefixing them with the character #.

You can also add an image for the Cover of your Playset.

There's a "Save" button that you can use to save your work in a local JSON file. You can then use the "Load" button to restore your work.

The final step is to produce your playset. Click on the "Generate PDF" button to get a nice PDF ready to be print and published !

You can also use the "old" version of the Mustache generator. You'll need a "mustache template", a text that will be used to generate your template to various form : XML file, BBcode, pure text, wiki format, ... Paste your template in the text frame of the 'Generate' tab. Then click the "Generate" button, and save your file on your computer.

## Licenses

**Current version :** 0.3 <2018-11-07>

"Fiasco-Mustache" is released under the [CC-By-SA license](https://creativecommons.org/licenses/by-sa/3.0/), and is a [Beerware](http://en.wikipedia.org/wiki/Beerware).

"Fiasco-Mustache" uses the following libraries :

* [https://github.com/janl/mustache.js/](Mustache.js) for the template generation
* [http://getbootstrap.com](Bootstrap) for the css rendering
* [http://jquery.com/](jQuery) for the AJAX functions
* [https://knockoutjs.com/](KnockoutJS) for the UI interaction
* [https://github.com/eligrey/FileSaver.js/](FileSaver.js) for the file saving/loading
* [http://pdfmake.org/#/](PdfMake) for generating the PDF
