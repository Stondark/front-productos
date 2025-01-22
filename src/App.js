import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import HeaderBar from './components/headerBar';
import Index from './components/Products/index'

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <Index />
    </div>
  );
}

export default App;
