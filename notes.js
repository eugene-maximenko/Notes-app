const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(element => element.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        console.log('New note added');
    } else {
        console.log('Note title taken!')
    }


};

const removeNote = title => {
    const notes = loadNotes();

    const newNotes = notes.filter(element => element.title !== title);

    if (notes.length > newNotes.length) {
        console.log(chalk.green.bold.inverse('Note removed!'));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red.bold.inverse('No note found!'));
    }
}

const listNotes = () => {
    console.log(chalk.bgYellow.inverse('Your notes'));
    const notes = loadNotes;

    if (notes.length >= 0) {
        notes.forEach(element => {
            console.log(element.title);
        })
    } else {
        console.log(chalk.red.inverse('Here is no note!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(element => element.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }


};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};