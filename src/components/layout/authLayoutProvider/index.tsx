import React from "react";

function AuthLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {children}
    </div>
  );
}

export default AuthLayoutProvider;
