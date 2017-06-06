# Run NPM install

# Minesweeper Clone
<p>Create a clone of the classic minesweeper game. This is for personal practice and I suggest working on this over the weekend to keep your skills up!</p>

## Requirements

#### Comments
<p>Comment on everything! It will force you to think about what you're doing and it will save others and future you time when trying to decipher code.</p> 

#### Wireframes
* Should scope out all parameters:
    * 9x9 grid
    * Display of number of mines remaining
    * Timer
    * Smiley face reset button
    * Add some of your own flare!
    
#### Game Functionality
* Grid click functions:
    * Select(left click) - Selects the space a reveals either an open space, a number, or a mine.
    * Right click should toggle between flags, questionmarks, and default space setting.
    * Flag - Flags a space you think is a mine and prevents you from accidently selecting space.
    * Question mark - Places a question mark on space that you are unsure about. Should prevent you from selecting space till removed.

* Timer:
    * should begin after first space is selected.
    * should stop on gameover or win state.
    * should reset on new game.
    
* Mine display:
    * should display the number of mines remaining depending on flags on grids.
    
* Smiley face reset button:
    * should display sunglasses smiley face on win.
    * should display dead face smiley face on mine.
    * should reset to smiley face on click and start a new game.

* Grid function;
    * should create a 9x9 grid on new game.
    * should randomly place 10 mines after 1st space is selected.
    * should add numbers on spaces that represent number of mines touching mines.
    * should display a blank space if no mine is touching space.
    
* Mine:
    * should be placed randomly across grid after first space is selected.
    * should trigger game over.
    * should reveal all mines on map.
    
* Spaces: 
    * should display number of adjacent mines.
    * should expand any adjacent fields if their number of adjacent mines is 0.
    
## Suggested Technologies
* HTML
* CSS
* Bootstrap
* Vanilla JavaScript
* jQuery

## Bonus Goals!
* Add in difficulty options:
    * larger grids
    * more mines per grid size
    
* Add in help features:
    * add in a mulligan for those who suck.

## Super Bonus!
<p>We haven't learned about databases yet, so saving high scores would be a challenge. An alternative you could try for now is to write a script, that writes to a file that contains high scores. Then you could have a highscores link that displays an html file containing the top 10 scores!</p>
    

## Example Clone:
<p>This is an example project created by my classmate penguyen1. This was created for his first project at the start of week 4. I'd suggest using this as a reference for ideas if you get stuck. His version also has a lot of bugs! It would be a great project to contribute updates too for practice.</p>

* [github repo](https://github.com/penguyen1/click_click_BOOM)
* [Deployed Game](http://penguyen1.github.io/click_click_BOOM/)
* [How to play minesweeper](https://www.youtube.com/watch?v=l24k_KQg84k)

## GitHub:
<p>Make sure to create your own branch and push your finished code! If you work in a group, just be sure to list all contributors! I will review the code and give any suggestions next week!</p>

<p>Push regulary to your branch with meaningful commit messages!</p>