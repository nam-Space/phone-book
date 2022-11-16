
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Management from './components/Management';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />}/>
			<Route path='/management' element={<Management />}/>
		</Routes>
	);
}

export default App;
