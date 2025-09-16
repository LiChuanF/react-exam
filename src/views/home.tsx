import { useEffect } from "react";
import { useAppNavigate } from "@/router/hooks";
import { useExamStore } from "@/store";

function Home() {
    const { goLogin, goExams } = useAppNavigate();
    const { student } = useExamStore();

    useEffect(() => {
        // 如果已经登录，跳转到考试列表
        if (student.isAuthenticated) {
            goExams();
        } else {
            // 未登录则跳转到登录页
            goLogin();
        }
    }, [student.isAuthenticated, goLogin, goExams]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700">
            <div className="bg-white p-10 rounded-2xl text-center shadow-2xl">
                <h1 className="text-gray-800 mb-4 text-2xl font-bold">
                    在线考试系统
                </h1>
                <p className="text-gray-600 mb-6">
                    正在跳转...
                </p>
                <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
    );
}

export default Home;
