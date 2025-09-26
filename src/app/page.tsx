import React from "react";
import TemplateShell from "@/components/TemplateShell";

export default async function Page() {
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-subtle">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <TemplateShell />
      </div>
    </div>
  );
}
