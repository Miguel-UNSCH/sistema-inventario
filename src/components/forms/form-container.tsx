function FormContainer({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="w-full bg-white dark:bg-[#1D1E24] shadow-md drop-shadow-md relative p-2 py-3 rounded-xl flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="font-medium">{title}</span>
        <div className="w-full h-[1px] bg-border"></div>
      </div>
      {children}
    </div>
  );
}

export default FormContainer;
