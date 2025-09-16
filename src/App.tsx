import { Outlet } from 'react-router';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* 主要内容区域 */}
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
        </div>
    );}

export default App;
