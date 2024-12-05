import { supabase } from './supabase';

// Mock AI response function (replace with actual AI integration later)
const mockAIResponse = async (prompt: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Sample response for: ${prompt}\n\nThis is a mock AI response
  .`;
};

export async function createPrompt(promptText: string) {
  try {
    const response = await mockAIResponse(promptText);
    const {data: { user }, error: userError } = await supabase.auth.getUser();
    if(userError) {
      console.error('Error fetching user:', userError);    
      return;
    }
  
    if(!user) {
    console.error('No user is logged in');
    return;
  }
    const email = user.email;
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          email: email,
          prompt: promptText,
          response: response,
        },
      ])
      .select()
      .single();

    if (error){
      console.log(error);
      throw error;}
    return data;
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