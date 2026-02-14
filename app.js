// Простое и надежное приложение для заметок
(function() {
    'use strict';
    
    // Ждем загрузки страницы
    window.addEventListener('load', function() {
        
        // Получаем элементы
        const noteInput = document.getElementById('noteInput');
        const addBtn = document.getElementById('addBtn');
        const notesContainer = document.getElementById('notesContainer');
        
        // Проверяем что все элементы найдены
        if (!noteInput || !addBtn || !notesContainer) {
            alert('Ошибка загрузки приложения');
            return;
        }
        
        // Массив с заметками
        let notes = [];
        
        // Загружаем сохраненные заметки
        function loadNotes() {
            try {
                const saved = localStorage.getItem('myNotes');
                if (saved) {
                    notes = JSON.parse(saved);
                }
            } catch(e) {
                console.log('Ошибка загрузки');
                notes = [];
            }
            showNotes();
        }
        
        // Сохраняем заметки
        function saveNotes() {
            try {
                localStorage.setItem('myNotes', JSON.stringify(notes));
            } catch(e) {
                alert('Не удалось сохранить заметку');
            }
        }
        
        // Показываем заметки на экране
        function showNotes() {
            if (notes.length === 0) {
                notesContainer.innerHTML = '<div class="empty-state">Нет заметок</div>';
                return;
            }
            
            let html = '';
            for (let i = 0; i < notes.length; i++) {
                const note = notes[i];
                html += '<div class="note">';
                html += '<div class="note-text">' + note.text + '</div>';
                html += '<div class="note-date">' + note.date + '</div>';
                html += '<button class="delete-btn" data-id="' + note.id + '">Удалить</button>';
                html += '</div>';
            }
            notesContainer.innerHTML = html;
            
            // Добавляем обработчики для кнопок удаления
            const deleteButtons = document.querySelectorAll('.delete-btn');
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener('click', function(e) {
                    const id = parseInt(this.getAttribute('data-id'));
                    deleteNote(id);
                });
            }
        }
        
        // Добавляем новую заметку
        function addNewNote() {
            const text = noteInput.value.trim();
            
            if (text === '') {
                alert('Введите текст заметки');
                return;
            }
            
            // Создаем заметку
            const now = new Date();
            const dateStr = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear() + ' ' + 
                           now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
            
            const newNote = {
                id: Date.now(),
                text: text,
                date: dateStr
            };
            
            // Добавляем в массив
            notes.push(newNote);
            
            // Сохраняем
            saveNotes();
            
            // Очищаем поле
            noteInput.value = '';
            
            // Обновляем экран
            showNotes();
        }
        
        // Удаляем заметку
        function deleteNote(id) {
            const newNotes = [];
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].id !== id) {
                    newNotes.push(notes[i]);
                }
            }
            notes = newNotes;
            saveNotes();
            showNotes();
        }
        
        // Назначаем обработчики
        addBtn.onclick = function() {
            addNewNote();
        };
        
        noteInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                addNewNote();
            }
        };
        
        // Загружаем заметки
        loadNotes();
        
    });
    
})();
