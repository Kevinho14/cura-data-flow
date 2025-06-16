
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { mockAppointments, mockDoctors, mockPatients } from '@/data/mockData';
import { Appointment } from '@/types';
import { Calendar, Edit, Clock, User, Stethoscope, X } from 'lucide-react';
import { toast } from 'sonner';

const appointmentTypes = [
  { value: 'consulta', label: 'Consulta Médica', color: 'bg-blue-100 text-blue-800' },
  { value: 'exame', label: 'Exame', color: 'bg-purple-100 text-purple-800' },
  { value: 'retorno', label: 'Retorno', color: 'bg-green-100 text-green-800' },
  { value: 'emergencia', label: 'Emergência', color: 'bg-red-100 text-red-800' }
];

export const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'consulta' as 'consulta' | 'exame' | 'retorno' | 'emergencia',
    status: 'agendado' as 'agendado' | 'confirmado' | 'cancelado' | 'concluido',
    notes: ''
  });

  const resetForm = () => {
    setFormData({
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      type: 'consulta',
      status: 'agendado',
      notes: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = mockPatients.find(p => p.id === formData.patientId);
    const doctor = mockDoctors.find(d => d.id === formData.doctorId);
    
    if (!patient || !doctor) {
      toast.error('Erro ao agendar consulta', {
        description: 'Paciente ou médico não encontrado!'
      });
      return;
    }

    if (selectedAppointment) {
      const updatedAppointments = appointments.map(a => 
        a.id === selectedAppointment.id 
          ? { 
              ...a, 
              ...formData,
              patientName: patient.name,
              doctorName: doctor.name
            }
          : a
      );
      setAppointments(updatedAppointments);
      toast.success('Consulta atualizada com sucesso!', {
        description: `Consulta de ${patient.name} com Dr(a). ${doctor.name} foi atualizada.`
      });
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...formData,
        patientName: patient.name,
        doctorName: doctor.name,
        createdAt: new Date().toISOString()
      };
      setAppointments([...appointments, newAppointment]);
      toast.success('Consulta agendada com sucesso!', {
        description: `Consulta de ${patient.name} com Dr(a). ${doctor.name} foi agendada para ${formData.date}.`
      });
    }

    setIsDialogOpen(false);
    resetForm();
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (appointmentId: string, patientName: string) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a consulta de ${patientName}?`);
    if (confirmDelete) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
      toast.success('Consulta removida com sucesso!', {
        description: `A consulta de ${patientName} foi removida do sistema.`
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
    setSelectedAppointment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'concluido': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const foundType = appointmentTypes.find(t => t.value === type);
    return foundType?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gerenciamento de Consultas
          </h1>
          <p className="text-muted-foreground mt-2">Agende e gerencie consultas e exames</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Calendar className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedAppointment ? 'Editar Consulta' : 'Agendar Nova Consulta'}
              </DialogTitle>
              <DialogDescription>
                {selectedAppointment ? 'Atualize as informações da consulta' : 'Preencha os dados para agendar uma nova consulta'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-sm font-medium">Paciente *</Label>
                  <Select value={formData.patientId} onValueChange={(value) => setFormData({...formData, patientId: value})}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPatients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{patient.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctorId" className="text-sm font-medium">Médico *</Label>
                  <Select value={formData.doctorId} onValueChange={(value) => setFormData({...formData, doctorId: value})}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione um médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center space-x-2">
                            <Stethoscope className="h-4 w-4" />
                            <span>Dr(a). {doctor.name} - {doctor.specialty}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">Horário *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">Tipo *</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendado">Agendado</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Observações sobre a consulta, preparos necessários, etc..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  {selectedAppointment ? 'Atualizar Consulta' : 'Agendar Consulta'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Appointments Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                      {appointment.patientName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Stethoscope className="h-3 w-3 mr-1" />
                      Dr(a). {appointment.doctorName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                    {appointmentTypes.find(t => t.value === appointment.type)?.label || appointment.type}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(appointment)}
                      className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(appointment.id, appointment.patientName)}
                      className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="font-medium">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
              
              {appointment.notes && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-700">{appointment.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
                <span>Agendado em {new Date(appointment.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta agendada</h3>
          <p className="text-gray-500">Comece agendando a primeira consulta do sistema.</p>
        </div>
      )}
    </div>
  );
};
