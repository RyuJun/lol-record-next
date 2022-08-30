interface useDebounceProps {
  cb: () => void;
  ms: number;
}

const useDebounce = ({ cb, ms }: useDebounceProps) => {
  let timer: number | null = null;

  const paddingFunction = function () {
    if (timer) clearTimeout(timer);

    timer = <any>setTimeout(() => cb(), ms);
  };
  return paddingFunction;
};

export default useDebounce;
