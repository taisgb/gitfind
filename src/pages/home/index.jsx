import { Header } from '../../components/Header';
import { useState } from 'react';
import background from '../../assets/background.png';
import './styles.css';
import ItemList from '../../components/ItemList';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();   
    
    if (newUser.name) {
      const { avatar_url, name, bio } = newUser;
      setCurrentUser({ avatar_url, name, bio });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json(); 
      
      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} className='background' alt='background git app' />
        <div className='informacoes'>

          <div>
            <input 
              name='usuario'
              value={user}
              onChange={event => setUser(event.target.value)}
              placeholder='@username'
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser && (
            <>
              <div className='perfil'>
                <img src={currentUser.avatar_url} alt="Foto de perfil" className='profile'/>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{user}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          )}

          <div>
            <h2>Repositórios</h2>
            {repos.map(repo => (
              <ItemList 
                key={repo.id}
                title={repo.name}
                description={repo.description}
              />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
