import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/(auth)/_layout/signin')({
    component: () => <SignIn />,
});

const SignIn = () => {
    const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });

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
                    onClick={() => {
                        console.log(credentials);
                    }}
                >
                    Signin
                </Button>
            </CardFooter>
        </Card>
    );
};
