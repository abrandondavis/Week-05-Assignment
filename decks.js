// Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
// Use at least one array.
// Use at least two classes.
// Your menu should have the options to create, view, and delete elements.





// Decks and Cards


// Menu class to drive the application and provide menu options
class Menu {
    constructor() {
        this.decks = [];
        this.selectedDeck = null;
    }

    // Entry point to the application
    // This and other similar menus don't need to be switches. It is just what was in mind because the video example also used them.
    // One benefit of the switch is the ease of use for a smaller set number of options that doesnt need to change
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {    // While selection is !0 (not 0)
            switch (selection) {    // A switch to take user inputs
                case '1':
                    this.createDeck();
                    break;
                case '2':
                    this.viewDeck();
                    break;
                case '3':
                    this.deleteDeck();
                    break;
                case '4':
                    this.displayDecks();
                    break;
                default:            // Default selection if left blank
                    selection = 0;
                    break;
            }
            selection = this.showMainMenuOptions(); // Calls menu function just below to prompt user input
        }
        alert('Good Game!');                        // Text display when option 0 (Exit) is selected
    }

    // Displays the main menu options and returns the user's selection
    // Template literal makes writing much cleaner
    showMainMenuOptions() {
        return prompt(`
    0:  Exit
    1:  Create a new deck
    2:  View a deck
    3:  Delete a deck
    4:  Display all decks
    `);
    }

    // Displays the options for a selected deck and returns the user's selection
    // ${deckInfo} is called inside prompt to show dynamically provided information based on selected deck
    showDeckMenuOptions(deckInfo) {
        return prompt(`
    0:  Back
    1:  Add a new card
    2:  Delete a card
    -----------------
    ${deckInfo}
    `);
    }

    // Displays all the decks and their indices
    displayDecks() { // Loops through deck and shows each element
        
        if (this.decks.length === 0) {
            alert('No decks available.'); // Display a message if there are no decks
            return; // Exit the method
        }

        let deckString = '';
        for (let i = 0; i < this.decks.length; i++) {
            deckString +='Index ' + i + ': ' + this.decks[i].name + '\n';
        }
        alert(deckString);  // Displays the actual information gained by the loop
    }

/*

The loops in the code can be different based on needs and coding style
Below is a listed example of some others
-------------------------------------------------------------------------------

forEach Loop

displayDecks() {
    let deckString = '';
    this.decks.forEach((deck, index) => {
        deckString += index + ': ' + deck.name + '\n';
    });
    alert(deckString);
}

-------------------------------------------------------------------------------

forOf Loop

displayDecks() {
    let deckString = '';
    let index = 0;
    for (const deck of this.decks) {
        deckString += index + ': ' + deck.name + '\n';
        index++;
    }
    alert(deckString);
}

-------------------------------------------------------------------------------

while Loop

displayDecks() {
    let deckString = '';
    let index = 0;
    while (index < this.decks.length) {
        deckString += index + ': ' + this.decks[index].name + '\n';
        index++;
    }
    alert(deckString);
}
-------------------------------------------------------------------------------

*/

    // Creates a new deck based on user input
    createDeck() {
        let name = prompt('Enter name for new deck: ');     // Prompts user for deck name input
        this.decks.push(new Deck(name));                    // Creates new deck object
    }

    // Displays the selected deck and provides options to manage it
    viewDeck() {
        let index = prompt("Enter the index of the deck that you want to view:");           // Prompts user for deck number input
        if (index > -1 && index < this.decks.length) {                                      // Loops through deck
            this.selectedDeck = this.decks[index];
            let description = 'Deck Name: ' + this.selectedDeck.name + '\n';
            description += ' ' + this.selectedDeck.describe() + '\n ';
            for (let i = 0; i < this.selectedDeck.cards.length; i++) {
                description += i + ': ' + this.selectedDeck.cards[i].describe() + '\n';
            }
            let selection1 = this.showDeckMenuOptions(description); //
            switch (selection1) {
                case '1':
                    this.createCard();
                    break;
                case '2':
                    this.deleteCard();
                    break;
            }
        }
    }

    // Deletes a selected deck based on user input
    deleteDeck() {
        let index = prompt('Enter the index of the deck that you wish to delete: ');
        if (index > -1 && index < this.decks.length) {
            this.decks.splice(index, 1);
        }
    }

    // Creates a new card for the selected deck based on user input
    createCard() {
        let name = prompt('Enter name for new card: ');
        let type = prompt('Enter type for new card: ');
        this.selectedDeck.addCard(new Card(name, type));
    }

    // Deletes a selected card from the selected deck based on user input
    deleteCard() {
        let index = prompt('Enter the index of the card that you wish to delete: ');
        if (index > -1 && index < this.selectedDeck.cards.length) {
            this.selectedDeck.cards.splice(index, 1);
        }
    }
}

// Deck class representing a deck of cards
class Deck {
    constructor(name) {
        this.name = name;   // Name of deck
        this.cards = [];    // Container array for card objects
    }

    // Adds a card to the deck
    addCard(card) {
        if (card instanceof Card) {
            this.cards.push(card);
        } else {
            throw new Error(`You can only add an instance of Card. 
    Argument is not a card: ${card}`);
        }
    }

    // Deck description method
    describe() {
        return `${this.name} deck has ${this.cards.length} cards.`;
    }
}


// Card class representing a card with a name and type
class Card {
    constructor(name, type) {
        this.name = name;   // Card Name
        this.type = type;   // Card Type
    }

    // Method to call if card description is needed
    describe() {
        return `${this.name} (${this.type} card)`;
    }
}




// Create an instance of the Menu class and start the application
// start function is at the top under the Menu class
let menu = new Menu();
menu.start();
