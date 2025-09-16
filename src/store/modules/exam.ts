import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface Exam {
    id: number;
    title: string;
    subject: string;
    duration: number;
    totalQuestions: number;
    difficulty: "easy" | "medium" | "hard";
    description: string;
    status: "available" | "completed" | "locked";
}

export interface StudentInfo {
    id: string;
    name: string;
    class: string;
    isAuthenticated: boolean;
}

export interface ExamResult {
    examId: number;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    completedAt: Date;
    timeSpent: number;
}

interface ExamState {
    student: StudentInfo;
    exams: Exam[];
    results: ExamResult[];
    currentExamId: number | null;
    isLoading: boolean;
    error: string | null;
}

interface ExamActions {
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    fetchExams: () => Promise<void>;
    startExam: (examId: number) => void;
    completeExam: (examId: number, score: number, timeSpent: number) => void;
    getExamResult: (examId: number) => ExamResult | undefined;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}

type ExamStore = ExamState & ExamActions;

const mockExams: Exam[] = [
    {
        id: 1,
        title: "数学基础测试",
        subject: "数学",
        duration: 90,
        totalQuestions: 20,
        difficulty: "medium",
        description: "涵盖基础数学知识点，包括代数、几何等内容",
        status: "available",
    },
    {
        id: 2,
        title: "英语阅读理解",
        subject: "英语",
        duration: 60,
        totalQuestions: 15,
        difficulty: "easy",
        description: "主要测试英语阅读理解能力和词汇掌握情况",
        status: "available",
    },
    {
        id: 3,
        title: "物理力学专项",
        subject: "物理",
        duration: 120,
        totalQuestions: 25,
        difficulty: "hard",
        description: "深入测试力学相关知识点，包括动力学、静力学等",
        status: "available",
    },
    {
        id: 4,
        title: "化学实验分析",
        subject: "化学",
        duration: 80,
        totalQuestions: 18,
        difficulty: "medium",
        description: "化学实验原理和分析方法的综合测试",
        status: "completed",
    },
];

export const useExamStore = create<ExamStore>()(
    persist(
        immer((set, get) => ({
            // 初始状态
            student: {
                id: "",
                name: "",
                class: "",
                isAuthenticated: false,
            },
            exams: [],
            results: [],
            currentExamId: null,
            isLoading: false,
            error: null,

            // 登录
            login: async (username, password) => {
                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                });

                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (username && password) {
                    set((state) => {
                        state.student = {
                            id: "1",
                            name: "学生1",
                            class: "一位数行政班",
                            isAuthenticated: true,
                        };
                        state.isLoading = false;
                    });
                    return true;
                } else {
                    set((state) => {
                        state.error = "用户名或密码不能为空";
                        state.isLoading = false;
                    });
                    return false;
                }
            },

            // 登出
            logout: () => {
                set((state) => {
                    state.student = {
                        id: "",
                        name: "",
                        class: "",
                        isAuthenticated: false,
                    };
                    state.currentExamId = null;
                });
            },

            // 获取考试列表
            fetchExams: async () => {
                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                });

                await new Promise((resolve) => setTimeout(resolve, 800));

                set((state) => {
                    state.exams = mockExams;
                    state.isLoading = false;
                });
            },

            // 开始考试
            startExam: (examId) => {
                set((state) => {
                    state.currentExamId = examId;
                });
            },

            // 完成考试
            completeExam: (examId, score, timeSpent) => {
                set((state) => {
                    const exam = state.exams.find((e) => e.id === examId);
                    if (exam) {
                        const result: ExamResult = {
                            examId,
                            score,
                            totalQuestions: exam.totalQuestions,
                            correctAnswers: Math.round(
                                (score / 100) * exam.totalQuestions
                            ),
                            completedAt: new Date(),
                            timeSpent,
                        };

                        state.results = state.results.filter(
                            (r) => r.examId !== examId
                        );
                        state.results.push(result);
                        exam.status = "completed";
                    }
                    state.currentExamId = null;
                });
            },

            // 获取考试成绩
            getExamResult: (examId) => {
                const { results } = get();
                return results.find((r) => r.examId === examId);
            },

            // 重置错误
            clearError: () => {
                set((state) => {
                    state.error = null;
                });
            },

            // 设置加载状态
            setLoading: (loading) => {
                set((state) => {
                    state.isLoading = loading;
                });
            },
        })),
        {
            name: "exam-storage",
            partialize: (state) => ({
                student: state.student,
                results: state.results,
            }),
        }
    )
);
