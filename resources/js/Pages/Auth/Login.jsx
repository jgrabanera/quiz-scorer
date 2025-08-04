import { useEffect,useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

export default function Login() {
    const [ data, setData ] = useState({
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        axios.post('/login',data).then(
            res => {
                window.location = '/dashboard'
            }
        ).catch(
            err=>{
                alert("❌ Error: Invalid Credentials");
            }
        )
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="username" />

                    <TextInput
                        id="username"
                        type="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData({...data , 'username': e.target.value})}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData({...data ,'password': e.target.value})}
                    />
                </div>

                

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
