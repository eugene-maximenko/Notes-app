const fs = require('fs');
const chalk = require('chalk');

// Create load notes function
const loadNotes = () => {
    try {

        // Get the data
        const dataBuffer = fs.readFileSync('notes.json');

        // Stringify data
        const dataJSON = dataBuffer.toString();

        // Parse data
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }


};

// Create add command handler
const addNote = (title, body) => {

    // Fetch the notes
    const notes = loadNotes();

    // Check for duplicate note
    const duplicateNote = notes.find(element => element.title === title);

    // Validate note
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        // Save notes
        saveNotes(notes);

        console.log('New note added');
    } else {
        console.log('Note title taken!')
    }


};

// Create remove command handler
const removeNote = title => {

    // Fetch the notes
    const notes = loadNotes();

    // Filter all notes with another title
    const newNotes = notes.filter(element => element.title !== title);

    // Validate data
    if (notes.length > newNotes.length) {

        console.log(chalk.green.bold.inverse('Note removed!'));

        // Save notes
        saveNotes(newNotes);

    } else {
        console.log(chalk.red.bold.inverse('No note found!'));
    }
}

// Create list command handler
const listNotes = () => {
    console.log(chalk.bgYellow.inverse('Your notes'));

    // Fetch the notes
    const notes = loadNotes;

    // List data
    if (notes.length >= 0) {

        notes.forEach(element => {
            console.log(element.title);
        })

    } else {
        console.log(chalk.red.inverse('Here is no note!'));
    }
}

// Create read command handler
const readNote = (title) => {

    // Fetch the notes
    const notes = loadNotes();

    // Get the note by it's title
    const note = notes.find(element => element.title === title);

    // Log note or error
    if (note) {

        console.log(chalk.inverse(note.title));
        console.log(note.body);

    } else {

        console.log(chalk.red.inverse('Note not found'));

    }
}

// Create save notes function
const saveNotes = notes => {

    // Stringify data
    const dataJSON = JSON.stringify(notes);

    // Write data into file
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote,
};