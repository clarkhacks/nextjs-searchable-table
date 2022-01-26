export const Layout: React.FC = ({ children }) => {
  return (
    <div className="px-4 w-full max-w-7xl mx-auto flex flex-col flex-1 center-items">
      <main className="my-4 lg:my-12 flex flex-col flex-1 center-items">
        {children}
      </main>
    </div>
  );
};
