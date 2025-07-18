import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  DollarSign,
  Award,
  Clock,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Star,
} from 'lucide-react';

// Mock data for different user roles
const mockData = {
  admin: {
    stats: [
      { title: 'Total Étudiants', value: '1,247', change: '+12%', icon: GraduationCap, color: 'text-primary' },
      { title: 'Personnel', value: '89', change: '+3%', icon: Users, color: 'text-accent' },
      { title: 'Cours Actifs', value: '156', change: '+8%', icon: BookOpen, color: 'text-success' },
      { title: 'Revenus (€)', value: '284,500', change: '+15%', icon: DollarSign, color: 'text-warning' },
    ],
    recentActivities: [
      { type: 'student', message: '15 nouveaux étudiants inscrits cette semaine', time: '2h', status: 'success' },
      { type: 'payment', message: 'Paiements en retard: 23 étudiants', time: '4h', status: 'warning' },
      { type: 'course', message: 'Nouveau cours "IA et Machine Learning" ajouté', time: '1j', status: 'info' },
      { type: 'staff', message: 'Évaluation du personnel terminée', time: '2j', status: 'success' },
    ],
  },
  teacher: {
    stats: [
      { title: 'Mes Étudiants', value: '127', change: '+5%', icon: GraduationCap, color: 'text-primary' },
      { title: 'Cours Cette Semaine', value: '18', change: '0%', icon: BookOpen, color: 'text-accent' },
      { title: 'Devoirs à Corriger', value: '34', change: '-12%', icon: Award, color: 'text-warning' },
      { title: 'Taux de Présence', value: '92%', change: '+3%', icon: UserCheck, color: 'text-success' },
    ],
    recentActivities: [
      { type: 'assignment', message: 'Nouveaux devoirs soumis en Mathématiques', time: '1h', status: 'info' },
      { type: 'student', message: 'Marie Dupont absent depuis 3 jours', time: '3h', status: 'warning' },
      { type: 'grade', message: 'Notes publiées pour l\'examen de Physique', time: '1j', status: 'success' },
      { type: 'schedule', message: 'Cours de rattrapage programmé pour demain', time: '2j', status: 'info' },
    ],
  },
  student: {
    stats: [
      { title: 'Mes Cours', value: '8', change: '0%', icon: BookOpen, color: 'text-primary' },
      { title: 'Moyenne Générale', value: '14.2/20', change: '+0.8', icon: Star, color: 'text-success' },
      { title: 'Présence', value: '94%', change: '+2%', icon: UserCheck, color: 'text-accent' },
      { title: 'Devoirs à Rendre', value: '3', change: '-1', icon: AlertCircle, color: 'text-warning' },
    ],
    recentActivities: [
      { type: 'grade', message: 'Nouvelle note en Algorithmique: 16/20', time: '2h', status: 'success' },
      { type: 'assignment', message: 'Devoir de Base de Données à rendre demain', time: '5h', status: 'warning' },
      { type: 'course', message: 'Cours de Réseaux reporté à jeudi', time: '1j', status: 'info' },
      { type: 'announcement', message: 'Inscriptions ouvertes pour le stage d\'été', time: '2j', status: 'info' },
    ],
  },
  accountant: {
    stats: [
      { title: 'Paiements Reçus', value: '€42,300', change: '+18%', icon: DollarSign, color: 'text-success' },
      { title: 'En Attente', value: '€8,150', change: '-5%', icon: Clock, color: 'text-warning' },
      { title: 'Étudiants Payés', value: '89%', change: '+3%', icon: CheckCircle2, color: 'text-primary' },
      { title: 'Factures Émises', value: '156', change: '+12%', icon: Users, color: 'text-accent' },
    ],
    recentActivities: [
      { type: 'payment', message: 'Paiement reçu: Jean Martin - €1,200', time: '1h', status: 'success' },
      { type: 'reminder', message: '15 rappels de paiement envoyés', time: '3h', status: 'info' },
      { type: 'invoice', message: 'Factures générées pour le semestre', time: '1j', status: 'success' },
      { type: 'overdue', message: '5 paiements en retard signalés', time: '2j', status: 'warning' },
    ],
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'bg-success text-success-foreground';
    case 'warning': return 'bg-warning text-warning-foreground';
    case 'info': return 'bg-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  
  if (!user) return null;

  const data = mockData[user.role];
  const userName = user.name.split(' ')[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Bonjour, {userName} 👋
        </h1>
        <p className="text-muted-foreground">
          {user.role === 'admin' ? 'Voici un aperçu de votre établissement' :
           user.role === 'teacher' ? 'Voici un résumé de vos activités d\'enseignement' :
           user.role === 'student' ? 'Voici votre progression académique' :
           'Voici un aperçu financier de l\'établissement'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <Card key={index} className="shadow-card bg-gradient-card border-0 animate-fade-in hover:shadow-stats transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br from-background to-muted ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-card bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Activités Récentes
            </CardTitle>
            <CardDescription>
              Dernières mises à jour et événements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Badge variant="outline" className={getStatusColor(activity.status)}>
                    {activity.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> :
                     activity.status === 'warning' ? <AlertCircle className="w-3 h-3" /> :
                     <Clock className="w-3 h-3" />}
                  </Badge>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions or Progress */}
        <Card className="shadow-card bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              {user.role === 'student' ? 'Progression' : 'Performance'}
            </CardTitle>
            <CardDescription>
              {user.role === 'student' ? 'Votre progression dans vos cours' : 'Indicateurs de performance'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.role === 'student' ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mathématiques</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Informatique</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Physique</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Anglais</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taux de satisfaction</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Objectifs mensuels</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taux de rétention</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}