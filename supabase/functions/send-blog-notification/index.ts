import { serve } from 'https://deno.fresh.run/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get the blog post data from the request
    const { blogTitle, blogExcerpt } = await req.json();
    
    // Get all users
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('email');
    
    if (usersError) throw usersError;

    // Send email to each user
    const emailPromises = users.map(user => 
      resend.emails.send({
        from: 'notifications@your-domain.com',
        to: user.email,
        subject: `New Blog Post: ${blogTitle}`,
        html: `
          <h2>New Blog Post Published!</h2>
          <h3>${blogTitle}</h3>
          <p>${blogExcerpt}</p>
          <a href="${Deno.env.get('PUBLIC_SITE_URL')}/blog/${blogId}">Read More</a>
        `
      })
    );

    await Promise.all(emailPromises);

    return new Response(
      JSON.stringify({ message: 'Notifications sent successfully' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});