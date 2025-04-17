// import ModeToggle from "@/components/mode-toggle";
// import { SignInButton } from "@/components/signin-button";



// function App() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen">
//       <ModeToggle />
//       <SignInButton />
//     </div>
//   );
// }

// export default App;

// import './index.css'
//   import { useState, useEffect } from 'react'
//   import { createClient } from '@supabase/supabase-js'
//   import { Session } from '@supabase/supabase-js'

//   const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

//   export default function App() {
//     const [session, setSession] = useState<Session | null>(null)

//     useEffect(() => {
//       supabase.auth.getSession().then(({ data: { session } }) => {
//         setSession(session)
//       })

//       const {
//         data: { subscription },
//       } = supabase.auth.onAuthStateChange((_event, session) => {
//         setSession(session)
//       })

//       return () => subscription.unsubscribe()
//     }, [])

//     if (!session) {
//       return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
//     }
//     else {
//       return (<div>Logged in!</div>)
//     }
//   }

import { ModeToggleSvg } from "./components/mode-toggle"
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <ModeToggleSvg />
    </div>
  )
}

export default App