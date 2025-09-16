import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import {  } from "zustand/middleware";
// 定义试题选项接口
interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

// 定义试题接口
interface Question {
    id: string;
    title: string;
    content: string;
    type: 'single' | 'multiple' | 'text'; // 单选、多选、文本题
    options?: Option[]; // 选择题选项
    correctAnswer?: string; // 文本题答案
    userAnswer?: string | string[]; // 用户答案
    score: number; // 分值
    difficulty: 'easy' | 'medium' | 'hard'; // 难度
}

// 定义考试信息接口
interface ExamInfo {
    id: string;
    title: string;
    description: string;
    duration: number; // 考试时长（分钟）
    totalScore: number; // 总分
    startTime?: Date;
    endTime?: Date;
}

// 定义学生信息接口
interface StudentInfo {
    id: string;
    name: string;
    studentNumber: string;
    class: string;
}

// 定义状态管理器接口
interface ExamStore {
    // 学生信息
    student: StudentInfo | null;
    // 考试信息
    examInfo: ExamInfo | null;
    // 试题列表
    questions: Question[];
    // 当前题目索引
    currentQuestionIndex: number;
    
    // 操作方法
    setStudent: (student: StudentInfo) => void;
    setExamInfo: (examInfo: ExamInfo) => void;
    setQuestions: (questions: Question[]) => void;
}
// 创建学生试题 store，同时使用 devtools、persist 和 immer 中间件
export const useuserInfoStore = create<ExamStore>()(
    devtools(
        persist(
            immer((set) => ({
                // 初始状态
                student: null,
                examInfo: null,
                questions: [],
                currentQuestionIndex: 0,
                examStatus: 'not-started',
                
                // 设置学生信息
                setStudent: (student: StudentInfo) =>
                    set((state) => {
                        state.student = student;
                    }, false, 'setStudent'),
                
                // 设置考试信息
                setExamInfo: (examInfo: ExamInfo) =>
                    set((state) => {
                        state.examInfo = examInfo;
                    }, false, 'setExamInfo'),
                
                // 设置试题列表
                setQuestions: (questions: Question[]) =>
                    set((state) => {
                        state.questions = questions;
                    }, false, 'setQuestions'),
            })),
            {
                name: "exam-storage", // 存储的 key 名称
                storage: createJSONStorage(() => localStorage),
                // 只持久化部分状态，排除一些不需要持久化的字段
                partialize: (state) => ({
                    student: state.student,
                    examInfo: state.examInfo,
                    questions: state.questions,
                    currentQuestionIndex: state.currentQuestionIndex,
                }),
            }
        ),
        {
            name: "exam-store", // DevTools 中显示的名称
            enabled: process.env.NODE_ENV === 'development', // 只在开发环境启用
        }
    )
);

// 导出类型，供其他组件使用
export type { Question, Option, ExamInfo, StudentInfo, ExamStore };
