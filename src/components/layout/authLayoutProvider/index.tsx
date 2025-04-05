import React from "react";

function AuthLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-gradient-to-br from-slate-700 to-slate-950 text-white">
        {children}
      </div>
    </>
  );
}

export default AuthLayoutProvider;
