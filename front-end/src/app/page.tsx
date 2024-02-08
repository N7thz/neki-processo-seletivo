import { FormLogin } from "@/components/formLogin";
import { ModeToggle } from "@/components/toggle-mode";

export default function Home() {

  return (

    <div
      className="min-h-screen flex justify-center items-center bg-zinc-50 dark:bg-zinc-950 backgroundImage"
    >
      <FormLogin />
    </div>
  )
}
