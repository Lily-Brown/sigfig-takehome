#SigFig Take-Home

## Synopsis

This is the repository for the SigFig Take-Home Assignment:

"Create a webpage that displays a gallery of images, given a JSON array containing a list of image URLs."

### Requirements

* Do not use any Javascript libraries or frameworks for your webpage. Javascript build tools are ok.
* ES5 or above is preferred.
* The basic layout should be a grid of pictures.
* The images should be reorderable by dragging and dropping. Dragging an image to a new position should insert that image at the new position, and maintain order of other images. It should not swap images.
* Any other functionality is not expected.
* The submitted code should be runnable and viewable. Add any instructions necessary to a README.md file.


## Installation

1 - Fork and clone this repository.

2 - CD into the project directory: ```> cd sigfig-takehome```

3 - Install Node Packages: ```> npm install```

4 - Start your server: ```> nodemon```

5 - View your application at: [http://localhost:3000](http://localhost:3000/).


## UI Screenshot

Photo Gallery with Grid

![UI](http://i.imgur.com/6Qq6W7Y.jpg)


## Features

- Users can Drag and Drop photos to rearrange the photo order
- Users can Double Click a photo to select it and then use the Arrow keys to move it around on the page

## Future Work

- Add Arrows for another way to rearrange photos
- Save Data to JSON so that on reload, the order is preserved

## Casino Take Home

Solution for the Casino Challenge can be found here: [Casino.md](https://github.com/Lily-Brown/sigfig-takehome/blob/master/Casino.md)
