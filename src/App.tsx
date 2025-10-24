import GlobalLeftMenu from './components/globalLeftMenu';
import './global.css';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Services from './pages/Services';

function App() {
  //sm(640), md(768), lg(1024), xl(1280), 2xl(1536).
  return (
    <div className='flex justify-end w-dvw h-dvh bg-base'>
      <GlobalLeftMenu />
      <Routes>
        <Route path='/' element={<Services />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
