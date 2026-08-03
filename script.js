document.addEventListener('DOMContentLoaded', () => {
    // Настройка цветов оболочки Telegram Mini App
    function updateTelegramColors(isDark) {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            try {
                const bgColor = isDark ? '#262626' : '#ffffff'; // hsl(0, 0%, 15%) / hsl(0, 0%, 100%)
                const headerColor = isDark ? '#262626' : '#ffffff';
                tg.setBackgroundColor(bgColor);
                tg.setHeaderColor(headerColor);
                if (tg.setBottomBarColor) {
                    tg.setBottomBarColor(bgColor);
                }
            } catch (e) {
                console.error('Error setting Telegram colors:', e);
            }
        }
    }

    // Словари для переводов
    const translations = {
        ru: {
            myNotes: "Мои заметки",
            newNote: "+ Новая заметка",
            startTyping: "Начните писать...",
            deleteTitle: "Удалить заметку?",
            deleteDesc: "Вы действительно хотите удалить эту заметку? Это действие нельзя отменить.",
            cancel: "Отмена",
            delete: "Удалить",
            settingsTitle: "Настройки",
            themeLabel: "Тема",
            themeLight: "Светлая",
            themeDark: "Темная",
            langLabel: "Язык",
            close: "Закрыть",
            newNoteTitle: "Новая заметка"
        },
        en: {
            myNotes: "My Notes",
            newNote: "+ New Note",
            startTyping: "Start typing...",
            deleteTitle: "Delete Note?",
            deleteDesc: "Are you sure you want to delete this note? This action cannot be undone.",
            cancel: "Cancel",
            delete: "Delete",
            settingsTitle: "Settings",
            themeLabel: "Theme",
            themeLight: "Light",
            themeDark: "Dark",
            langLabel: "Language",
            close: "Close",
            newNoteTitle: "New Note"
        },
        de: {
            myNotes: "Meine Notizen",
            newNote: "+ Neue Notiz",
            startTyping: "Fangen Sie an zu tippen...",
            deleteTitle: "Notiz löschen?",
            deleteDesc: "Möchten Sie diese Notiz wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
            cancel: "Abbrechen",
            delete: "Löschen",
            settingsTitle: "Einstellungen",
            themeLabel: "Design",
            themeLight: "Hell",
            themeDark: "Dunkel",
            langLabel: "Sprache",
            close: "Schließen",
            newNoteTitle: "Neue Notiz"
        },
        uk: {
            myNotes: "Мої нотатки",
            newNote: "+ Нова нотатка",
            startTyping: "Почніть писати...",
            deleteTitle: "Видалити нотатку?",
            deleteDesc: "Ви дійсно хочете видалити цю нотатку? Цю дію неможливо скасувати.",
            cancel: "Скасувати",
            delete: "Видалити",
            settingsTitle: "Налаштування",
            themeLabel: "Тема",
            themeLight: "Світла",
            themeDark: "Темна",
            langLabel: "Мова",
            close: "Закрити",
            newNoteTitle: "Нова нотатка"
        }
    };

    let currentLang = localStorage.getItem('nofs_lang') || 'ru';
    let currentTheme = localStorage.getItem('nofs_theme') || 'light';

    function applyTranslations() {
        const t = translations[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) el.placeholder = t[key];
        });
        renderNotesList(); // Перерендерить список, чтобы обновить "Новая заметка"
    }

    function applyTheme() {
        if (currentTheme === 'dark') {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.remove('theme-dark');
        }
        updateTelegramColors(currentTheme === 'dark');
    }

    // Эти функции вызываются позже, после инициализации переменных

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
            if (!title) title = translations[currentLang].newNoteTitle;
            if (title.length > 30) title = title.substring(0, 30) + '...';
            
            li.innerHTML = `
                <div class="note-content" data-id="${note.id}">
                    <span class="note-text">${title}</span>
                    <div class="delete-btn" style="display: ${notes.length <= 1 ? 'none' : 'flex'};">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4" />
                        </svg>
                    </div>
                </div>
            `;
            
            const content = li.querySelector('.note-content');
            
            // Логика свайпа
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            
            content.addEventListener('touchstart', (e) => {
                if (notes.length <= 1) return; // Нельзя свайпать последнюю заметку
                isDragging = false;
                startX = e.touches[0].clientX - currentX;
                content.style.transition = 'none';
                
                const deleteBtn = li.querySelector('.delete-btn');
                if (deleteBtn) deleteBtn.style.transition = 'none';
            }, {passive: true});
            
            content.addEventListener('touchmove', (e) => {
                if (notes.length <= 1) return;
                isDragging = true;
                const hiddenAmount = Math.max(0, (appContainer.offsetWidth * 0.15) - 20);
                // Разрешаем тянуть дальше для полного свайпа (160px видимой зоны)
                const maxDrag = -(160 + hiddenAmount); 
                
                const x = e.touches[0].clientX;
                currentX = x - startX;
                currentX = Math.max(Math.min(currentX, 0), maxDrag);
                content.style.transform = `translateX(${currentX}px)`;
                
                // Анимация тягучести корзины
                const deleteBtn = li.querySelector('.delete-btn');
                if (deleteBtn) {
                    const progress = Math.abs(currentX) / (80 + hiddenAmount);
                    // Иконка растет от 0.4 до 1.15 при перетягивании
                    const scale = Math.min(1.15, Math.max(0.4, progress));
                    // Эффект сопротивления: иконка выныривает с задержкой (тянется)
                    const elasticX = Math.max(0, (1 - progress) * 35);
                    
                    deleteBtn.style.transform = `translateY(-50%) translateX(${elasticX}px) scale(${scale})`;
                }
            }, {passive: true});
            
            content.addEventListener('touchend', () => {
                if (notes.length <= 1) return;
                const hiddenAmount = Math.max(0, (appContainer.offsetWidth * 0.15) - 20);
                const snapX = -(80 + hiddenAmount);
                const fullSwipeX = -(100 + hiddenAmount); // Порог сильного свайпа
                
                content.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
                
                const deleteBtn = li.querySelector('.delete-btn');
                if (deleteBtn) {
                    // Пружинящий возврат
                    deleteBtn.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }
                
                if (currentX <= fullSwipeX) {
                    // Дотянули — фиксируем на позиции мусорки и показываем окно
                    content.style.transform = `translateX(${snapX}px)`;
                    currentX = snapX;
                    if (deleteBtn) deleteBtn.style.transform = `translateY(-50%) translateX(0px) scale(1)`;
                    handleDelete();
                } else {
                    // Не дотянули — всегда возвращаем обратно
                    content.style.transform = `translateX(0px)`;
                    currentX = 0;
                    if (deleteBtn) deleteBtn.style.transform = `translateY(-50%) translateX(35px) scale(0.4)`;
                }
                
                // Увеличили задержку до 300мс, так как некоторые мобильные браузеры
                // генерируют событие click с большой задержкой после touchend
                setTimeout(() => { isDragging = false; }, 300);
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
            
            // Выбор заметки или удаление по клику
            content.addEventListener('click', (e) => {
                if (isDragging) {
                    e.stopPropagation();
                    return;
                }
                
                if (e.target.closest('.delete-btn')) {
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

    // Применяем язык и тему после загрузки заметок
    applyTranslations();
    applyTheme();

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

    // --- Настройки (Меню) ---
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const settingsCloseBtn = document.getElementById('settings-close');
    
    const themeTumbler = document.getElementById('theme-tumbler');
    const langTumbler = document.getElementById('lang-tumbler');

    // Устанавливаем текущие значения при старте
    themeTumbler.setAttribute('data-active-index', currentTheme === 'dark' ? '1' : '0');
    const langOptions = ['en', 'de', 'ru', 'uk'];
    const currentLangIndex = langOptions.indexOf(currentLang) !== -1 ? langOptions.indexOf(currentLang) : 2;
    langTumbler.setAttribute('data-active-index', currentLangIndex.toString());

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsModal.classList.add('show');
    });

    settingsCloseBtn.addEventListener('click', () => {
        settingsModal.classList.remove('show');
    });

    // Обработка кликов по опциям темы
    themeTumbler.querySelectorAll('.tumbler-option').forEach((opt, index) => {
        opt.addEventListener('click', () => {
            currentTheme = opt.getAttribute('data-value');
            themeTumbler.setAttribute('data-active-index', index);
            localStorage.setItem('nofs_theme', currentTheme);
            applyTheme();
        });
    });

    // Обработка кликов по опциям языка
    langTumbler.querySelectorAll('.tumbler-option').forEach((opt, index) => {
        opt.addEventListener('click', () => {
            currentLang = opt.getAttribute('data-value');
            langTumbler.setAttribute('data-active-index', index);
            localStorage.setItem('nofs_lang', currentLang);
            applyTranslations();
        });
    });
});
