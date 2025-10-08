# Google reCAPTCHA Setup Instructions

The contact form is configured to send emails via Brevo API. To add spam protection with Google reCAPTCHA, follow these steps:

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click on the **+** button to register a new site
3. Fill in the form:
   - **Label**: OPUS CREATIVES Contact Form
   - **reCAPTCHA type**: Choose **reCAPTCHA v2** > **"I'm not a robot" Checkbox**
   - **Domains**: Add your domain(s):
     - localhost (for development)
     - your-production-domain.com
4. Accept the terms and click **Submit**
5. Copy both keys:
   - **Site Key** (visible to users)
   - **Secret Key** (server-side only)

## Step 2: Update Environment Variables

Open your `.env.local` file and replace the placeholders:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
RECAPTCHA_SECRET_KEY=your_actual_secret_key_here
```

## Step 3: Install reCAPTCHA Package

Run this command to install the reCAPTCHA library:

```bash
pnpm install react-google-recaptcha
# or
npm install react-google-recaptcha
```

Also install the types:

```bash
pnpm install -D @types/react-google-recaptcha
# or
npm install --save-dev @types/react-google-recaptcha
```

## Step 4: Add reCAPTCHA to the Form

Update `app/page.tsx` to include reCAPTCHA:

### 1. Add the import at the top:

```typescript
import ReCAPTCHA from 'react-google-recaptcha';
```

### 2. Add reCAPTCHA state:

```typescript
const [recaptchaToken, setRecaptchaToken] = useState<string>('');
const recaptchaRef = useRef<ReCAPTCHA>(null);
```

### 3. Add onChange handler:

```typescript
const handleRecaptchaChange = (token: string | null) => {
  setRecaptchaToken(token || '');
};
```

### 4. Update the handleSubmit function:

Replace this line:
```typescript
recaptchaToken: '', // reCAPTCHA token will be added when configured
```

With:
```typescript
recaptchaToken: recaptchaToken,
```

And add validation:
```typescript
if (!recaptchaToken) {
  toast({
    title: "Verification required",
    description: "Please complete the reCAPTCHA verification",
    variant: "destructive",
  })
  return
}
```

Also reset it after submission:
```typescript
setRecaptchaToken('')
recaptchaRef.current?.reset()
```

### 5. Add the reCAPTCHA component to the form:

Add this before the submit button in the contact form JSX:

```tsx
<div className="mt-6">
  <ReCAPTCHA
    ref={recaptchaRef}
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
    onChange={handleRecaptchaChange}
    theme="light"
  />
</div>
```

## Step 5: Restart the Development Server

After updating the environment variables, restart your Next.js server:

```bash
# Stop the server (Ctrl+C)
# Then start it again
pnpm dev
# or
npm run dev
```

## Testing

1. Fill out the contact form
2. Complete the reCAPTCHA challenge
3. Submit the form
4. Check your inbox at `zenithcodeservices@gmail.com`

## Current Status

✅ **Email sending via Brevo** - Fully configured and working
✅ **API endpoint** - `/api/contact` ready
✅ **Environment variables** - Brevo API key set up
⚠️ **reCAPTCHA** - Ready to be configured (follow steps above)

## Troubleshooting

### reCAPTCHA not showing
- Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in `.env.local`
- Make sure the prefix is `NEXT_PUBLIC_` (required for client-side access)
- Restart the dev server after changing environment variables

### Email not sending
- Check that `BREVO_API_KEY` is correct in `.env.local`
- Check the browser console and terminal for error messages
- Verify your Brevo account is active and the API key hasn't expired

### TypeScript errors
- Install the types: `npm install -D @types/react-google-recaptcha`
- Make sure `react-google-recaptcha` is installed

## Alternative: reCAPTCHA v3 (Invisible)

If you prefer invisible reCAPTCHA (no user interaction):

1. Register for reCAPTCHA v3 instead
2. Use `react-google-recaptcha-v3` package
3. The implementation will be different (automatic score-based verification)

## Security Notes

- ✅ Never commit `.env.local` to Git (already in `.gitignore`)
- ✅ The secret key is only used server-side in the API route
- ✅ Only the site key is exposed to the client
- ✅ Email addresses are validated before sending
- ✅ Brevo API handles rate limiting automatically

## Support

For issues with:
- **Brevo/Email**: Check [Brevo API Docs](https://developers.brevo.com/)
- **reCAPTCHA**: Check [Google reCAPTCHA Docs](https://developers.google.com/recaptcha)

