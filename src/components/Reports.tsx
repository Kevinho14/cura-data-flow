
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients, mockDoctors, mockAppointments } from '@/data/mockData';
import { ChartBar } from 'lucide-react';

export const Reports = () => {
  const totalPatients = mockPatients.length;
  const totalDoctors = mockDoctors.length;
  const totalAppointments = mockAppointments.length;

  // Appointments by status
  const appointmentsByStatus = mockAppointments.reduce((acc, appointment) => {
    acc[appointment.status] = (acc[appointment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Appointments by type
  const appointmentsByType = mockAppointments.reduce((acc, appointment) => {
    acc[appointment.type] = (acc[appointment.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Doctors by specialty
  const doctorsBySpecialty = mockDoctors.reduce((acc, doctor) => {
    acc[doctor.specialty] = (acc[doctor.specialty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Recent activity
  const recentActivity = [
    ...mockPatients.slice(0, 3).map(p => ({
      type: 'Paciente cadastrado',
      description: p.name,
      date: p.createdAt
    })),
    ...mockAppointments.slice(0, 3).map(a => ({
      type: 'Consulta agendada',
      description: `${a.patientName} com ${a.doctorName}`,
      date: a.createdAt
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const generatePDF = () => {
    // In a real application, you would use a library like jsPDF or html2pdf
    alert('Funcionalidade de geração de PDF será implementada com integração ao backend');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análises e estatísticas do sistema</p>
        </div>
        <Button onClick={generatePDF}>
          <ChartBar className="h-4 w-4 mr-2" />
          Gerar PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-center">Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalPatients}</div>
              <p className="text-muted-foreground">Total cadastrados</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-center">Médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{totalDoctors}</div>
              <p className="text-muted-foreground">Total cadastrados</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-center">Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{totalAppointments}</div>
              <p className="text-muted-foreground">Total agendadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(appointmentsByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center">
                  <span className="capitalize">{status}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === 'agendado' ? 'bg-blue-500' :
                          status === 'confirmado' ? 'bg-green-500' :
                          status === 'cancelado' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${(count / totalAppointments) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointments by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(appointmentsByType).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="capitalize">{type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          type === 'consulta' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${(count / totalAppointments) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctors by Specialty */}
        <Card>
          <CardHeader>
            <CardTitle>Médicos por Especialidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(doctorsBySpecialty).map(([specialty, count]) => (
                <div key={specialty} className="flex justify-between items-center">
                  <span>{specialty}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(count / totalDoctors) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
