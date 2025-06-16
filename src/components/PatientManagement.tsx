
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types';
import { Edit, User, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
    medicalHistory: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      address: '',
      medicalHistory: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    resetForm();
    setSelectedPatient(null);
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      cpf: patient.cpf,
      birthDate: patient.birthDate,
      address: patient.address,
      medicalHistory: patient.medicalHistory
    });
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
    resetForm();
    setSelectedPatient(null);
  };

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gerenciamento de Pacientes
          </h1>
          <p className="text-muted-foreground mt-2">Cadastre e gerencie informações dos pacientes</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <User className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedPatient ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}
              </DialogTitle>
              <DialogDescription>
                {selectedPatient ? 'Atualize as informações do paciente' : 'Preencha os dados do novo paciente'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nome Completo *</Label>
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
                  <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
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
                  <Label htmlFor="phone" className="text-sm font-medium">Telefone *</Label>
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
                  <Label htmlFor="cpf" className="text-sm font-medium">CPF *</Label>
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
                  <Label htmlFor="birthDate" className="text-sm font-medium">Data de Nascimento *</Label>
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
                <Label htmlFor="address" className="text-sm font-medium">Endereço Completo *</Label>
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
                <Label htmlFor="medicalHistory" className="text-sm font-medium">Histórico Médico</Label>
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
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  {selectedPatient ? 'Atualizar Paciente' : 'Cadastrar Paciente'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Patients Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <Card key={patient.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {patient.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {calculateAge(patient.birthDate)} anos
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(patient)}
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(patient.id, patient.name)}
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
                  <span className="font-medium text-gray-600 w-16">Email:</span>
                  <span className="text-gray-900">{patient.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-600 w-16">Fone:</span>
                  <span className="text-gray-900">{patient.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-600 w-16">CPF:</span>
                  <span className="text-gray-900">{patient.cpf}</span>
                </div>
              </div>
              
              {patient.medicalHistory && (
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Histórico Médico:</p>
                      <p className="text-xs text-gray-700 line-clamp-2">{patient.medicalHistory}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
                <span>Cadastrado em {new Date(patient.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {patients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente cadastrado</h3>
          <p className="text-gray-500">Comece cadastrando o primeiro paciente do sistema.</p>
        </div>
      )}
    </div>
  );
};
