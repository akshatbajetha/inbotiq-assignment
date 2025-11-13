'use client';

import { useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/lib/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    // Ensure user data is fresh
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  if (isLoading || !user) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Skeleton className="h-12 w-64 mb-6" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const roleDisplay = user.role === 'ADMIN' ? 'Admin' : 'User';

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Welcome, {user.name} ({roleDisplay})
              </CardTitle>
              <CardDescription>
                You are logged in as {user.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This is your dashboard. You can add more content here based on your role.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}

