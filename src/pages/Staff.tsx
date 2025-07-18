import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  UserCheck,
  BookOpen,
  Award,
} from 'lucide-react';

// Mock data for staff
const mockStaff = [
  {
    id: '1',
    name: 'Dr. Marie Dubois',
    email: 'marie.dubois@school.com',
    phone: '01.23.45.67.89',
    department: 'Informatique',
    position: 'Professeur',
    status: 'actif',
    hireDate: '2020-09-01',
    avatar: '/api/placeholder/40/40',
    courses: ['Algorithmes', 'Bases de Données'],
    students: 67,
    experience: '8 ans',
  },
  {
    id: '2',
    name: 'Prof. Jean Martin',
    email: 'jean.martin@school.com',
    phone: '01.98.76.54.32',
    department: 'Management',
    position: 'Maître de conférences',
    status: 'actif',
    hireDate: '2019-02-15',
    avatar: '/api/placeholder/40/40',
    courses: ['Gestion de Projet', 'Leadership'],
    students: 89,
    experience: '12 ans',
  },
  {
    id: '3',
    name: 'Dr. Sophie Bernard',
    email: 'sophie.bernard@school.com',
    phone: '01.11.22.33.44',
    department: 'Ingénierie',
    position: 'Professeur',
    status: 'congé',
    hireDate: '2018-08-20',
    avatar: '/api/placeholder/40/40',
    courses: ['Mécanique', 'Thermodynamique'],
    students: 45,
    experience: '15 ans',
  },
  {
    id: '4',
    name: 'Claire Administrateur',
    email: 'claire.admin@school.com',
    phone: '01.55.66.77.88',
    department: 'Administration',
    position: 'Responsable RH',
    status: 'actif',
    hireDate: '2021-01-10',
    avatar: '/api/placeholder/40/40',
    courses: [],
    students: 0,
    experience: '5 ans',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'actif':
      return <Badge className="bg-success text-success-foreground">Actif</Badge>;
    case 'congé':
      return <Badge variant="outline" className="border-warning text-warning">En congé</Badge>;
    case 'retraité':
      return <Badge variant="secondary">Retraité</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPositionColor = (position: string) => {
  switch (position) {
    case 'Professeur':
      return 'bg-primary text-primary-foreground';
    case 'Maître de conférences':
      return 'bg-accent text-accent-foreground';
    case 'Responsable RH':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(mockStaff.map(s => s.department))];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <UserCheck className="w-8 h-8 text-primary" />
            Gestion du Personnel
          </h1>
          <p className="text-muted-foreground">Gérez les profils et informations du personnel</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-stats transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Personnel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau membre du personnel</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer un nouveau profil.
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
                <Label htmlFor="department" className="text-right">Département</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un département" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Créer le profil</Button>
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
                <p className="text-sm font-medium text-muted-foreground">Total Personnel</p>
                <p className="text-2xl font-bold text-foreground">{mockStaff.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enseignants</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockStaff.filter(s => s.position.includes('Professeur') || s.position.includes('Maître')).length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Administratifs</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockStaff.filter(s => s.department === 'Administration').length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockStaff.filter(s => s.status === 'actif').length}
                </p>
              </div>
              <Award className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card className="shadow-card bg-gradient-card border-0">
        <CardHeader>
          <CardTitle>Liste du Personnel</CardTitle>
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
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrer par département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Membre</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Étudiants</TableHead>
                  <TableHead>Expérience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={staff.avatar} alt={staff.name} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">{staff.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{staff.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPositionColor(staff.position)}>{staff.position}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(staff.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{staff.students}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{staff.experience}</span>
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