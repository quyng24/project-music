import './App.css';
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {routes} from './routers/index'
import useAuthInit from './hook/useAuthInit';

function App() {
  const {roleName} = useAuthInit();
  return (
    <Router>
      <Suspense fallback={<div className='w-full h-[100vh] flex justify-center items-center text-xl font-medium text-blue-500'>Đang tải trang...</div>}>
        <Routes>
          {routes(roleName).map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App
