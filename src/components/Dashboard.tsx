import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, GraduationCap, BookOpen, Calendar, TrendingUp, DollarSign, Award, Clock, UserCheck, AlertCircle, CheckCircle2, Star } from 'lucide-react';

// Mock data for different user roles
const mockData = {
  admin: {
    stats: [],
    recentActivities: [{
      type: 'student',
      message: 'Oumaima Lemata et 24 autres étudiants inscrits en Génie Informatique',
      time: '2h',
      status: 'success'
    }, {
      type: 'payment',
      message: 'Frais de scolarité: 15 étudiants en retard de paiement',
      time: '4h',
      status: 'warning'
    }, {
      type: 'course',
      message: 'Nouveau programme "Intelligence Artificielle" lancé',
      time: '1j',
      status: 'info'
    }, {
      type: 'staff',
      message: 'Nouveau Prof. Ahmed Benali rejoint le département',
      time: '2j',
      status: 'success'
    }]
  },
  teacher: {
    stats: [],
    recentActivities: [{
      type: 'assignment',
      message: 'Nouveaux devoirs soumis en Mathématiques',
      time: '1h',
      status: 'info'
    }, {
      type: 'student',
      message: 'Marie Dupont absent depuis 3 jours',
      time: '3h',
      status: 'warning'
    }, {
      type: 'grade',
      message: 'Notes publiées pour l\'examen de Physique',
      time: '1j',
      status: 'success'
    }, {
      type: 'schedule',
      message: 'Cours de rattrapage programmé pour demain',
      time: '2j',
      status: 'info'
    }]
  },
  student: {
    stats: [{
      title: 'Mes Cours',
      value: '8',
      change: '0%',
      icon: BookOpen,
      color: 'text-primary'
    }, {
      title: 'Moyenne Générale',
      value: '14.2/20',
      change: '+0.8',
      icon: Star,
      color: 'text-success'
    }, {
      title: 'Présence',
      value: '94%',
      change: '+2%',
      icon: UserCheck,
      color: 'text-accent'
    }, {
      title: 'Devoirs à Rendre',
      value: '3',
      change: '-1',
      icon: AlertCircle,
      color: 'text-warning'
    }],
    recentActivities: [{
      type: 'grade',
      message: 'Nouvelle note en Algorithmique: 16/20',
      time: '2h',
      status: 'success'
    }, {
      type: 'assignment',
      message: 'Devoir de Base de Données à rendre demain',
      time: '5h',
      status: 'warning'
    }, {
      type: 'course',
      message: 'Cours de Réseaux reporté à jeudi',
      time: '1j',
      status: 'info'
    }, {
      type: 'announcement',
      message: 'Inscriptions ouvertes pour le stage d\'été',
      time: '2j',
      status: 'info'
    }]
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-success text-success-foreground';
    case 'warning':
      return 'bg-warning text-warning-foreground';
    case 'info':
      return 'bg-primary text-primary-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Dashboard() {
  const { user, students, teachers } = useAuth();
  if (!user) return null;
  
  // Update stats dynamically
  const updatedMockData = {
    ...mockData,
    admin: {
      ...mockData.admin,
      stats: [
        {
          title: 'Total Étudiants EMSI',
          value: students.length.toString(),
          change: '+18%',
          icon: GraduationCap,
          color: 'text-primary'
        },
        {
          title: 'Personnel Enseignant',
          value: teachers.length.toString(),
          change: '+5%',
          icon: Users,
          color: 'text-accent'
        },
        {
          title: 'Revenus (MAD)',
          value: '2,840,500',
          change: '+22%',
          icon: DollarSign,
          color: 'text-warning'
        }
      ]
    },
    teacher: {
      ...mockData.teacher,
      stats: [
        {
          title: 'Mes Étudiants',
          value: students.length.toString(),
          change: '+5%',
          icon: GraduationCap,
          color: 'text-primary'
        },
        {
          title: 'Cours Cette Semaine',
          value: '18',
          change: '0%',
          icon: BookOpen,
          color: 'text-accent'
        },
        {
          title: 'Devoirs à Corriger',
          value: '34',
          change: '-12%',
          icon: Award,
          color: 'text-warning'
        }
      ]
    }
  };
  
  const data = updatedMockData[user.role];
  const userName = user.name.split(' ')[0];
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Bonjour, {userName} 👋
        </h1>
        <p className="text-muted-foreground">
          {user.role === 'admin' 
            ? 'Voici un aperçu de votre établissement' 
            : user.role === 'teacher' 
              ? 'Voici un résumé de vos activités d\'enseignement' 
              : 'Voici votre progression académique'}
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
                    {activity.status === 'success' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : activity.status === 'warning' ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
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
        
      </div>
    </div>
  );
}