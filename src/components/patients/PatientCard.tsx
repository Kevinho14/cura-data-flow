
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types';
import { Edit, User, Calendar, FileText, X } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string, patientName: string) => void;
}

export const PatientCard = ({ patient, onEdit, onDelete }: PatientCardProps) => {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-300 shadow-md hover:-translate-y-1 bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {patient.name}
              </CardTitle>
              <p className="text-sm text-gray-700 flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {calculateAge(patient.birthDate)} anos
              </p>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(patient)}
              className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(patient.id, patient.name)}
              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-800 w-16">Email:</span>
            <span className="text-gray-900">{patient.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-800 w-16">Fone:</span>
            <span className="text-gray-900">{patient.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-800 w-16">CPF:</span>
            <span className="text-gray-900">{patient.cpf}</span>
          </div>
        </div>
        
        {patient.medicalHistory && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800 mb-1">Histórico Médico:</p>
                <p className="text-xs text-gray-900 line-clamp-2">{patient.medicalHistory}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 text-xs text-gray-600 border-t border-gray-200">
          <span>Cadastrado em {new Date(patient.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
