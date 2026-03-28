import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('premium-todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: 1, text: '리액트 공부하기', completed: false },
      { id: 2, text: '멋진 투두리스트 만들기', completed: true },
      { id: 3, text: '운동하기', completed: false }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    localStorage.setItem('premium-todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getCompletedCount = () => {
    return todos.filter(t => t.completed).length;
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>나만의 투두</h1>
        <p>오늘 하루를 의미있게 채워보세요</p>
      </div>

      <div className="todo-card">
        <form className="input-group" onSubmit={handleAddTodo}>
          <input 
            type="text" 
            placeholder="할 일을 입력하세요..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">추가</button>
        </form>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            진행중
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            완료
          </button>
        </div>

        {filteredTodos.length > 0 ? (
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content" onClick={() => toggleTodo(todo.id)} style={{cursor: 'pointer'}}>
                  <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="todo-text">{todo.text}</span>
                </div>
                <button 
                  className="delete-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                  aria-label="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">✨</div>
            <p>
              {filter === 'all' && "새로운 할 일을 추가해보세요!"}
              {filter === 'active' && "모든 할 일을 완료했습니다!"}
              {filter === 'completed' && "완료된 할 일이 없습니다."}
            </p>
          </div>
        )}

        <div className="stats">
          <span>총 {todos.length}개 항목</span>
          <span>완료율: {todos.length > 0 ? Math.round((getCompletedCount() / todos.length) * 100) : 0}%</span>
        </div>
      </div>
    </div>
  );
}

export default App;