import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import studentYoussef from '@/assets/student-youssef.jpg';
import studentSara from '@/assets/student-sara.jpg';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  FileText,
} from 'lucide-react';

// EMSI Students data
const mockStudents = [
  {
    id: '1',
    name: 'Oumaima Lemata',
    email: 'oumaima.lemata@emsi.ma',
    phone: '06.12.34.56.78',
    program: 'Génie Informatique',
    year: '3ème année',
    status: 'actif',
    enrollmentDate: '2022-09-15',
    avatar: '/lovable-uploads/c19f19c6-7898-4ac0-a09e-4d3eee55d9ad.png',
    grades: 16.8,
    attendance: 95,
  },
  {
    id: '2',
    name: 'Youssef El Amrani',
    email: 'youssef.elamrani@emsi.ma',
    phone: '06.98.76.54.32',
    program: 'Génie Électrique',
    year: '2ème année',
    status: 'actif',
    enrollmentDate: '2023-09-01',
    avatar: studentYoussef,
    grades: 15.4,
    attendance: 92,
  },
  {
    id: '3',
    name: 'Sara Benkirane',
    email: 'sara.benkirane@emsi.ma',
    phone: '06.11.22.33.44',
    program: 'Génie Civil',
    year: '1ère année',
    status: 'actif',
    enrollmentDate: '2024-09-12',
    avatar: studentSara,
    grades: 17.2,
    attendance: 98,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'actif':
      return <Badge className="bg-success text-success-foreground">Actif</Badge>;
    case 'stage':
      return <Badge variant="outline" className="border-warning text-warning">En stage</Badge>;
    case 'suspendu':
      return <Badge variant="destructive">Suspendu</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === 'all' || student.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  const programs = [...new Set(mockStudents.map(s => s.program))];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            Gestion des Étudiants
          </h1>
          <p className="text-muted-foreground">Gérez les profils et informations des étudiants</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-stats transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Étudiant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer un nouveau profil étudiant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nom</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="program" className="text-right">Filière</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une filière" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map(program => (
                      <SelectItem key={program} value={program}>{program}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Créer l'étudiant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Étudiants</p>
                <p className="text-2xl font-bold text-foreground">{mockStudents.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Étudiants Actifs</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockStudents.filter(s => s.status === 'actif').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Moyenne Générale</p>
                <p className="text-2xl font-bold text-foreground">
                  {(mockStudents.reduce((acc, s) => acc + s.grades, 0) / mockStudents.length).toFixed(1)}
                </p>
              </div>
              <FileText className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taux Présence</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(mockStudents.reduce((acc, s) => acc + s.attendance, 0) / mockStudents.length)}%
                </p>
              </div>
              <Calendar className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card bg-gradient-card border-0">
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher par nom ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrer par filière" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les filières</SelectItem>
                {programs.map(program => (
                  <SelectItem key={program} value={program}>{program}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Filière</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Présence</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.program}</Badge>
                    </TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{student.grades}/20</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{student.attendance}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}