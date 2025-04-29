import React from "react";
import Sidebar from "~/components/global/sidebar";

function AuthLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Sidebar />
      <div className="pl-24 flex-grow min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {children}
      </div>
    </div>
  );
}

export default AuthLayoutProvider;
