const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      {children && <div className="mt-4 md:mt-0">{children}</div>}
    </div>
  );
};
export default PageHeader;
