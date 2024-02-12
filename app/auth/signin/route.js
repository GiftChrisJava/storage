const { addUserToDatabase } = require("@/app/server-actions/actions");
const { createRouteHandlerClient } = require("@supabase/auth-helpers-nextjs");
const { cookies } = require("next/headers");
const { NextRequest, NextResponse } = require("next/server");

async function POST(req) {
  const url = new URL(req.url);
  const cookieStore = cookies();

  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", url.origin));
  }

  return NextResponse.redirect(new URL("/videos", url.origin));
}

module.exports = {
  POST,
};
