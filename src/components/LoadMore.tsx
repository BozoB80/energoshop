import { useEffect } from "react";
import { useInView } from "react-intersection-observer"
import spinner from "@/assets/spinner.svg"

type Props = {
  onLoadMore: () => void;
}

function LoadMore({ onLoadMore }: Props) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      onLoadMore()
    }
  }, [inView, onLoadMore])
  

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <img
            src={spinner}
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;