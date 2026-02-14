// Приложение для заметок
class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.init();
    }
    
    init() {
        this.input = document.getElementById('noteInput');
        this.addBtn = document.getElementById('addBtn');
        this.notesList = document.getElementById('notesList');
        
        this.addBtn.addEventListener('click', () => this.addNote());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNote();
        });
        
        this.render();
    }
    
    addNote() {
        const text = this.input.value.trim();
        if (text) {
            this.notes.push({
                id: Date.now(),
                text: text,
                date: new Date().toLocaleString()
            });
            this.saveNotes();
            this.input.value = '';
            this.render();
        }
    }
    
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.render();
    }
    
    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
    
    render() {
        if (this.notes.length === 0) {
            this.notesList.innerHTML = '<div class="empty-state">Нет заметок. Добавьте первую!</div>';
            return;
        }
        
        this.notesList.innerHTML = this.notes.map(note => `
            <div class="note" onclick="app.deleteNote(${note.id})">
                <div class="note-text">
                    <div style="font-weight: bold; margin-bottom: 5px;">${note.text}</div>
                    <small style="color: #999;">${note.date}</small>
                </div>
                <button class="delete-btn">Удалить</button>
            </div>
        `).join('');
    }
}

// Запуск приложения
const app = new NotesApp();
