
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockPatients, mockDoctors, mockAppointments } from '@/data/mockData';
import { Search } from 'lucide-react';

export const SearchAndFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredResults = () => {
    let results: any[] = [];

    if (searchType === 'all' || searchType === 'patients') {
      const patientResults = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cpf.includes(searchTerm)
      ).map(patient => ({ ...patient, type: 'patient' }));
      results = [...results, ...patientResults];
    }

    if (searchType === 'all' || searchType === 'doctors') {
      const doctorResults = mockDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.crm.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(doctor => ({ ...doctor, type: 'doctor' }));
      results = [...results, ...doctorResults];
    }

    if (searchType === 'all' || searchType === 'appointments') {
      let appointmentResults = mockAppointments.filter(appointment =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (dateFilter) {
        appointmentResults = appointmentResults.filter(appointment =>
          appointment.date === dateFilter
        );
      }

      if (statusFilter !== 'all') {
        appointmentResults = appointmentResults.filter(appointment =>
          appointment.status === statusFilter
        );
      }

      results = [...results, ...appointmentResults.map(appointment => ({ ...appointment, type: 'appointment' }))];
    }

    return results;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearchType('all');
    setDateFilter('');
    setStatusFilter('all');
  };

  const results = filteredResults();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pesquisa e Filtros</h1>
        <p className="text-muted-foreground">Encontre informações rapidamente</p>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros de Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Termo de Pesquisa</Label>
              <Input
                id="search"
                placeholder="Digite sua pesquisa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="searchType">Tipo de Busca</Label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="patients">Pacientes</SelectItem>
                  <SelectItem value="doctors">Médicos</SelectItem>
                  <SelectItem value="appointments">Consultas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFilter">Data (Consultas)</Label>
              <Input
                id="dateFilter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="statusFilter">Status (Consultas)</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Resultados ({results.length})
          </h2>
        </div>

        {results.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Nenhum resultado encontrado</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {results.map((item, index) => (
              <Card key={`${item.type}-${item.id}-${index}`} className="card-hover">
                <CardContent className="p-4">
                  {item.type === 'patient' && (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            PACIENTE
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Telefone:</strong> {item.phone}</p>
                        <p><strong>CPF:</strong> {item.cpf}</p>
                        <p><strong>Nascimento:</strong> {new Date(item.birthDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  )}

                  {item.type === 'doctor' && (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            MÉDICO
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><strong>Especialidade:</strong> {item.specialty}</p>
                        <p><strong>CRM:</strong> {item.crm}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Departamento:</strong> {item.department}</p>
                      </div>
                    </div>
                  )}

                  {item.type === 'appointment' && (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.patientName} → {item.doctorName}
                          </h3>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            CONSULTA
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.status === 'agendado' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'confirmado' ? 'bg-green-100 text-green-800' :
                          item.status === 'cancelado' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><strong>Data:</strong> {item.date}</p>
                        <p><strong>Horário:</strong> {item.time}</p>
                        <p><strong>Tipo:</strong> {item.type}</p>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Observações:</strong> {item.notes}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
