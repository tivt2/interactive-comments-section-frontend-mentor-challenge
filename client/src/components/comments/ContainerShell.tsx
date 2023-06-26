import { ReactNode, useEffect, useRef } from "react";

interface ContainerShellProps {
  children: ReactNode;
  onBuild?: string;
  additionalStyles?: string;
}

export function ContainerShell({
  children,
  onBuild,
  additionalStyles,
}: ContainerShellProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (onBuild && currentRef) {
      const classes = onBuild.split(" ");
      setTimeout(() => currentRef.classList.add(...classes), 1);

      return () => currentRef.classList.remove(...classes);
    }
  }, [onBuild]);

  return (
    <div
      ref={ref}
      className={` w-full p-4 rounded-md bg-base-100 resp:p-6 resp:rounded-lg ${additionalStyles} `}
    >
      {children}
    </div>
  );
}
