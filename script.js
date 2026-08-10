document.addEventListener('DOMContentLoaded', () => {
    function applyAppleEmojis(element) {
        if (typeof twemoji !== 'undefined' && element) {
            twemoji.parse(element, {
                base: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/',
                folder: 'apple/64',
                ext: '.png',
                className: 'apple-emoji'
            });
        }
    }

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
            myNotes: "Все заметки",
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
            newNoteTitle: "Новая заметка",
            selectIconTitle: "Выберите иконку",
            deleteFolderTitle: "Удалить папку?",
            deleteFolderDesc: "Вы действительно хотите удалить эту папку и ВСЕ заметки в ней?",
            createNote: "Создать заметку",
            createFolder: "Создать папку",
            starNote: "Отметить",
            unstarNote: "Снять отметку",
            trashBtn: "Корзина",
            spellcheck: "Подчёркивать неправильную грамматику",
            commands: "Отключить команды",
            storageLimit: "Лимиты Telegram",
            emptyTrash: "Корзина пуста",
            restoreBtn: "Восстановить",
            deletePermanentlyBtn: "Удалить навсегда",
            batchDeleteTitle: "Вы уверены, что хотите удалить выделенные заметки?"
        },
        en: {
            myNotes: "All Notes",
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
            newNoteTitle: "New Note",
            selectIconTitle: "Select Icon",
            deleteFolderTitle: "Delete Folder?",
            deleteFolderDesc: "Are you sure you want to delete this folder and ALL notes inside it?",
            createNote: "Create Note",
            createFolder: "Create Folder",
            starNote: "Star",
            unstarNote: "Unstar",
            trashBtn: "Trash",
            spellcheck: "Highlight incorrect grammar",
            commands: "Disable commands",
            storageLimit: "Telegram Limits",
            emptyTrash: "Trash is empty",
            restoreBtn: "Restore",
            deletePermanentlyBtn: "Delete Permanently",
            batchDeleteTitle: "Are you sure you want to delete selected notes?"
        },
        de: {
            myNotes: "Alle Notizen",
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
            newNoteTitle: "Neue Notiz",
            selectIconTitle: "Symbol wählen",
            deleteFolderTitle: "Ordner löschen?",
            deleteFolderDesc: "Möchten Sie diesen Ordner und ALLE darin enthaltenen Notizen wirklich löschen?",
            createNote: "Notiz erstellen",
            createFolder: "Ordner erstellen",
            starNote: "Markieren",
            unstarNote: "Markierung aufheben",
            trashBtn: "Papierkorb",
            spellcheck: "Falsche Grammatik hervorheben",
            commands: "Befehle deaktivieren",
            storageLimit: "Telegram-Limits",
            emptyTrash: "Papierkorb ist leer",
            restoreBtn: "Wiederherstellen",
            deletePermanentlyBtn: "Dauerhaft löschen",
            batchDeleteTitle: "Ausgewählte Notizen wirklich löschen?"
        },
        uk: {
            myNotes: "Всі нотатки",
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
            newNoteTitle: "Нова нотатка",
            selectIconTitle: "Виберіть іконку",
            deleteFolderTitle: "Видалити папку?",
            deleteFolderDesc: "Ви дійсно хочете видалити цю папку та ВСІ нотатки в ній?",
            createNote: "Створити нотатку",
            createFolder: "Створити папку",
            starNote: "Відмітити",
            unstarNote: "Зняти відмітку",
            trashBtn: "Кошик",
            spellcheck: "Підкреслювати неправильну граматику",
            commands: "Відключити команди",
            storageLimit: "Ліміти Telegram",
            emptyTrash: "Кошик порожній",
            restoreBtn: "Відновити",
            deletePermanentlyBtn: "Видалити назавжди",
            batchDeleteTitle: "Ви впевнені, що хочете видалити виділені нотатки?"
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
    
    const sidebarFoldersList = document.getElementById('folders-list');
    const iconPickerModal = document.getElementById('icon-picker-modal');
    const iconPickerCancel = document.getElementById('icon-picker-cancel');
    const createModal = document.getElementById('create-modal');
    const createModalCancel = document.getElementById('create-modal-cancel');

    // Selection Mode elements
    const selectionActionBar = document.getElementById('selection-action-bar');
    const batchCancelBtn = document.getElementById('batch-cancel-btn');


    const batchStarBtn = document.getElementById('batch-star-btn');
    const batchDeleteBtn = document.getElementById('batch-delete-btn');
    
    let isSelectionMode = false;
    let selectedNotes = new Set();
    const createModalNoteBtn = document.getElementById('create-modal-note');
    const createModalFolderBtn = document.getElementById('create-modal-folder');
    const iconGrid = document.getElementById('icon-grid');
    const folderIconsList = [
        '😀', '😂', '😇', '😍', '😎', '🥺', '😡', '🥵',
        '😈', '🤡', '👽', '🎃', '👍', '👎', '🧠', '🫀',
        '🐻', '🐹', '🐷', '🐸', '🐥', '🐝', '🦋', '🪼',
        '🌿', '🪴', '🌷', '🌸', '🌎', '✨', '🔥', '❄️',
        '🍏', '🍎', '🍑', '🍉', '🍅', '🥦', '🌶', '🌽',
        '⚽️', '🏀', '🏈', '⚾️', '🎲', '🧩', '🎬', '🎧',
        '⚙️', '💎', '💣', '🧨', '🩷', '❤️', '🧡', '💛',
        '💚', '🩵', '💙', '💜', '⛔️', '♻️', '🌀', '🏳️‍🌈'
    ];
    
    let folders = [];
    let currentFolderId = 'all';
    let editingFolderId = null;
    
    let notes = [];
    let currentNoteId = null;
    let modalConfirmCallback = null;
    let modalCancelCallback = null;
    let modalChangeIconCallback = null;

    // Функция показа модального окна удаления/настроек
    function showDeleteModal(onConfirm, onCancel, isFolder = false, onChangeIcon = null) {
        modalConfirmCallback = onConfirm;
        modalCancelCallback = onCancel;
        modalChangeIconCallback = onChangeIcon;
        
        const titleEl = modal.querySelector('div[data-i18n]');
        const changeIconBtn = document.getElementById('modal-change-icon');
        const t = translations[currentLang];
        
        if (titleEl) {
            if (isFolder) {
                titleEl.style.display = 'none';
                if (changeIconBtn) changeIconBtn.style.display = 'block';
            } else {
                titleEl.textContent = t.batchDeleteTitle || 'Вы уверены, что хотите удалить выделенные заметки?';
                titleEl.style.display = 'block';
                if (changeIconBtn) changeIconBtn.style.display = 'none';
            }
        }
        
        modal.classList.add('show');
        if (batchDeleteBtn) {
            batchDeleteBtn.classList.add('active-red');
        }
    }

    const modalChangeIconBtn = document.getElementById('modal-change-icon');
    if (modalChangeIconBtn) {
        modalChangeIconBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            if (batchDeleteBtn) {
                batchDeleteBtn.classList.remove('active-red');
            }
            if (modalChangeIconCallback) modalChangeIconCallback();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            if (batchDeleteBtn) {
                batchDeleteBtn.classList.remove('active-red');
            }
            if (modalCancelCallback) modalCancelCallback();
        }
    });

    modalDelete.addEventListener('click', () => {
        modal.classList.remove('show');
        if (batchDeleteBtn) {
            batchDeleteBtn.classList.remove('active-red');
        }
        if (modalConfirmCallback) modalConfirmCallback();
    });

    // Загрузка папок
    function loadFolders() {
        const savedData = localStorage.getItem('nofs_folders_data');
        if (savedData) {
            folders = JSON.parse(savedData);
        } else {
            folders = [{ id: 'main', icon: '📝' }];
            saveFolders();
        }
    }

    function saveFolders() {
        localStorage.setItem('nofs_folders_data', JSON.stringify(folders));
    }

    // Загрузка заметок из памяти
    function loadNotes() {
        const savedData = localStorage.getItem('nofs_notes_data');
        if (savedData) {
            notes = JSON.parse(savedData);
            let modified = false;
            notes.forEach(n => {
                if (!n.folderId) {
                    n.folderId = folders.length > 0 ? folders[0].id : 'main';
                    modified = true;
                }
            });
            if (modified) saveNotes();
        } else {
            const legacyNote = localStorage.getItem('nofs_note');
            if (legacyNote) {
                notes = [{ id: Date.now().toString(), content: legacyNote, folderId: folders.length > 0 ? folders[0].id : 'main' }];
                localStorage.removeItem('nofs_note');
            } else {
                notes = [];
            }
        }
        if (!notes) notes = [];
        if (notes.length > 0) {
            currentNoteId = notes[0].id;
        } else {
            currentNoteId = null;
        }
    }

    function saveNotes() {
        localStorage.setItem('nofs_notes_data', JSON.stringify(notes));
    }

    function renderNotesList(animateFirst = false) {
        notesListEl.innerHTML = '';
        if (addNoteBtn) addNoteBtn.style.display = 'flex';
        const activeNotes = notes.filter(n => !n.isDeleted);
        const filteredNotes = currentFolderId === 'all' 
            ? activeNotes 
            : activeNotes.filter(n => n.folderId === currentFolderId);
        filteredNotes.sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));
        filteredNotes.forEach((note, index) => {
            const li = document.createElement('li');
            li.className = `note-item ${note.id === currentNoteId ? 'active' : ''}`;
            li.dataset.noteId = note.id;
            if (animateFirst && index === 0) li.classList.add('new-item-animation');
            let title = '';
            if (note.title && note.title.trim() !== '') {
                title = note.title.trim();
            } else {
                title = note.content.split('\\n')[0].trim();
            }
            if (!title) title = translations[currentLang].newNoteTitle;
            if (title.length > 30) title = title.substring(0, 30) + '...';
            const starHtml = note.starred ? `
                <svg class="note-star" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" />
                </svg>
            ` : '';
            const isChecked = selectedNotes.has(note.id);
            li.innerHTML = `
                <div class="note-content" data-id="${note.id}">
                    <span class="note-text">${title}</span>
                    ${starHtml}
                    <div class="note-checkbox ${isChecked ? 'checked' : ''}"></div>
                </div>
            `;
            const content = li.querySelector('.note-content');
            let notePressTimer;
            let isPressing = false;
            const startNotePress = (e) => {
                if (e.button && e.button !== 0) return;
                isPressing = false;
                content.classList.add('pressing');
                notePressTimer = setTimeout(() => {
                    isPressing = true;
                    content.classList.remove('pressing');
                    if (!isSelectionMode) {
                        isSelectionMode = true;
                        document.body.classList.add('selection-mode');
                        selectionActionBar.classList.add('show');
                    }
                    if (!selectedNotes.has(note.id)) {
                        selectedNotes.add(note.id);
                        content.querySelector('.note-checkbox').classList.add('checked');
                    }
                    if (typeof updateDeleteBtnUI === 'function') updateDeleteBtnUI();
                }, 600);
            };
            const cancelNotePress = () => {
                clearTimeout(notePressTimer);
                content.classList.remove('pressing');
            };
            content.addEventListener('mousedown', startNotePress);
            content.addEventListener('touchstart', startNotePress, {passive: true});
            content.addEventListener('mouseup', cancelNotePress);
            content.addEventListener('mouseleave', cancelNotePress);
            content.addEventListener('touchend', cancelNotePress);
            content.addEventListener('touchmove', cancelNotePress, {passive: true});
            content.addEventListener('click', (e) => {
                if (isPressing) { e.stopPropagation(); return; }
                if (isSelectionMode) {
                    e.stopPropagation();
                    if (selectedNotes.has(note.id)) {
                        selectedNotes.delete(note.id);
                        content.querySelector('.note-checkbox').classList.remove('checked');
                    } else {
                        selectedNotes.add(note.id);
                        content.querySelector('.note-checkbox').classList.add('checked');
                    }
                    if (typeof updateDeleteBtnUI === 'function') updateDeleteBtnUI();
                    return;
                }
                if (!appContainer.classList.contains('slide-out') || e.target.closest('.note-content')) {
                    selectNote(note.id);
                    appContainer.classList.remove('slide-out');
                }
            });
            notesListEl.appendChild(li);
        });
        applyAppleEmojis(notesListEl);
    }

    function selectNote(id) {
        currentNoteId = id;
        const note = notes.find(n => n.id === id);
        if (note) {
            noteInput.value = note.content;
        }
        renderNotesList();
    }

    function updateDeleteBtnUI() {
        batchDeleteBtn.style.opacity = '1';
        batchDeleteBtn.style.pointerEvents = 'auto';
    }

    loadFolders();
    loadNotes();

    function renderSidebar() {
        sidebarFoldersList.innerHTML = '';
        const allNotesDiv = document.createElement('div');
        allNotesDiv.className = `folder-icon ${currentFolderId === 'all' ? 'active' : ''}`;
        allNotesDiv.style.opacity = currentFolderId === 'all' ? '1' : '0.3';
        allNotesDiv.style.transition = 'opacity 0.2s';
        allNotesDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M5.5 3A1.5 1.5 0 0 1 7 4.5v15A1.5 1.5 0 0 1 5.5 21h-2A1.5 1.5 0 0 1 2 19.5v-15A1.5 1.5 0 0 1 3.5 3zm6 0A1.5 1.5 0 0 1 13 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 8 19.5v-15A1.5 1.5 0 0 1 9.5 3zm7.281 3.124l3.214 12.519a1.5 1.5 0 0 1-1.08 1.826l-1.876.48a1.5 1.5 0 0 1-1.826-1.08L13.999 7.354a1.5 1.5 0 0 1 1.08-1.826l1.876-.483a1.5 1.5 0 0 1 1.826 1.08" /></svg>`;
        allNotesDiv.onclick = () => {
            currentFolderId = 'all';
            renderSidebar();
            if (notes.length > 0) {
                selectNote(notes[0].id);
            } else {
                noteInput.value = '';
                currentNoteId = null;
                renderNotesList();
            }
        };
        sidebarFoldersList.appendChild(allNotesDiv);
        folders.forEach(folder => {
            const folderDiv = document.createElement('div');
            folderDiv.className = `folder-icon ${currentFolderId === folder.id ? 'active' : ''}`;
            folderDiv.textContent = folder.icon;
            folderDiv.onclick = () => {
                currentFolderId = folder.id;
                renderSidebar();
                const folderNotes = notes.filter(n => n.folderId === folder.id);
                if (folderNotes.length > 0) {
                    selectNote(folderNotes[0].id);
                } else {
                    noteInput.value = '';
                currentNoteId = null;
                    renderNotesList();
                }
            };
            let pressTimer;
            const startPress = (e) => {
                folderDiv.classList.add('pressing');
                pressTimer = setTimeout(() => {
                    folderDiv.classList.remove('pressing');
                    showDeleteModal(() => {
                        folders = folders.filter(f => f.id !== folder.id);
                        saveFolders();
                        notes.forEach(n => {
                            if (n.folderId === folder.id) {
                                n.isDeleted = true;
                                n.deletedAt = new Date().toISOString();
                            }
                        });
                        const activeNotes = notes.filter(n => !n.isDeleted);
                        if (activeNotes.length === 0) {
                            let target = folders.length > 0 ? folders[0].id : 'main';
                            notes.unshift({ id: Date.now().toString(), content: '', folderId: target });
                        }
                        saveNotes();
             // Иконки
                        currentFolderId = 'all';
                        renderSidebar();
                        const updatedNotes = notes.filter(n => !n.isDeleted);
                        if (updatedNotes.length > 0) {
                            selectNote(updatedNotes[0].id);
                        } else {
                            noteInput.value = '';
                            currentNoteId = null;
                            renderNotesList();
                        }
                    }, null, true, () => {
                        editingFolderId = folder.id;
                        iconPickerModal.classList.add('show');
                    });
                }, 800);
            };
            const cancelPress = () => {
                clearTimeout(pressTimer);
                folderDiv.classList.remove('pressing');
            };
            folderDiv.addEventListener('mousedown', startPress);
            folderDiv.addEventListener('touchstart', startPress, {passive: true});
            folderDiv.addEventListener('mouseup', cancelPress);
            folderDiv.addEventListener('mouseleave', cancelPress);
            folderDiv.addEventListener('touchend', cancelPress);
            folderDiv.addEventListener('touchmove', cancelPress, {passive: true});
            sidebarFoldersList.appendChild(folderDiv);
        });
        applyAppleEmojis(sidebarFoldersList);
    }
    
    // Иконки
    folderIconsList.forEach(icon => {
        const div = document.createElement('div');
        div.className = 'icon-option';
        div.textContent = icon;
        div.onclick = () => {
            if (editingFolderId) {
                const f = folders.find(f => f.id === editingFolderId);
                if (f) f.icon = icon;
                saveFolders();
                renderSidebar();
                editingFolderId = null;
            } else {
                const newFolder = { id: 'f_' + Date.now(), icon: icon };
                folders.push(newFolder);
                saveFolders();
                currentFolderId = newFolder.id;
                renderSidebar();
                
                noteInput.value = '';
                currentNoteId = null;
                renderNotesList();
            }
            iconPickerModal.classList.remove('show');
        };
        iconGrid.appendChild(div);
    });
    applyAppleEmojis(iconGrid);
    
    createModalFolderBtn.addEventListener('click', () => {
        editingFolderId = null;
        createModal.classList.remove('show');
        iconPickerModal.classList.add('show');
    });
    
    iconPickerModal.addEventListener('click', (e) => {
        if (e.target === iconPickerModal) {
            iconPickerModal.classList.remove('show');
        }
    });
    
    renderSidebar();
    
    selectNote(currentNoteId);

    // Применяем язык и тему после загрузки заметок
    applyTranslations();
    applyTheme();

    // Автосохранение при вводе
    noteInput.addEventListener('input', () => {
        let note = notes.find(n => n.id === currentNoteId);
        if (!note && noteInput.value !== '') {
            let targetFolder = currentFolderId;
            if (targetFolder === 'all') {
                targetFolder = folders.length > 0 ? folders[0].id : 'main';
            }
            note = { id: Date.now().toString(), content: noteInput.value, folderId: targetFolder };
            notes.unshift(note);
            currentNoteId = note.id;
        }
        if (note) {
            note.content = noteInput.value;
            saveNotes();
            renderNotesList(); 
        }
    });

