import sys
with open('G:/My Drive/Main/APPS/Nofs/script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "batchStarBtn.addEventListener('click'" in line:
        start_idx = i
    if start_idx != -1 and i > start_idx and "batchDeleteBtn.addEventListener" in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_code = """    batchStarBtn.addEventListener('click', () => {
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

"""
    lines = lines[:start_idx] + [new_code] + lines[end_idx:]
    with open('G:/My Drive/Main/APPS/Nofs/script.js', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Success")
else:
    print("Failed to find boundaries")
