import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/account'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            // Upsert the user profile into the profiles table
            try {
                const user = data.user
                await supabase
                    .from('profiles')
                    .upsert(
                        {
                            id: user.id,
                            email: user.email,
                            full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
                            avatar_url: user.user_metadata?.avatar_url || null,
                            provider: user.app_metadata?.provider || 'google',
                            updated_at: new Date().toISOString(),
                        },
                        { onConflict: 'id' }
                    )
            } catch (err) {
                console.error('Error syncing user profile:', err)
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // If something went wrong, redirect to account page with error
    return NextResponse.redirect(`${origin}/account?error=auth_failed`)
}
