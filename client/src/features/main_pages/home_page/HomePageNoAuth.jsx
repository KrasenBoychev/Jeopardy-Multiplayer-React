import { Vortex } from "@/components/ui/vortex";
import { LoginForm } from "../../authentication/LoginForm";
import { useState } from "react";
import { RegisterForm } from "../../authentication/RegisterForm";

export default function HomePageNoAuth() {
  const [renderAuthForm, setRenderAuthForm] = useState("login");
  return (
    <div className="flex-1 overflow-hidden">
      <Vortex className="flex items-center justify-center px-2 md:px-10 pb-4 w-full h-full">
        <section className="flex-1 flex-col content-center justify-center">
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center uppercase tracking-wider [word-spacing:8px] font-[Pacifico]">
            Welcome to the Jeopardy World
          </h2>
        </section>
        <section className="flex-1 flex content-center justify-center">
          {renderAuthForm == "login" ? (
            <LoginForm setRenderAuthForm={setRenderAuthForm} />
          ) : (
            <RegisterForm setRenderAuthForm={setRenderAuthForm} />
          )}
        </section>
      </Vortex>
    </div>
  );
}
