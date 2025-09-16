import { useEffect } from "react";
import { useAppNavigate } from "@/router/hooks";
import { useExamStore } from "@/store";

export function ExamList() {
    const { navigateTo } = useAppNavigate();
    const store = useExamStore();

    useEffect(() => {
        if (store.student.isAuthenticated) {
            store.fetchExams();
        } else {
            navigateTo("/login");
        }
    }, [store.student.isAuthenticated, store, navigateTo]);

    const handleLogout = () => {
        if (confirm("确定要退出登录吗？")) {
            store.logout();
            navigateTo("/login");
        }
    };

    if (store.isLoading) {
        return (
            <div className="p-12 text-center">
                <p>加载中...</p>
            </div>
        );
    }

    return (
        <div className="p-5 min-h-screen bg-gray-50">
            <header className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
                <h1 className="m-0 text-2xl font-bold text-gray-800">在线考试系统</h1>
                <div>
                    <span className="mr-5 text-gray-700">
                        欢迎，{store.student.name}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white border-none px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors"
                    >
                        退出登录
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-[300px_1fr] gap-5">
                <div className="bg-white p-5 rounded-lg h-fit shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">考生信息</h3>
                    <p className="text-gray-600 mb-2">学号：{store.student.id}</p>
                    <p className="text-gray-600 mb-2">姓名：{store.student.name}</p>
                    <p className="text-gray-600 mb-0">班级：{store.student.class}</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">考试科目 (共 {store.exams.length} 门)</h3>
                    <div className="grid gap-4">
                        {store.exams.map((exam) => (
                            <div
                                key={exam.id}
                                className={`border border-gray-200 rounded-lg p-4 transition-colors ${
                                    exam.status === "available"
                                        ? "bg-indigo-50"
                                        : "bg-gray-50"
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="m-0 text-base font-semibold text-gray-800">{exam.title}</h4>
                                    <span
                                        className={`px-2 py-1 rounded text-xs text-white ${
                                            exam.status === "available"
                                                ? "bg-green-500"
                                                : exam.status === "completed"
                                                ? "bg-blue-500"
                                                : "bg-gray-500"
                                        }`}
                                    >
                                        {exam.status === "available"
                                            ? "可参加"
                                            : exam.status === "completed"
                                            ? "已完成"
                                            : "未开放"}
                                    </span>
                                </div>
                                <p className="text-gray-600 my-2">
                                    {exam.description}
                                </p>
                                <div className="flex gap-5 text-sm text-gray-600 mb-3">
                                    <span>时长：{exam.duration}分钟</span>
                                    <span>题目：{exam.totalQuestions}题</span>
                                    <span>
                                        难度：
                                        {exam.difficulty === "easy"
                                            ? "简单"
                                            : exam.difficulty === "medium"
                                            ? "中等"
                                            : "困难"}
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        alert(`点击了考试 ${exam.id}`)
                                    }
                                    disabled={exam.status === "locked"}
                                    className={`text-white border-none px-4 py-2 rounded transition-colors ${
                                        exam.status === "available"
                                            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                            : exam.status === "completed"
                                            ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                                            : "bg-gray-500 cursor-not-allowed"
                                    } ${exam.status === "locked" ? "opacity-60" : ""}`}
                                >
                                    {exam.status === "available"
                                        ? "开始考试"
                                        : exam.status === "completed"
                                        ? "查看成绩"
                                        : "暂未开放"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
