
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Patient } from '@/types';
import { User } from 'lucide-react';

interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PatientFormData) => void;
  selectedPatient: Patient | null;
}

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
  medicalHistory: string;
}

export const PatientForm = ({ isOpen, onClose, onSubmit, selectedPatient }: PatientFormProps) => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: selectedPatient?.name || '',
    email: selectedPatient?.email || '',
    phone: selectedPatient?.phone || '',
    cpf: selectedPatient?.cpf || '',
    birthDate: selectedPatient?.birthDate || '',
    address: selectedPatient?.address || '',
    medicalHistory: selectedPatient?.medicalHistory || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      address: '',
      medicalHistory: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900">
            {selectedPatient ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {selectedPatient ? 'Atualize as informações do paciente' : 'Preencha os dados do novo paciente'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Digite o nome completo"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="exemplo@email.com"
                required
                className="h-11"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(11) 99999-9999"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF *</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                placeholder="000.000.000-00"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">Endereço Completo *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Rua, número, bairro, cidade, estado, CEP"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700">Histórico Médico</Label>
            <Textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
              placeholder="Descreva o histórico médico, alergias, medicamentos em uso, etc..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              {selectedPatient ? 'Atualizar Paciente' : 'Cadastrar Paciente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
