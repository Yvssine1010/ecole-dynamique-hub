import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import emsiBackground from '@/assets/emsi-background.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const demoAccounts = [
    { email: 'admin@emsi.ma', password: 'admin123', role: 'Administrateur' },
    { email: 'prof.benali@emsi.ma', password: 'teacher123', role: 'Enseignant' },
    { email: 'oumaima.lemata@emsi.ma', password: 'student123', role: 'Étudiant' },
    { email: 'comptable@emsi.ma', password: 'accountant123', role: 'Comptable' }
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${emsiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-accent/20 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-primary p-4 rounded-full shadow-stats">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground drop-shadow-lg">EMSI</h1>
          <h2 className="text-lg font-semibold text-foreground/90">École Marocaine des Sciences de l'Ingénierie</h2>
          <p className="text-muted-foreground bg-background/60 backdrop-blur-sm rounded-lg px-3 py-1">Système de gestion scolaire</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-card bg-gradient-card border-0">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte pour accéder au système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-stats transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="shadow-card bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-sm">Comptes de démonstration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
              >
                <div>
                  <p className="text-sm font-medium">{account.role}</p>
                  <p className="text-xs text-muted-foreground">{account.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">{account.password}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}