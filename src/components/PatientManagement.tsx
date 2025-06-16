
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types';
import { User } from 'lucide-react';
import { toast } from 'sonner';
import { PatientForm, PatientFormData } from './patients/PatientForm';
import { PatientList } from './patients/PatientList';

export const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (formData: PatientFormData) => {
    if (selectedPatient) {
      const updatedPatients = patients.map(p => 
        p.id === selectedPatient.id 
          ? { ...p, ...formData }
          : p
      );
      setPatients(updatedPatients);
      toast.success('Paciente atualizado com sucesso!', {
        description: `${formData.name} foi atualizado no sistema.`
      });
    } else {
      const newPatient: Patient = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setPatients([...patients, newPatient]);
      toast.success('Paciente cadastrado com sucesso!', {
        description: `${formData.name} foi adicionado ao sistema.`
      });
    }

    setIsDialogOpen(false);
    setSelectedPatient(null);
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleDelete = (patientId: string, patientName: string) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o paciente ${patientName}?`);
    if (confirmDelete) {
      setPatients(patients.filter(p => p.id !== patientId));
      toast.success('Paciente removido com sucesso!', {
        description: `${patientName} foi removido do sistema.`
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPatient(null);
  };

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Gerenciamento de Pacientes
          </h1>
          <p className="text-gray-700 font-medium mt-2">Cadastre e gerencie informações dos pacientes</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button onClick={handleNewPatient} className="bg-blue-600 hover:bg-blue-700 text-white border-0">
              <User className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <PatientForm
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleSubmit}
            selectedPatient={selectedPatient}
          />
        </Dialog>
      </div>

      <PatientList
        patients={patients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
