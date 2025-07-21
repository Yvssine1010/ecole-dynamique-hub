import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  year: string;
  status: string;
  enrollmentDate: string;
  avatar: string;
  grades: number;
  attendance: number;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: string;
  hireDate: string;
  avatar: string;
  courses: string[];
  students: number;
  experience: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  students: Student[];
  teachers: Teacher[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteStudent: (id: string) => void;
  deleteTeacher: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Administrateur EMSI',
    email: 'admin@emsi.ma',
    password: 'admin123',
    role: 'admin',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '2',
    name: 'Prof. Ahmed Benali',
    email: 'prof.benali@emsi.ma',
    password: 'teacher123',
    role: 'teacher',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '3',
    name: 'Oumaima Lemata',
    email: 'oumaima.lemata@emsi.ma',
    password: 'student123',
    role: 'student',
    avatar: '/lovable-uploads/c19f19c6-7898-4ac0-a09e-4d3eee55d9ad.png'
  }
];

// Initial students data
const initialStudents: Student[] = [
  {
    id: '1',
    name: 'Oumaima Lemata',
    email: 'oumaima.lemata@emsi.ma',
    phone: '06.12.34.56.78',
    program: 'Génie Informatique',
    year: '3ème année',
    status: 'actif',
    enrollmentDate: '2022-09-15',
    avatar: '/lovable-uploads/c19f19c6-7898-4ac0-a09e-4d3eee55d9ad.png',
    grades: 16.8,
    attendance: 95,
  },
  {
    id: '2',
    name: 'Youssef El Amrani',
    email: 'youssef.elamrani@emsi.ma',
    phone: '06.98.76.54.32',
    program: 'Génie Électrique',
    year: '2ème année',
    status: 'actif',
    enrollmentDate: '2023-09-01',
    avatar: '/src/assets/student-youssef.jpg',
    grades: 15.4,
    attendance: 92,
  },
  {
    id: '3',
    name: 'Sara Benkirane',
    email: 'sara.benkirane@emsi.ma',
    phone: '06.11.22.33.44',
    program: 'Génie Civil',
    year: '1ère année',
    status: 'actif',
    enrollmentDate: '2024-09-12',
    avatar: '/src/assets/student-sara.jpg',
    grades: 17.2,
    attendance: 98,
  },
];

// Initial teachers data
const initialTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Prof. Ahmed Benali',
    email: 'prof.benali@emsi.ma',
    phone: '05.22.33.44.55',
    department: 'Génie Informatique',
    position: 'Professeur',
    status: 'actif',
    hireDate: '2020-09-01',
    avatar: '/api/placeholder/40/40',
    courses: ['Algorithmes', 'Bases de Données'],
    students: 127,
    experience: '8 ans',
  },
  {
    id: '2',
    name: 'Dr. Fatima Zahra',
    email: 'fatima.zahra@emsi.ma',
    phone: '05.33.44.55.66',
    department: 'Génie Électrique',
    position: 'Maître de conférences',
    status: 'actif',
    hireDate: '2019-02-15',
    avatar: '/api/placeholder/40/40',
    courses: ['Circuits Électriques', 'Électronique'],
    students: 89,
    experience: '12 ans',
  },
  {
    id: '3',
    name: 'Dr. Hassan Alami',
    email: 'hassan.alami@emsi.ma',
    phone: '05.44.55.66.77',
    department: 'Génie Civil',
    position: 'Professeur',
    status: 'actif',
    hireDate: '2018-08-20',
    avatar: '/api/placeholder/40/40',
    courses: ['Béton Armé', 'Résistance des Matériaux'],
    students: 78,
    experience: '15 ans',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: (students.length + 1).toString(),
    };
    setStudents([...students, newStudent]);
    
    // Add to mock users for login
    const newUser = {
      id: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
      password: 'student123',
      role: 'student' as UserRole,
      avatar: newStudent.avatar
    };
    mockUsers.push(newUser);
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: (teachers.length + 1).toString(),
    };
    setTeachers([...teachers, newTeacher]);
    
    // Add to mock users for login
    const newUser = {
      id: newTeacher.id,
      name: newTeacher.name,
      email: newTeacher.email,
      password: 'teacher123',
      role: 'teacher' as UserRole,
      avatar: newTeacher.avatar
    };
    mockUsers.push(newUser);
  };

  const updateStudent = (id: string, updatedStudent: Partial<Student>) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedStudent } : s));
  };

  const updateTeacher = (id: string, updatedTeacher: Partial<Teacher>) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, ...updatedTeacher } : t));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      students,
      teachers,
      addStudent,
      addTeacher,
      updateStudent,
      updateTeacher,
      deleteStudent,
      deleteTeacher
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}