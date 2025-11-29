import { SimpleEditor } from './components/SimpleEditor';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">✏️</span>
            <h1>Simple Editor</h1>
          </div>
          <p className="tagline">Powered by Tiptap</p>
        </div>
      </header>
      <main className="app-main">
        <SimpleEditor />
      </main>
      <footer className="app-footer">
        <p>
          Built with <span className="heart">♥</span> using React & Tiptap
        </p>
      </footer>
    </div>
  );
}

export default App;

