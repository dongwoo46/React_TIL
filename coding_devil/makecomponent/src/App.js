import './App.css';
import Hello from './component/Hello';
import Welcome from './component/Welcome';
import styles from './App.module.css';
import World from './component/World';
function App() {
  return (
    <div className="App">
      <Hello />
      <World />
      <div className={styles.box}>App</div>
    </div>
  );
}

export default App;
