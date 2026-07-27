function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-0 text-text-primary">
      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;