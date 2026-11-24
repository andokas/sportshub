import F1Tabs from "./components/F1Tabs";

export default function F1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f1f0ec] text-[#171717]">
      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
        <h1 className="mb-6 text-3xl font-bold">🏎️ Fórmula 1</h1>
        <F1Tabs />
        <div className="min-w-0">{children}</div>
      </main>
    </div>
  );
}