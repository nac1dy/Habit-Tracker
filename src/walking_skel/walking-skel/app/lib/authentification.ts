import { supabase, signInWithPassword, signUp } from '@/app/backend/supabase';
import { NextResponse } from 'next/server';

export async function registerUser(email:string , password:string){
    try{
        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to register a User' },
        { status: 500 }
        );
    }

    



}

export async function loginUser(email:string , password:string){
    try{
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        NextResponse.json({ status: 200 });
        
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to register a User' },
        { status: 500 }
        );
    }


}