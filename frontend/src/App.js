import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './config/Context';
import HomePage from './pages/HomePage';
import Connection from './pages/Connection';
import Error from './pages/Error';
import DashBoard from './pages/DashBoard';

function App() {
  
  return (
    <>
      <DataProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/connection" element={<Connection/>} />
            <Route path="/user" element={<DashBoard/>} />{/*
            <Route path="/messagesPriver" element={<MessagesPriver/>} /> */}
            <Route path="*" element={<Error/>} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
