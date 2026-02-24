import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import crypto from 'crypto'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
}

// Create admin client with service role key
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
})

// Read names from file
const namesFile = readFileSync(resolve(import.meta.dirname, '..', 'names.txt'), 'utf-8')
const names = namesFile.split('\n').map(n => n.trim()).filter(n => n.length > 0)

console.log(`Found ${names.length} names to create...\n`)

let created = 0
let failed = 0
let skipped = 0

// Process in batches of 10 to avoid rate limiting
const BATCH_SIZE = 10

for (let i = 0; i < names.length; i += BATCH_SIZE) {
    const batch = names.slice(i, i + BATCH_SIZE)
    const promises = batch.map(async (fullName) => {
        const parts = fullName.split(' ')
        const firstName = parts[0].toLowerCase()
        const lastName = parts.slice(1).join('.').toLowerCase()
        const email = `${firstName}.${lastName}@student.tdsb.on.ca`
        const password = crypto.randomBytes(12).toString('base64url') // random 16-char password

        try {
            const { data, error } = await supabase.auth.admin.createUser({
                email,
                password,
                email_confirm: true, // auto-confirm, no verification needed
                user_metadata: {
                    full_name: fullName,
                },
            })

            if (error) {
                if (error.message?.includes('already been registered')) {
                    skipped++
                    return
                }
                console.error(`  ✗ ${email}: ${error.message}`)
                failed++
                return
            }

            // Also upsert into profiles table
            if (data.user) {
                await supabase.from('profiles').upsert({
                    id: data.user.id,
                    email: email,
                    full_name: fullName,
                    provider: 'email',
                    updated_at: new Date().toISOString(),
                }, { onConflict: 'id' })
            }

            created++
        } catch (err) {
            console.error(`  ✗ ${email}: ${err}`)
            failed++
        }
    })

    await Promise.all(promises)

    // Progress update every batch
    const progress = Math.min(i + BATCH_SIZE, names.length)
    process.stdout.write(`\r  Progress: ${progress}/${names.length} | Created: ${created} | Skipped: ${skipped} | Failed: ${failed}`)
}

console.log(`\n\n✅ Done!`)
console.log(`   Created: ${created}`)
console.log(`   Skipped (already existed): ${skipped}`)
console.log(`   Failed: ${failed}`)
