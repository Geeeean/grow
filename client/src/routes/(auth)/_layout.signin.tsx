import { createFileRoute } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/(auth)/_layout/signin')({
    component: () => (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Signin</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" placeholder="mario.rossi@example.com" />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className='w-full'>Signin</Button>
            </CardFooter>
        </Card>
    ),
});
