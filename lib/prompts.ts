import { supabase } from './supabase';

export async function createPrompt(promptText: string) {
  try {
    const response = await fetch('/api/genai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptText }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    console.log(data.text)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error fetching user:', userError);    
      return;
    }
  
    if (!user) {
      console.error('No user is logged in');
      return;
    }

    const email = user.email;
    const { data: insertData, error } = await supabase
      .from('prompts')
      .insert([
        {
          email: email,
          prompt: promptText,
          response: data.text,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log(error);
      throw error;
    }
    return insertData;
  } catch (error) {
    console.error('Error creating prompt:', error);
    throw error;
  }
}

export async function getPromptHistory() {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching prompt history:', error);
    throw error;
  }
}
