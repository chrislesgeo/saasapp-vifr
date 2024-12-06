# **Prompt Response SAAS Webapp**

A simple yet effective webapp that integrates the **Gemini API** to fetch prompt responses and stores the data in **Supabase**. This app is built using **React** for the frontend, **Tailwind CSS** for styling, and **Bolt.new** for framework structure.

## **Features**

- **Prompt-to-Response**: The app takes user input in the form of a prompt, sends it to the Gemini API, and fetches the corresponding response.
- **Supabase Integration**: All the responses are stored in **Supabase** for easy access and future reference.
- **Simple UI**: A sleek and responsive user interface built using **React** and styled with **Tailwind CSS**.
- **Future Chat Integration (Optional)**: Though not yet implemented, there is a placeholder for a chat utility to interact with the system in a more conversational manner.

## **Tech Stack**

- **Frontend**: React, Tailwind CSS
- **Backend**: Gemini API (for fetching prompt responses)
- **Database**: Supabase (for storing responses)
- **Genrative Tools**: Bolt.new, v0

## **Setup Instructions**

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the app for production:
   ```bash
   npm run build
   ```

4. To start the app in development mode:
   ```bash
   npm run dev
   ```

5. Make sure to configure the **Gemini API** and **Supabase** credentials for full functionality.

## **How It Works**

1. Users input a **prompt** into the app.
2. The app sends the prompt to the **Gemini API**.
3. The response from Gemini is received and displayed to the user.
4. The response is also stored in **Supabase** for future reference.

## **Future Improvements**

- Implement the **chat utility** to allow for conversational interactions.  (Actually I have this thing set up in code but decided to not impliment it because I thought that would be out of the zone of this task.)
- Make majority of the app on SSR, I also tried this and almost accomplished this but it resulted dashboard not instantaneous redirecting to login page upon session end which I think is fixable with a little time on my hand.

## **The Process**

I started by generating the frontend framework on bolt.new and then adding supabase functionality to it.

Then I added the required tables to supabase and RLS policies to make sure users can only see their own prompts and responses.

Then I experimented by prompt engineering to get some nice colours (not alot, but to atleast make it not hurt my eyes.)

Then I experimented with the chat which I ended up not going ahead with.
