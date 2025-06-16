
import { Patient } from '@/types';
import { PatientCard } from './PatientCard';
import { User } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string, patientName: string) => void;
}

export const PatientList = ({ patients, onEdit, onDelete }: PatientListProps) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente cadastrado</h3>
        <p className="text-gray-600">Comece cadastrando o primeiro paciente do sistema.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
