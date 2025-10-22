export default function LoadingContainer({
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col grow items-center justify-center self-stretch min-h-screen gap-[40px] p-[16px] text-(--color-text-tertiary)">
      {rest.children}
    </div>
  );
}