// Открытие окна "Что создать?"
    addNoteBtn.addEventListener('click', () => {
        createModal.classList.add('show');
    });

    // Создание новой заметки
    createModalNoteBtn.addEventListener('click', () => {
        createModal.classList.remove('show');
        let targetFolder = currentFolderId;
        if (targetFolder === 'all') {
            targetFolder = folders.length > 0 ? folders[0].id : 'main';
        }
        const newNote = { id: Date.now().toString(), title: '', content: '', folderId: targetFolder };
        notes.unshift(newNote); 
        saveNotes();
        
        currentNoteId = newNote.id;
        noteInput.value = '';
        renderNotesList(true); 
    });
    // --- Selection Mode Actions ---
    function exitSelectionMode() {
        isSelectionMode = false;
        selectedNotes.clear();
        document.body.classList.remove('selection-mode');
        selectionActionBar.classList.remove('show');
        if (typeof updateDeleteBtnUI === 'function') updateDeleteBtnUI();
        renderNotesList();
    }

    batchCancelBtn.addEventListener('click', exitSelectionMode);

    batchStarBtn.addEventListener('click', () => {
        if (selectedNotes.size === 0) return;
        
        // 1. Capture old positions for FLIP
        const notesListEl = document.getElementById('notes-list');
        const oldPositions = new Map();
        Array.from(notesListEl.children).forEach(item => {
            if (item.dataset.noteId) {
                oldPositions.set(item.dataset.noteId, item.getBoundingClientRect().top);
            }
        });

        let anyUnstarred = false;
        selectedNotes.forEach(id => {
            const note = notes.find(n => n.id === id);
            if (note && !note.starred) anyUnstarred = true;
        });
        
        selectedNotes.forEach(id => {
            const note = notes.find(n => n.id === id);
            if (note) note.starred = anyUnstarred;
        });
        
        saveNotes();
        renderNotesList();

        // 2. Play FLIP animation
        const newItems = Array.from(notesListEl.children);
        newItems.forEach(item => {
            const id = item.dataset.noteId;
            if (id && oldPositions.has(id)) {
                const oldTop = oldPositions.get(id);
                const newTop = item.getBoundingClientRect().top;
                const deltaY = oldTop - newTop;
                
                if (deltaY !== 0) {
                    item.style.transform = `translateY(${deltaY}px)`;
                    item.style.transition = 'none';
                }
            }
        });
        
        // Force reflow
        notesListEl.offsetHeight; 
        
        newItems.forEach(item => {
            if (item.style.transform) {
                item.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                item.style.transform = '';
                
                setTimeout(() => {
                    item.style.transition = '';
                }, 400);
            }
        });
    });


    batchDeleteBtn.addEventListener('click', () => {
        if (selectedNotes.size === 0) return;
        
        showDeleteModal(() => {
            notes.forEach(n => {
                if (selectedNotes.has(n.id)) {
                    n.isDeleted = true;
                    n.deletedAt = new Date().toISOString();
                }
            });
            const activeNotes = notes.filter(n => !n.isDeleted);
            if (activeNotes.length === 0) {
                let target = folders.length > 0 ? folders[0].id : 'main';
                notes.unshift({ id: Date.now().toString(), content: '', folderId: target });
            }
            saveNotes();
            
            if (selectedNotes.has(currentNoteId)) {
                const nextNote = notes.find(n => !n.isDeleted);
                if (nextNote) {
                    selectNote(nextNote.id);
                } else {
                    noteInput.value = '';
                    currentNoteId = null;
                }
            }
            exitSelectionMode();
        }, null);
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
    
    const themeDropdown = document.getElementById('theme-dropdown');
    const langDropdown = document.getElementById('lang-dropdown');

    // Функция для настройки дропдауна
    function setupDropdown(dropdown, currentVal, onChange) {
        if (!dropdown) return;
        const header = dropdown.querySelector('.dropdown-header');
        const selectedSpan = dropdown.querySelector('.dropdown-selected');
        const options = dropdown.querySelectorAll('.dropdown-option');

        // Установка начального значения
        options.forEach(opt => {
            if (opt.getAttribute('data-value') === currentVal) {
                opt.classList.add('selected');
                selectedSpan.textContent = opt.textContent;
            } else {
                opt.classList.remove('selected');
            }
        });

        // Открытие/закрытие по клику на заголовок
        header.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы клик по body не закрыл сразу же
            const isOpen = dropdown.classList.contains('open');
            // Закрываем все другие дропдауны
            document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                dropdown.classList.add('open');
            }
        });

        // Выбор опции
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                selectedSpan.textContent = opt.textContent;
                dropdown.classList.remove('open');
                onChange(opt.getAttribute('data-value'));
            });
        });
    }

    // Инициализация
    setupDropdown(themeDropdown, currentTheme, (val) => {
        currentTheme = val;
        localStorage.setItem('nofs_theme', currentTheme);
        applyTheme();
    });

    setupDropdown(langDropdown, currentLang, (val) => {
        currentLang = val;
        localStorage.setItem('nofs_lang', currentLang);
        applyTranslations();
    });

    // Закрытие дропдаунов при клике вне их области
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
    });

    // Логика переключателей (свитчей)
    const settingSpellcheck = document.getElementById('setting-spellcheck');
    const settingCommands = document.getElementById('setting-commands');

    let isSpellcheck = localStorage.getItem('nofs_spellcheck') === 'true';
    let isCommandsDisabled = localStorage.getItem('nofs_commands_disabled') === 'true';

    // Применяем начальное состояние
    if (isSpellcheck) settingSpellcheck.classList.add('active');
    if (isCommandsDisabled) settingCommands.classList.add('active');
    noteInput.spellcheck = isSpellcheck;

    settingSpellcheck.addEventListener('click', () => {
        isSpellcheck = !isSpellcheck;
        settingSpellcheck.classList.toggle('active', isSpellcheck);
        localStorage.setItem('nofs_spellcheck', isSpellcheck);
        noteInput.spellcheck = isSpellcheck;
    });

    settingCommands.addEventListener('click', () => {
        isCommandsDisabled = !isCommandsDisabled;
        settingCommands.classList.toggle('active', isCommandsDisabled);
        localStorage.setItem('nofs_commands_disabled', isCommandsDisabled);
    });

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsModal.classList.add('show');
    });

    if (settingsCloseBtn) {
        settingsCloseBtn.addEventListener('click', () => {
            settingsModal.classList.remove('show');
        });
    }

    // Форматирование даты для корзины
    function formatTrashDate(isoString) {
        if (!isoString) return '';
        const d = new Date(isoString);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    // Рендер элементов корзины
    function renderTrashList() {
        const trashListEl = document.getElementById('trash-list');
        trashListEl.innerHTML = '';
        
        const deletedNotes = notes.filter(n => n.isDeleted);
        deletedNotes.sort((a, b) => new Date(b.deletedAt || 0) - new Date(a.deletedAt || 0));
        
        const t = translations[currentLang] || translations['ru'];

        if (deletedNotes.length === 0) {
            trashListEl.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 40px 0;">${t.emptyTrash || "Корзина пуста"}</div>`;
            return;
        }

        deletedNotes.forEach(note => {
            let title = note.content.split('\\n')[0].trim();
            if (!title) title = translations[currentLang]?.newNoteTitle || 'Новая заметка';
            if (title.length > 25) title = title.substring(0, 25) + '...';

            const item = document.createElement('div');
            item.className = 'trash-item';
            
            const folder = folders.find(f => f.id === note.folderId);
            const icon = folder ? folder.icon : '📝';

            item.innerHTML = `
                <div class="trash-item-left">
                    <div class="trash-item-icon">${icon}</div>
                    <div class="trash-item-info">
                        <div class="trash-item-title">${title}</div>
                        <div class="trash-item-date">${formatTrashDate(note.deletedAt)}</div>
                    </div>
                </div>
                <div class="trash-item-right">
                    <div class="trash-item-actions">
                        <button class="trash-action-btn restore" title="${t.restoreBtn || 'Восстановить'}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a9 9 0 0 0-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/></svg>
                        </button>
                        <button class="trash-action-btn delete" title="${t.deletePermanentlyBtn || 'Удалить навсегда'}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6zm-10 4a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1m4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1m0-8a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2z"/></svg>
                        </button>
                    </div>
                </div>
            `;

            const restoreBtn = item.querySelector('.restore');
            restoreBtn.onclick = () => {
                item.classList.add('fade-out');
                setTimeout(() => {
                    note.isDeleted = false;
                    delete note.deletedAt;
                    if (note.folderId && !folders.find(f => f.id === note.folderId)) {
                        note.folderId = null; 
                    }
                    saveNotes();
                    renderTrashList();
                    renderNotesList();
                }, 300);
            };

            const deleteBtn = item.querySelector('.delete');
            deleteBtn.onclick = () => {
                showDeleteModal(() => {
                    item.classList.add('fade-out');
                    setTimeout(() => {
                        notes = notes.filter(n => n.id !== note.id);
                        saveNotes();
                        renderTrashList();
                    }, 300);
                }, null);
            };

            if (typeof twemoji !== 'undefined') {
                twemoji.parse(item, { folder: 'svg', ext: '.svg' });
            }

            trashListEl.appendChild(item);
        });
    }

    const trashModal = document.getElementById('trash-modal');
    const trashBtn = document.getElementById('trash-btn');
    if (trashBtn && trashModal) {
        trashBtn.addEventListener('click', () => {
            settingsModal.classList.remove('show');
            renderTrashList();
            trashModal.classList.add('show');
        });
    }

    const trashCloseBtn = document.getElementById('trash-close-btn');
    if (trashCloseBtn) {
        trashCloseBtn.addEventListener('click', () => {
            trashModal.classList.remove('show');
        });
    }

    const trashEmptyBtn = document.getElementById('trash-empty-btn');
    if (trashEmptyBtn) {
        trashEmptyBtn.addEventListener('click', () => {
            const deletedNotes = notes.filter(n => n.isDeleted);
            if (deletedNotes.length === 0) return;
            
            showDeleteModal(() => {
                notes = notes.filter(n => !n.isDeleted);
                saveNotes();
                renderTrashList();
            }, null);
        });
    }

    // Закрытие модальных окон при клике вне их контента (на фон)
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });
});
