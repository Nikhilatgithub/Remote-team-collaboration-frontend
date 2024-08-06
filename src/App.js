
import './App.css';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import TeamMembers from './components/TeamMembers';
import UpdateProjectForm from './components/UpdateProjectForm';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      <ProjectForm />
      </header> */}
      <UpdateProjectForm />
    </div>
  );
}

export default App;
