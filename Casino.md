# Casino

## Challenge
You are working for a company that is building various card games (e.g. Blackjack, Poker) for an online casino. Design the set of classes and interfaces that you would need to implement the functionality of a generic card game, including method signatures and member variables. Please state any assumptions you are making.You do not need to create any concrete game implementations.## Classes

### Game 

#### Variables* _numberOfPlayers_: int; // number of Players
* _cardsPerHand_: int; // number of Cards in hand
* _players_: Array of Player objects

#### Methods
* _initialize(numberofPlayers, cardsPerHand)_: function; // initializes Game with args
* _deal()_: function; // deals Cards to Players in their Hands based on the rules of the Game using Deck.draw(cardsPerHand)

((BlackJack, Poker, etc could then be classes that inherit from Game but have specific methods to their Rules like_: hit, stay, etc))

### Deck

#### Variables
* _cards_: Array of Card objects; // Card objects in play

#### Methods
* _initialize()_: function; // initialize a Deck of 52 Card objects with unique values of permutations of value/suit
* _shuffle()_: function; // randomly arranges Deck
* _draw(numberOfCards)_: function; // pop top numberofCards (default=1) Card object(s) from cards

### Card 

#### Variables
* _value_: string; // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
* _suit_: string; // ['D', 'H', 'S', 'C']

#### Methods
* _initialize(value, suit)_: function; // initialize a Card with a value and suit

### Hand

#### Variables
* _cards_: Array of Card objects; // number determined by rules of Game

#### Methods
* _draw(numberOfCards)_: function; // pop top numberofCards (default=1) Card object(s) from cards
* _discard(Card)_: function; // remove and return Card from cards

### Player

#### Variables
* _hand_: Hand object;