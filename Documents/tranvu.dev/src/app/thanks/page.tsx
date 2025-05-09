import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Thanks() {
  const [seconds, setSeconds] = useState(3);
  const router = useRouter();
  useEffect(() => {
    if (seconds === 0) {
      router.replace("/");
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);
  return (
    <div>
      <h1>Thanks</h1>
      <span>{seconds}</span>
    </div>
  );
}
