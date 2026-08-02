document.addEventListener('DOMContentLoaded', () => {
    // Настройка цветов оболочки Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        try {
            tg.setBackgroundColor('#ffffff');
            tg.setHeaderColor('#ffffff');
            if (tg.setBottomBarColor) {
                tg.setBottomBarColor('#ffffff');
            }
        } catch (e) {
            console.error('Error setting Telegram colors:', e);
        }
    }

    const noteInput = document.getElementById('note-input');
    const notesListEl = document.getElementById('notes-list');
    const addNoteBtn = document.getElementById('add-note-btn');
    const appContainer = document.getElementById('app');
    const backButton = document.getElementById('back-button');

    const modal = document.getElementById('delete-modal');
    const modalCancel = document.getElementById('modal-cancel');
    const modalDelete = document.getElementById('modal-delete');
    
    let notes = [];
    let currentNoteId = null;
    let modalConfirmCallback = null;
    let modalCancelCallback = null;

    // Функции модального окна
    function showDeleteModal(onConfirm, onCancel) {
        modalConfirmCallback = onConfirm;
        modalCancelCallback = onCancel;
        modal.classList.add('show');
    }

    modalCancel.addEventListener('click', () => {
        modal.classList.remove('show');
        if (modalCancelCallback) modalCancelCallback();
    });

    modalDelete.addEventListener('click', () => {
        modal.classList.remove('show');
        if (modalConfirmCallback) modalConfirmCallback();
    });

    // Загрузка заметок из памяти
    function loadNotes() {
        const savedData = localStorage.getItem('nofs_notes_data');
        if (savedData) {
            notes = JSON.parse(savedData);
        } else {
            // Миграция старой одиночной заметки, если есть
            const legacyNote = localStorage.getItem('nofs_note');
            if (legacyNote) {
                notes = [{ id: Date.now().toString(), content: legacyNote }];
                localStorage.removeItem('nofs_note');
            } else {
                notes = [{ id: Date.now().toString(), content: '' }]; // Создаем пустую по умолчанию
            }
        }
        
        // Если массив пуст (баг, если удалили все заметки до обновления) - создаем дефолтную
        if (!notes || notes.length === 0) {
            notes = [{ id: Date.now().toString(), content: '' }];
            saveNotes();
        }
        
        currentNoteId = notes[0].id;
    }

    // Сохранение заметок
    function saveNotes() {
        localStorage.setItem('nofs_notes_data', JSON.stringify(notes));
    }

    // Отрисовка списка
    function renderNotesList(animateFirst = false) {
        notesListEl.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.className = `note-item ${note.id === currentNoteId ? 'active' : ''}`;
            if (animateFirst && index === 0) {
                li.classList.add('new-item-animation');
            }
            
            let title = note.content.split('\n')[0].trim();
            if (!title) title = 'Новая заметка';
            if (title.length > 30) title = title.substring(0, 30) + '...';
            
            li.innerHTML = `
                <div class="note-delete-action">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4" />
                    </svg>
                </div>
                <div class="note-content" data-id="${note.id}">
                    <span class="note-text">${title}</span>
                    <div class="desktop-delete-btn" style="display: ${notes.length <= 1 ? 'none' : 'flex'};">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4" />
                        </svg>
                    </div>
                </div>
            `;
            
            const content = li.querySelector('.note-content');
            const deleteBg = li.querySelector('.note-delete-action');
            
            // Логика свайпа
            let startX = 0;
            let currentX = 0;
            
            content.addEventListener('touchstart', (e) => {
                if (notes.length <= 1) return; // Нельзя свайпать последнюю заметку
                startX = e.touches[0].clientX - currentX;
                content.style.transition = 'none';
            }, {passive: true});
            
            content.addEventListener('touchmove', (e) => {
                if (notes.length <= 1) return;
                const hiddenAmount = Math.max(0, (appContainer.offsetWidth * 0.15) - 20);
                // Разрешаем тянуть дальше для полного свайпа (160px видимой зоны)
                const maxDrag = -(160 + hiddenAmount); 
                
                const x = e.touches[0].clientX;
                currentX = x - startX;
                currentX = Math.max(Math.min(currentX, 0), maxDrag);
                content.style.transform = `translateX(${currentX}px)`;
            }, {passive: true});
            
            content.addEventListener('touchend', () => {
                if (notes.length <= 1) return;
                const hiddenAmount = Math.max(0, (appContainer.offsetWidth * 0.15) - 20);
                const snapX = -(80 + hiddenAmount);
                const fullSwipeX = -(100 + hiddenAmount); // Порог сильного свайпа
                
                content.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
                
                if (currentX <= fullSwipeX) {
                    // Дотянули — фиксируем на позиции мусорки и показываем окно
                    content.style.transform = `translateX(${snapX}px)`;
                    currentX = snapX;
                    handleDelete();
                } else {
                    // Не дотянули — всегда возвращаем обратно
                    content.style.transform = `translateX(0px)`;
                    currentX = 0;
                }
            });
            
            // Вынесли удаление в отдельную функцию
            const handleDelete = () => {
                showDeleteModal(() => {
                    notes = notes.filter(n => n.id !== note.id);
                    saveNotes();
                    if (currentNoteId === note.id && notes.length > 0) {
                        selectNote(notes[0].id);
                    } else if (notes.length === 0) {
                        noteInput.value = '';
                        currentNoteId = null;
                        renderNotesList();
                    } else {
                        renderNotesList();
                    }
                }, () => {
                    // Отмена удаления
                    content.style.transform = `translateX(0px)`;
                    currentX = 0;
                });
            };
            
            // Удаление заметки по клику на иконку (свайп-меню)
            deleteBg.addEventListener('click', (e) => {
                e.stopPropagation();
                handleDelete();
            });

            // Выбор заметки или удаление по клику
            content.addEventListener('click', (e) => {
                if (e.target.closest('.desktop-delete-btn')) {
                    e.stopPropagation();
                    if (notes.length > 1) {
                        handleDelete();
                    }
                    return;
                }
                
                // Если заметка приоткрыта для удаления, клик её просто закроет
                if (currentX < 0) {
                    content.style.transform = `translateX(0px)`;
                    currentX = 0;
                    return;
                }
                
                if (!appContainer.classList.contains('slide-out') || e.target.closest('.note-content')) {
                    selectNote(note.id);
                    appContainer.classList.remove('slide-out');
                }
            });
            
            notesListEl.appendChild(li);
        });
    }

    // Выбор заметки
    function selectNote(id) {
        currentNoteId = id;
        const note = notes.find(n => n.id === id);
        if (note) {
            noteInput.value = note.content;
        }
        renderNotesList();
    }

    // Инициализация
    loadNotes();
    selectNote(currentNoteId);

    // Автосохранение при вводе
    noteInput.addEventListener('input', () => {
        const note = notes.find(n => n.id === currentNoteId);
        if (note) {
            note.content = noteInput.value;
            saveNotes();
            renderNotesList(); 
        }
    });

    // Создание новой заметки
    addNoteBtn.addEventListener('click', () => {
        const newNote = { id: Date.now(), content: '' };
        notes.unshift(newNote); // Добавляем в начало списка
        saveNotes();
        
        currentNoteId = newNote.id;
        noteInput.value = '';
        renderNotesList(true); // Передаем true для включения анимации
    });

    // Анимация съезда экрана вправо / возврат обратно, и скрытие клавиатуры
    backButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (appContainer.classList.contains('slide-out')) {
            if (currentNoteId) {
                appContainer.classList.remove('slide-out');
            }
        } else {
            appContainer.classList.add('slide-out');
            noteInput.blur(); // Принудительно закрываем клавиатуру
        }
    });

    // Возврат при тапе по выглядывающему краю заметки
    appContainer.addEventListener('click', (e) => {
        if (appContainer.classList.contains('slide-out')) {
            if (!e.target.closest('#back-button')) {
                // Открываем только если есть выбранная заметка
                if (currentNoteId) {
                    appContainer.classList.remove('slide-out');
                }
            }
        }
    });
});
