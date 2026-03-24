"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Loader2 } from "lucide-react";
import { persistor, store } from "@/redux/store";
import { useEffect, useState } from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="h-screen flex items-center justify-center bg-[var(--background)]">
            <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
