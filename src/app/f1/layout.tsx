import F1Tabs from "./components/F1Tabs";

export default function F1Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">🏎️ Fórmula 1</h1>
      <F1Tabs />
      {children}
    </main>
  );
}