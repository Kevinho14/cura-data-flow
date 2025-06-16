
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPatients, mockDoctors, mockAppointments } from '@/data/mockData';
import { User, Calendar, ChartBar } from 'lucide-react';

export const Dashboard = () => {
  const totalPatients = mockPatients.length;
  const totalDoctors = mockDoctors.length;
  const totalAppointments = mockAppointments.length;
  const appointmentsToday = mockAppointments.filter(
    app => app.date === new Date().toISOString().split('T')[0]
  ).length;

  const recentAppointments = mockAppointments.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-700 font-medium">Visão geral do sistema de saúde</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover border-2 border-gray-300 bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-800">Total de Pacientes</CardTitle>
            <User className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalPatients}</div>
            <p className="text-xs text-gray-700 font-medium">Pacientes cadastrados</p>
          </CardContent>
        </Card>

        <Card className="card-hover border-2 border-gray-300 bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-800">Total de Médicos</CardTitle>
            <User className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalDoctors}</div>
            <p className="text-xs text-gray-700 font-medium">Médicos cadastrados</p>
          </CardContent>
        </Card>

        <Card className="card-hover border-2 border-gray-300 bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-800">Consultas Totais</CardTitle>
            <Calendar className="h-4 w-4 text-purple-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalAppointments}</div>
            <p className="text-xs text-gray-700 font-medium">Consultas agendadas</p>
          </CardContent>
        </Card>

        <Card className="card-hover border-2 border-gray-300 bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-800">Hoje</CardTitle>
            <ChartBar className="h-4 w-4 text-orange-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{appointmentsToday}</div>
            <p className="text-xs text-gray-700 font-medium">Consultas hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card className="border-2 border-gray-300 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Próximas Consultas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                <div>
                  <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    Dr. {appointment.doctorName} • {appointment.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{appointment.date}</p>
                  <p className="text-sm text-gray-700 font-medium">{appointment.time}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    appointment.status === 'agendado' ? 'bg-blue-600 text-white' :
                    appointment.status === 'confirmado' ? 'bg-green-600 text-white' :
                    appointment.status === 'cancelado' ? 'bg-red-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
