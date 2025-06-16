
import { Patient, Doctor, Appointment } from '@/types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-1234',
    cpf: '123.456.789-01',
    birthDate: '1985-03-15',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    medicalHistory: 'Hipertensão arterial, diabetes tipo 2',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'João Pedro Oliveira',
    email: 'joao.pedro@email.com',
    phone: '(11) 98888-5678',
    cpf: '987.654.321-09',
    birthDate: '1990-07-22',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    medicalHistory: 'Asma brônquica',
    createdAt: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    name: 'Ana Carolina Lima',
    email: 'ana.lima@email.com',
    phone: '(11) 97777-9012',
    cpf: '456.789.123-45',
    birthDate: '1978-11-08',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    medicalHistory: 'Enxaqueca crônica',
    createdAt: '2024-01-17T09:15:00Z'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Carlos Alberto Mendes',
    email: 'carlos.mendes@hospital.com',
    phone: '(11) 3333-1111',
    crm: 'CRM/SP 123456',
    specialty: 'Cardiologia',
    department: 'Cardio',
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Dra. Fernanda Costa',
    email: 'fernanda.costa@hospital.com',
    phone: '(11) 3333-2222',
    crm: 'CRM/SP 654321',
    specialty: 'Endocrinologia',
    department: 'Endócrino',
    createdAt: '2024-01-11T08:00:00Z'
  },
  {
    id: '3',
    name: 'Dr. Roberto Silva',
    email: 'roberto.silva@hospital.com',
    phone: '(11) 3333-3333',
    crm: 'CRM/SP 789012',
    specialty: 'Neurologia',
    department: 'Neuro',
    createdAt: '2024-01-12T08:00:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Maria Silva Santos',
    doctorId: '1',
    doctorName: 'Dr. Carlos Alberto Mendes',
    date: '2024-06-20',
    time: '09:00',
    type: 'consulta',
    status: 'agendado',
    notes: 'Consulta de rotina - acompanhamento da hipertensão',
    createdAt: '2024-06-15T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'João Pedro Oliveira',
    doctorId: '3',
    doctorName: 'Dr. Roberto Silva',
    date: '2024-06-21',
    time: '14:30',
    type: 'exame',
    status: 'confirmado',
    notes: 'Eletroencefalograma para investigação de cefaleias',
    createdAt: '2024-06-16T14:00:00Z'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Ana Carolina Lima',
    doctorId: '2',
    doctorName: 'Dra. Fernanda Costa',
    date: '2024-06-22',
    time: '10:15',
    type: 'consulta',
    status: 'agendado',
    notes: 'Primeira consulta - avaliação endocrinológica',
    createdAt: '2024-06-17T09:00:00Z'
  }
];
