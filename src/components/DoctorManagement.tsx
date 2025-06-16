
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { mockDoctors } from '@/data/mockData';
import { Doctor } from '@/types';
import { Edit, User, Stethoscope, Building2, X } from 'lucide-react';
import { toast } from 'sonner';

export const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    crm: '',
    specialty: '',
    department: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      crm: '',
      specialty: '',
      department: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDoctor) {
      const updatedDoctors = doctors.map(d => 
        d.id === selectedDoctor.id 
          ? { ...d, ...formData }
          : d
      );
      setDoctors(updatedDoctors);
      toast.success('Médico atualizado com sucesso!', {
        description: `Dr(a). ${formData.name} foi atualizado no sistema.`
      });
    } else {
      const newDoctor: Doctor = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setDoctors([...doctors, newDoctor]);
      toast.success('Médico cadastrado com sucesso!', {
        description: `Dr(a). ${formData.name} foi adicionado ao sistema.`
      });
    }

    setIsDialogOpen(false);
    resetForm();
    setSelectedDoctor(null);
  };

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      crm: doctor.crm,
      specialty: doctor.specialty,
      department: doctor.department
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (doctorId: string, doctorName: string) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o Dr(a). ${doctorName}?`);
    if (confirmDelete) {
      setDoctors(doctors.filter(d => d.id !== doctorId));
      toast.success('Médico removido com sucesso!', {
        description: `Dr(a). ${doctorName} foi removido do sistema.`
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
    setSelectedDoctor(null);
  };

  const specialtyColors = {
    'Cardiologia': 'from-red-100 to-pink-100 text-red-600',
    'Dermatologia': 'from-yellow-100 to-orange-100 text-orange-600',
    'Neurologia': 'from-purple-100 to-indigo-100 text-purple-600',
    'Ortopedia': 'from-blue-100 to-cyan-100 text-blue-600',
    'Pediatria': 'from-green-100 to-emerald-100 text-green-600',
    'Psiquiatria': 'from-indigo-100 to-purple-100 text-indigo-600'
  };

  const getSpecialtyColor = (specialty: string) => {
    return specialtyColors[specialty as keyof typeof specialtyColors] || 'from-gray-100 to-slate-100 text-gray-600';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Gerenciamento de Médicos
          </h1>
          <p className="text-muted-foreground mt-2">Cadastre e gerencie informações dos médicos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
              <User className="h-4 w-4 mr-2" />
              Novo Médico
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedDoctor ? 'Editar Médico' : 'Cadastrar Novo Médico'}
              </DialogTitle>
              <DialogDescription>
                {selectedDoctor ? 'Atualize as informações do médico' : 'Preencha os dados do novo médico'}
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
                    placeholder="doutor@hospital.com"
                    required
                    className="h-11"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="crm" className="text-sm font-medium">CRM *</Label>
                  <Input
                    id="crm"
                    value={formData.crm}
                    onChange={(e) => setFormData({...formData, crm: e.target.value})}
                    placeholder="CRM/SP 123456"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty" className="text-sm font-medium">Especialidade *</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    placeholder="Ex: Cardiologia"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">Departamento *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    placeholder="Ex: Cardio"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                  {selectedDoctor ? 'Atualizar Médico' : 'Cadastrar Médico'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getSpecialtyColor(doctor.specialty)} rounded-full flex items-center justify-center`}>
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                      Dr(a). {doctor.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Building2 className="h-3 w-3 mr-1" />
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(doctor)}
                    className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(doctor.id, doctor.name)}
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
                  <span className="font-medium text-gray-600 w-20">Email:</span>
                  <span className="text-gray-900">{doctor.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-600 w-20">Telefone:</span>
                  <span className="text-gray-900">{doctor.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-600 w-20">CRM:</span>
                  <span className="text-gray-900">{doctor.crm}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-600 w-20">Depto:</span>
                  <span className="text-gray-900">{doctor.department}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 text-xs text-gray-500 border-t border-gray-100">
                <span>Cadastrado em {new Date(doctor.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum médico cadastrado</h3>
          <p className="text-gray-500">Comece cadastrando o primeiro médico do sistema.</p>
        </div>
      )}
    </div>
  );
};
