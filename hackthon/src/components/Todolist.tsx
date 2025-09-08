import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';

interface Note {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteItemProps {
  note: Note;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(note.content);

  const handleUpdate = (): void => {
    if (editContent.trim()) {
      onUpdate(note.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = (): void => {
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = (): void => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      onDelete(note.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border-b-2 border-yellow-400">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditContent(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border-none outline-none focus:ring-2 focus:ring-yellow-400"
              autoFocus
            />
            <button
              onClick={handleUpdate}
              className="p-2 text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
              title="Lưu"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
              title="Hủy"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <span className="text-white text-sm flex-1">{note.content}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="Chỉnh sửa"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface AddNoteProps {
  onAddNote: (content: string) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ onAddNote }) => {
  const [newNote, setNewNote] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full h-24 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors group"
        >
          <Plus className="w-8 h-8 text-gray-400 group-hover:text-yellow-400 transition-colors" />
        </button>
      ) : (
        <div className="bg-gray-700 rounded-lg p-4 border-2 border-yellow-400">
          <textarea
            value={newNote}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập ghi chú mới..."
            className="w-full h-20 bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none text-sm"
            autoFocus
          />
          <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-600">
            <button
              onClick={() => {
                setNewNote('');
                setIsExpanded(false);
              }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newNote.trim()}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Thêm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface HeaderProps {
  noteCount: number;
}

const Header: React.FC<HeaderProps> = ({ noteCount }) => {
  return (
    <div className="bg-yellow-500 p-4 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">STICKY NOTE</h1>
          <p className="text-gray-700 text-xs mt-1">
            {noteCount > 0 ? `${noteCount} ghi chú` : 'Chưa có ghi chú nào'}
          </p>
        </div>
        <div className="w-6 h-6 border-2 border-gray-900 rounded flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

interface SavedNote {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const StickyNote: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const saveToLocalStorage = (notesToSave: Note[]): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const notesForStorage: SavedNote[] = notesToSave.map((note: Note) => ({
        id: note.id,
        content: note.content,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString()
      }));
      window.localStorage.setItem('sticky_notes', JSON.stringify(notesForStorage));
    }
  };

  const loadFromLocalStorage = (): Note[] => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedNotes = window.localStorage.getItem('sticky_notes');
      if (savedNotes) {
        const parsedNotes: SavedNote[] = JSON.parse(savedNotes);
        return parsedNotes.map((note: SavedNote) => ({
          id: note.id,
          content: note.content,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
      }
    }
    return [];
  };

  useEffect(() => {
    const savedNotes = loadFromLocalStorage();
    if (savedNotes.length > 0) {
      setNotes(savedNotes);
    } else {
      // Default notes nếu chưa có dữ liệu
      const defaultNotes: Note[] = [
        { id: 1, content: 'Lên kế hoạch', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, content: 'Nộp bài tập về nhà', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, content: 'Làm việc nhóm', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, content: 'Đi tập thể dục', createdAt: new Date(), updatedAt: new Date() },
        { id: 5, content: 'Đi chơi pickle ball', createdAt: new Date(), updatedAt: new Date() },
        { id: 6, content: 'Đi thăm người ốm', createdAt: new Date(), updatedAt: new Date() },
        { id: 7, content: 'Đi cà phê', createdAt: new Date(), updatedAt: new Date() }
      ];
      setNotes(defaultNotes);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(notes);
  }, [notes]);

  const addNote = (content: string): void => {
    const newNote: Note = {
      id: Date.now(),
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes((prev: Note[]) => [newNote, ...prev]);
  };

  const updateNote = (id: number, content: string): void => {
    setNotes((prev: Note[]) =>
      prev.map((note: Note) =>
        note.id === id 
          ? { ...note, content, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: number): void => {
    setNotes((prev: Note[]) => prev.filter((note: Note) => note.id !== id));
  };

  const sortedNotes: Note[] = [...notes].sort((a: Note, b: Note) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <Header noteCount={notes.length} />
          
          <div className="p-4">
            <AddNote onAddNote={addNote} />
            
            <div className="space-y-0">
              {sortedNotes.map((note: Note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                />
              ))}
              {notes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-400 text-sm">
                    Chưa có ghi chú nào.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Nhấn vào nút + để thêm ghi chú đầu tiên!
                  </p>
                </div>
              )}
            </div>
            
            {notes.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-xs text-center">
                  Tổng cộng {notes.length} ghi chú
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNote;