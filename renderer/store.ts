import { create } from "zustand";

export const useStudentsStore = create((set) => ({
    students: [],
    setStudents: (students) => set((state) => ({ students: students }))
}))

export const useLessonsStore = create((set) => ({
    lessons: [],
    setLessons: (lessons) => set((state) => ({ lessons: lessons }))
}))

export const useLecturesStore = create((set) => ({
    lectures: [],
    setLectures: (lectures) => set((state) => ({ lectures: lectures }))
}))


export const useWeekStore = create((set) => ({
    week: [],
    setWeek: (week) => set((state) => ({ week: week }))
}))