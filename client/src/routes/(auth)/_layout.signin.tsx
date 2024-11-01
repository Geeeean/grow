import { useState } from 'react';
import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Credentials } from '@/types/auth';
import { useSignIn } from '@/hooks/use-signin';

export const Route = createFileRoute('/(auth)/_layout/signin')({
    validateSearch: (search: Record<string, string>): { redirect: string } => {
        return {
            redirect: search.redirect || '/',
        };
    },
    component: () => <SignIn />,
});

const SignIn = () => {
    const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
    const { signIn, isPending, isSuccess, error } = useSignIn();

    const { redirect } = Route.useSearch();

    if (isSuccess) return <Navigate to={redirect} />;

    console.log(isPending, error);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Signin</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="mario.rossi@example.com"
                        onChange={(val) => setCredentials((prev) => ({ ...prev, email: val.target.value }))}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        type="password"
                        onChange={(val) => setCredentials((prev) => ({ ...prev, password: val.target.value }))}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={async () => {
                        signIn(credentials);
                    }}
                >
                    Signin
                </Button>
            </CardFooter>
        </Card>
    );
};
