import Image from "next/image";

interface LoadingBox {
  css?: string;
}

export default function LoadingBox({ css }: LoadingBox) {
  return (
    <div
      className={
        css ||
        "absolute top-0 left-0 bg-black/80 backdrop-blur-lg w-[100%] h-[100%] rounded-lg border border-black flex justify-center items-center z-50"
      }
    >
      <Image src="/three-dots.svg" width={48} height={48} alt="loading..." />
    </div>
  );
}
