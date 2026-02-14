// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем элементы
    const noteInput = document.getElementById('noteInput');
    const addBtn = document.getElementById('addBtn');
    const notesContainer = document.getElementById('notesContainer');
    
    // Загружаем заметки из localStorage
    let notes = [];
    
    function loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            notes = JSON.parse(savedNotes);
        }
        renderNotes();
    }
    
    // Сохраняем заметки
    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
    
    // Добавляем заметку
    function addNote() {
        const text = noteInput.value.trim();
        
        if (text === '') {
            alert('Введите текст заметки!');
            return;
        }
        
        // Создаем новую заметку
        const newNote = {
            id: Date.now(),
            text: text,
            date: new Date().toLocaleString('ru-RU')
        };
        
        // Добавляем в массив
        notes.push(newNote);
        
        // Сохраняем
        saveNotes();
        
        // Очищаем поле ввода
        noteInput.value = '';
        
        // Показываем сообщение
        console.log('Заметка добавлена!');
    }
    
    // Удаляем заметку
    function deleteNote(id) {
        notes = notes.filter(note => note.id !== id);
        saveNotes();
    }
    
    // Отображаем заметки
    function renderNotes() {
        if (notes.length === 0) {
            notesContainer.innerHTML = '<div class="empty-state">Нет заметок. Добавьте первую!</div>';
            return;
        }
        
        let html = '';
        
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            html += `
                <div class="note" data-id="${note.id}">
                    <div class="note-content">
                        <div class="note-text">${note.text}</div>
                        <div class="note-date">${note.date}</div>
                    </div>
                    <button class="delete-btn" onclick="deleteNoteHandler(${note.id})">Удалить</button>
                </div>
            `;
        }
        
        notesContainer.innerHTML = html;
    }
    
    // Обработчик удаления (глобальная функция)
    window.deleteNoteHandler = function(id) {
        deleteNote(id);
    };
    
    // Назначаем обработчик на кнопку Добавить
    addBtn.addEventListener('click', addNote);
    
    // Обработчик нажатия Enter
    noteInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNote();
        }
    });
    
    // Загружаем заметки при старте
    loadNotes();
    
});
